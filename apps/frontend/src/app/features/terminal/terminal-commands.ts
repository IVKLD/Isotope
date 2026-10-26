import {
  TerminalCommandContext,
  TerminalLine,
  TerminalSpan
} from './terminal.model';
import {
  BIN_COMMANDS,
  BIO_TEXT,
  HELP_LINES,
  NIXOS_OS_RELEASE,
  buildScreenfetchLines
} from './terminal-data';

export function dispatchTerminalCommand(
  cmd: string,
  args: readonly string[],
  ctx: TerminalCommandContext
): readonly TerminalLine[] {
  switch (cmd) {
    case 'pwd':
      return [ctx.cwd];
    case 'cd':
      return runCd(args[0] || null, ctx);
    case 'ls':
    case 'll':
      return runLs(cmd === 'll' || args.some(a => a.includes('l')), ctx);
    case 'cat':
      return runCat(args[0] || null, ctx);
    case 'tree':
      return runTree(ctx);
    case ',':
      return ['comma: usage: , <command> [args...]'];
    case 'neofetch':
    case 'fastfetch':
    case 'screenfetch':
      return buildScreenfetchLines(formatScreenfetchUptime(ctx.sessionStart));
    case 'whoami':
      return ['igni'];
    case 'id':
      return ['uid=1000(igni) gid=1000(developers) groups=1000(angular),1001(rust),1002(systems)'];
    case 'uptime':
      return [formatUptime(ctx.sessionStart)];
    case 'uname':
      return ['Linux desktop 7.2.11 #1-NixOS SMP PREEMPT_DYNAMIC Sun, 26 Oct 2026 21:00:00 +0000 x86_64 GNU/Linux'];
    case 'date':
      return [new Date().toUTCString()];
    case 'help':
      return HELP_LINES;
    case 'man':
      return runMan(args[0] || null);
    case 'history':
      return ctx.commandHistory.map((c, i) => `  ${i + 1}  ${c}`);
    case 'theme':
      return runTheme(args[0] || null, ctx);
    case 'open':
      return runOpen(args[0] || null, ctx);
    case 'projects':
      return runProjects(ctx);
    case 'blog':
    case 'posts':
      return runBlog(ctx);
    default:
      return [
        [
          { text: `fish: Unknown command: "${cmd}". `, color: 'var(--accent)' },
          { text: 'Type ', color: 'var(--text-dim)' },
          { text: 'help', bold: true, color: 'var(--code-ident)' },
          { text: ' for commands list.', color: 'var(--text-dim)' }
        ]
      ];
  }
}

export function getTerminalCompletions(
  rawInput: string,
  ctx: TerminalCommandContext
): { newLine: string; candidates: readonly string[] } {
  const parts = rawInput.trimStart().split(/\s+/);
  if (parts.length <= 1 && !rawInput.endsWith(' ')) {
    const token = parts[0].toLowerCase();
    const matches = BIN_COMMANDS.filter(c => c.startsWith(token));
    if (matches.length === 1) return { newLine: `${matches[0]} `, candidates: [] };
    return { newLine: rawInput, candidates: matches };
  }

  const command = parts[0].toLowerCase();
  const arg = rawInput.endsWith(' ') ? '' : parts[parts.length - 1];

  if (command === 'theme') {
    const themes = ['dark', 'matrix', 'amber'];
    return { newLine: rawInput, candidates: themes.filter(t => t.startsWith(arg)) };
  }

  if (command === 'open') {
    const projects = ctx.projects ?? [];
    const posts = ctx.posts ?? [];
    const list = [
      ...projects.map(p => p.name),
      ...posts.map(p => p.slug)
    ].filter(n => n.toLowerCase().startsWith(arg.toLowerCase()));
    if (list.length === 1) return { newLine: `open ${list[0]}`, candidates: [] };
    return { newLine: rawInput, candidates: list };
  }

  const entries = listCurrentEntries(ctx);
  const matches = entries.filter(e => e.toLowerCase().startsWith(arg.toLowerCase()));
  if (matches.length === 1) {
    const prefix = rawInput.slice(0, rawInput.length - arg.length);
    return { newLine: `${prefix}${matches[0]}`, candidates: [] };
  }
  return { newLine: rawInput, candidates: matches };
}

