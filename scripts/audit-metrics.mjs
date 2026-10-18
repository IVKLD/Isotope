import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist', 'apps', 'frontend', 'browser');

const isDesktop = process.argv.includes('--desktop');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

function createStaticServer(baseDir) {
  return http.createServer((req, res) => {
    try {
      const urlPath = req.url.split('?')[0];

      if (urlPath.startsWith('/_vercel/')) {
        res.writeHead(204);
        res.end();
        return;
      }

      let filePath = path.join(baseDir, decodeURIComponent(urlPath));

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        filePath = path.join(baseDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const acceptEncoding = req.headers['accept-encoding'] || '';

      if (acceptEncoding.includes('gzip') && ext !== '.woff2' && ext !== '.woff') {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
        });
        fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable'
        });
        fs.createReadStream(filePath).pipe(res);
      }
    } catch {
      res.writeHead(500);
      res.end('Server Error');
    }
  });
}

function formatRating(value, goodLimit, poorLimit, unit = '', isScore = false) {
  let color = '\x1b[32m'; // Green
  let status = 'GOOD';

  if (isScore) {
    if (value < poorLimit) {
      color = '\x1b[31m'; // Red
      status = 'POOR';
    } else if (value < goodLimit) {
      color = '\x1b[33m'; // Yellow
      status = 'NEEDS IMPROVEMENT';
    }
  } else {
    if (value > poorLimit) {
      color = '\x1b[31m'; // Red
      status = 'POOR';
    } else if (value > goodLimit) {
      color = '\x1b[33m'; // Yellow
      status = 'NEEDS IMPROVEMENT';
    }
  }

  const reset = '\x1b[0m';
  return `${color}${value}${unit} (${status})${reset}`;
}

const routeArg = process.argv.find(arg => arg.startsWith('--route='));
const specificRoute = routeArg ? routeArg.split('=')[1] : null;
const isAllRoutes = process.argv.includes('--all-routes');

async function runAudit() {
  if (!fs.existsSync(distDir)) {
    console.error(
      `\x1b[31mОшибка: Папка ${distDir} не найдена. Сначала соберите проект: yarn build\x1b[0m`
    );
    process.exit(1);
  }

  const routesFile = path.join(rootDir, 'apps', 'frontend', 'prerender-routes.txt');
  let routes = ['/'];
  if (specificRoute) {
    routes = [specificRoute];
  } else if (isAllRoutes && fs.existsSync(routesFile)) {
    routes = fs
      .readFileSync(routesFile, 'utf8')
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);
  }

  const server = createStaticServer(distDir);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;

  console.log(`\n🚀 Локальный сервер запущен на http://127.0.0.1:${port}`);
  console.log(
    `⏱️  Запуск Lighthouse (${isDesktop ? 'Desktop' : 'Mobile'}) для ${routes.length} маршрутов...\n`
  );

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const config = isDesktop
    ? {
        extends: 'lighthouse:default',
        settings: {
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1
          }
        }
      }
    : undefined;

  const results = [];

  try {
    for (const route of routes) {
      const pageUrl = `http://127.0.0.1:${port}${route.startsWith('/') ? route : '/' + route}`;
      console.log(`\n🔎 Тестирование страницы: ${route}`);

      const runnerResult = await lighthouse(
        pageUrl,
        {
          port: chrome.port,
          output: 'html',
          logLevel: 'silent',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
        },
        config
      );

      const { lhr, report } = runnerResult;
      const cats = lhr.categories;
      const audits = lhr.audits;

      const perfScore = Math.round(cats.performance.score * 100);
      const a11yScore = Math.round(cats.accessibility.score * 100);
      const bpScore = Math.round(cats['best-practices'].score * 100);
      const seoScore = Math.round(cats.seo.score * 100);
      const cls = audits['cumulative-layout-shift'].numericValue;
      const lcp = audits['largest-contentful-paint'].numericValue / 1000;
      const fcp = audits['first-contentful-paint'].numericValue / 1000;
      const tbt = Math.round(audits['total-blocking-time'].numericValue);

      results.push({
        route,
        perf: perfScore,
        a11y: a11yScore,
        bp: bpScore,
        seo: seoScore,
        lcp: lcp.toFixed(2),
        cls: cls.toFixed(3),
        tbt
      });

      console.log(
        `  ⚡ Perf: ${perfScore}% | ♿ A11y: ${a11yScore}% | 🛡️ BP: ${bpScore}% | 🔍 SEO: ${seoScore}% | LCP: ${lcp.toFixed(2)}s | CLS: ${cls.toFixed(3)} | TBT: ${tbt}ms`
      );

      const reportDir = path.join(rootDir, '.reports');
      if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
      const safeName = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
      const reportPath = path.join(
        reportDir,
        `lh-${safeName}-${isDesktop ? 'desktop' : 'mobile'}.html`
      );
      fs.writeFileSync(reportPath, report);
    }

    console.log('\n' + '='.repeat(80));
    console.log(
      `📊 СВОДНЫЙ ОТЧЁТ LIGHTHOUSE (${isDesktop ? 'DESKTOP' : 'MOBILE'}) ДЛЯ ВСЕХ СТРАНИЦ:`
    );
    console.log('='.repeat(80));
    console.table(results);
  } finally {
    await chrome.kill();
    server.close();
  }
}

runAudit().catch(err => {
  console.error('\x1b[31mОшибка при выполнении аудита:\x1b[0m', err);
  process.exit(1);
});