function runCd(target: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!target || target === '~') {
    ctx.setCwd('/home/igni');
    return [];
  }
  const resolved = resolvePath(target, ctx.cwd);
  const validDirs = [
    '/',
    '/bin',
    '/etc',
    '/home',
    '/home/igni',
    '/home/igni/about',
    '/home/igni/projects',
    '/home/igni/blog'
  ];
  if (!validDirs.includes(resolved)) {
    return [`cd: no such file or directory: ${target}`];
  }
  ctx.setCwd(resolved);
  return [];
}

function runLs(long: boolean, ctx: TerminalCommandContext): readonly TerminalLine[] {
  const items = getItemsForDir(ctx.cwd, ctx);
  if (long) {
    return [
      `total ${items.length * 4}`,
      ...items.map(item => [
        { text: `${item.isDir ? 'drwxr-xr-x' : '-rw-r--r--'} 1 igni developers 4096 Oct 27 00:00 ` },
        { text: item.name + (item.isDir ? '/' : ''), color: item.color, bold: item.isDir }
      ])
    ];
  }
  const segments: TerminalSpan[] = [];
  items.forEach((item, i) => {
    segments.push({ text: item.name + (item.isDir ? '/' : ''), color: item.color, bold: item.isDir });
    if (i < items.length - 1) segments.push({ text: '  ' });
  });
  return [segments];
}

function runCat(file: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!file) return ['cat: missing operand'];
  const path = resolvePath(file, ctx.cwd);

  if (path === '/etc/os-release') return NIXOS_OS_RELEASE.split('\n');
  if (path === '/home/igni/about/bio.md') return BIO_TEXT.split('\n');
  if (path === '/home/igni/about/skills.json') {
    return [
      JSON.stringify(
        {
          engineer: 'IgnI',
          stack: ['Angular 22', 'Signals', 'Zoneless', 'NestJS', 'Rust', 'NixOS']
        },
        null,
        2
      )
    ];
  }

  if (path.startsWith('/home/igni/projects/')) {
    const name = path.slice(20).replace(/\.md$/, '').toLowerCase();
    const projects = ctx.projects ?? [];
    const p = projects.find(x => x.name.toLowerCase() === name);
    if (p) {
      return [
        `# ${p.name} (${p.year}) [${p.category.toUpperCase()}]`,
        `Role: ${p.role}`,
        `GitHub: ${p.githubUrl || 'Private'}`,
        '',
        p.shortDesc,
        '',
        ...p.highlights.map(h => `* ${h}`),
        '',
        `Stack: ${p.techStack.join(', ')}`
      ];
    }
  }

  if (path.startsWith('/home/igni/blog/')) {
    const slug = path.slice(16).replace(/\.md$/, '').toLowerCase();
    const posts = ctx.posts ?? [];
    const b = posts.find(x => x.slug.toLowerCase() === slug);
    if (b) {
      return [`# ${b.title}`, `Subtitle: ${b.subtitle}`, `Read time: ${b.readTime}`, '', b.excerpt];
    }
  }

  return [`cat: ${file}: No such file or directory`];
}

function runTree(ctx: TerminalCommandContext): readonly TerminalLine[] {
  const projects = ctx.projects ?? [];
  const projectsList = projects.map(p => `    ├── ${p.name}.md`);
  const posts = ctx.posts ?? [];
  const blogList = posts.map(b => `    ├── ${b.slug}.md`);
  return [
    '.',
    '├── about',
    '│   ├── bio.md',
    '│   └── skills.json',
    '├── blog',
    ...blogList,
    '└── projects',
    ...projectsList,
    '',
    `3 directories, ${projectsList.length + blogList.length + 2} files`
  ];
}

function runOpen(name: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!name) return ['Usage: open <name>. Examples: open VortexDL, open Arcania, open harm-of-ai'];
  const clean = name.replace(/\.md$/, '').toLowerCase();
  const projects = ctx.projects ?? [];
  const foundProject = projects.find(p => p.name.toLowerCase() === clean);
  if (foundProject) {
    ctx.navigateTo('/projects');
    return [
      [
        { text: 'Navigating to project: ', color: 'var(--text-dim)' },
        { text: foundProject.name, bold: true, color: 'var(--color-green)' }
      ]
    ];
  }
  const posts = ctx.posts ?? [];
  const foundPost = posts.find(p => p.slug.toLowerCase() === clean);
  if (foundPost) {
    ctx.navigateTo(`/blog/${foundPost.slug}`);
    return [
      [
        { text: 'Navigating to post: ', color: 'var(--text-dim)' },
        { text: foundPost.title, bold: true, color: 'var(--color-green)' }
      ]
    ];
  }
  return [`open: target not found: "${name}"`];
}

function runTheme(name: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (name === 'dark' || name === 'matrix' || name === 'amber') {
    ctx.setTheme(name);
    return [`Terminal theme switched to "${name}".`];
  }
  return [`Usage: theme [dark|matrix|amber]. Current: ${ctx.theme}`];
}

function runMan(cmd: string | null): readonly TerminalLine[] {
  if (!cmd) return ['What manual page do you want? Example: man ls'];
  return [`${cmd.toUpperCase()}(1) - NixOS User Commands`, `Manual entry for command: ${cmd}`];
}

function resolvePath(target: string, cur: string): string {
  if (target === '~' || target === '') return '/home/igni';
  if (target.startsWith('~/')) return `/home/igni/${target.slice(2)}`;
  if (target === '..') {
    const segs = cur.split('/').filter(Boolean);
    segs.pop();
    return '/' + segs.join('/');
  }
  if (target.startsWith('/')) return target;
  return cur === '/' ? `/${target}` : `${cur}/${target}`;
}

function getItemsForDir(
  dir: string,
  ctx: TerminalCommandContext
): readonly { name: string; isDir: boolean; color: string }[] {
  if (dir === '/') {
    return [
      { name: 'bin', isDir: true, color: '#38bdf8' },
      { name: 'etc', isDir: true, color: '#38bdf8' },
      { name: 'home', isDir: true, color: '#38bdf8' }
    ];
  }
  if (dir === '/bin') return BIN_COMMANDS.map(c => ({ name: c, isDir: false, color: '#4ade80' }));
  if (dir === '/etc') return [{ name: 'os-release', isDir: false, color: '#f1f5f9' }];
  if (dir === '/home') return [{ name: 'igni', isDir: true, color: '#38bdf8' }];
  if (dir === '/home/igni') {
    return [
      { name: 'about', isDir: true, color: '#38bdf8' },
      { name: 'blog', isDir: true, color: '#38bdf8' },
      { name: 'projects', isDir: true, color: '#38bdf8' }
    ];
  }
  if (dir === '/home/igni/about') {
    return [
      { name: 'bio.md', isDir: false, color: '#f1f5f9' },
      { name: 'skills.json', isDir: false, color: '#facc15' }
    ];
  }
  if (dir === '/home/igni/projects') {
    const projects = ctx.projects ?? [];
    return projects.map(p => ({ name: `${p.name}.md`, isDir: false, color: '#f1f5f9' }));
  }
  if (dir === '/home/igni/blog') {
    const posts = ctx.posts ?? [];
    return posts.map(b => ({ name: `${b.slug}.md`, isDir: false, color: '#f1f5f9' }));
  }
  return [];
}

function listCurrentEntries(ctx: TerminalCommandContext): readonly string[] {
  return getItemsForDir(ctx.cwd, ctx).map(i => i.name + (i.isDir ? '/' : ''));
}

function formatUptime(sessionStart: number): string {
  const sec = Math.floor((Date.now() - sessionStart) / 1000);
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  return ` ${new Date().toTimeString().slice(0, 8)} up ${hrs} hours, ${mins} mins, 1 user, load average: 0.05, 0.03, 0.01`;
}

function formatScreenfetchUptime(sessionStart: number): string {
  const sec = Math.floor((Date.now() - sessionStart) / 1000);
  const mins = Math.floor(sec / 60);
  return mins > 0 ? `1d 11h ${37 + mins}m` : '1d 11h 37m';
}

function runProjects(ctx: TerminalCommandContext): readonly TerminalLine[] {
  const projects = ctx.projects;
  if (projects === null) {
    return [[{ text: 'Загрузка списка проектов с сервера...', color: 'var(--text-dim)' }]];
  }

  if (projects.length === 0) {
    return [[{ text: 'Проекты не найдены.', color: 'var(--text-dim)' }]];
  }

  const lines: TerminalLine[] = [
    [{ text: `ПРОЕКТЫ РАЗРАБОТЧИКА (${projects.length}):`, bold: true, color: '#7ebae4' }],
    ''
  ];

  projects.forEach((p, idx) => {
    lines.push([
      { text: `[${idx + 1}] `, color: 'var(--text-dim)' },
      { text: p.name, bold: true, color: '#38bdf8' },
      { text: ` (${p.year}) `, color: 'var(--text-dim)' },
      {
        text: `[${p.category.toUpperCase()}]`,
        color: p.category === 'prod' ? 'var(--color-green)' : '#facc15',
        bold: true
      }
    ]);
    lines.push([
      { text: '    Роль: ', color: 'var(--text-dim)' },
      { text: p.role }
    ]);
    lines.push([
      { text: '    Инфо: ', color: 'var(--text-dim)' },
      { text: p.shortDesc }
    ]);
    lines.push([
      { text: '    Стек: ', color: 'var(--text-dim)' },
      { text: p.techStack.join(', '), color: '#a78bfa' }
    ]);
    if (p.githubUrl) {
      lines.push([
        { text: '    Код:  ', color: 'var(--text-dim)' },
        { text: p.githubUrl, color: 'var(--accent)' }
      ]);
    }
    lines.push('');
  });

  lines.push([
    { text: 'Подсказка: ', color: 'var(--text-dim)' },
    { text: 'open <name>', bold: true, color: 'var(--code-ident)' },
    { text: ' — открыть в GUI, ', color: 'var(--text-dim)' },
    { text: 'cat projects/<name>.md', bold: true, color: 'var(--code-ident)' },
    { text: ' — подробный обзор.', color: 'var(--text-dim)' }
  ]);

  return lines;
}

function runBlog(ctx: TerminalCommandContext): readonly TerminalLine[] {
  const posts = ctx.posts;
  if (posts === null) {
    return [[{ text: 'Загрузка статей с сервера...', color: 'var(--text-dim)' }]];
  }

  if (posts.length === 0) {
    return [[{ text: 'Статьи не найдены.', color: 'var(--text-dim)' }]];
  }

  const lines: TerminalLine[] = [
    [{ text: `СТАТЬИ И ПУБЛИКАЦИИ (${posts.length}):`, bold: true, color: '#7ebae4' }],
    ''
  ];

  posts.forEach((p, idx) => {
    lines.push([
      { text: `[${idx + 1}] `, color: 'var(--text-dim)' },
      { text: p.title, bold: true, color: '#38bdf8' },
      { text: ` (${p.readTime})`, color: 'var(--text-dim)' }
    ]);
    lines.push([
      { text: '    Тема:  ', color: 'var(--text-dim)' },
      { text: p.subtitle }
    ]);
    lines.push([
      { text: '    Инфо:  ', color: 'var(--text-dim)' },
      { text: p.excerpt }
    ]);
    lines.push([
      { text: '    Теги:  ', color: 'var(--text-dim)' },
      { text: p.tags.join(', '), color: '#a78bfa' }
    ]);
    lines.push('');
  });

  lines.push([
    { text: 'Подсказка: ', color: 'var(--text-dim)' },
    { text: 'open <slug>', bold: true, color: 'var(--code-ident)' },
    { text: ' — открыть в блоге, ', color: 'var(--text-dim)' },
    { text: 'cat blog/<slug>.md', bold: true, color: 'var(--code-ident)' },
    { text: ' — читать статью.', color: 'var(--text-dim)' }
  ]);

  return lines;
}
