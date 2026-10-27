import { TerminalCommandContext, TerminalLine, TerminalSpan } from './terminal.model';
import { HELP_LINES, buildScreenfetchLines, formatUptime, formatUptimeDuration } from './terminal-data';
import { getDirectoryEntries, readFileContent, resolvePath } from './terminal-vfs';

const PAGE_MAP: Readonly<Record<string, string>> = {
  projects: '/projects',
  blog: '/blog',
  'why-angular': '/why-angular',
  '~': '/',
  '/': '/',
  home: '/'
};

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
      return runLs(args, cmd === 'll' || args.some(a => a.startsWith('-') && a.includes('l')), ctx);
    case 'cat':
      return runCat(args[0] || null, ctx);
    case 'tree':
      return runTree(args[0] || null, ctx);
    case 'neofetch':
    case 'fastfetch':
    case 'screenfetch':
      return buildScreenfetchLines(formatUptimeDuration(ctx.sessionStart));
    case 'whoami':
      return ['igni'];
    case 'id':
      return ['uid=1000(igni) gid=1000(developers) groups=1000(angular),1001(rust),1002(systems)'];
    case 'uptime':
      return [formatUptime(ctx.sessionStart)];
    case 'uname':
      return [args.some(a => a === '-a' || a === '--all')
        ? 'Linux desktop 7.2.11 #1-NixOS SMP PREEMPT_DYNAMIC Sun, 26 Oct 2026 21:00:00 +0000 x86_64 GNU/Linux'
        : 'Linux'];
    case 'date':
      return [new Date().toUTCString()];
    case 'help':
      return HELP_LINES;
    case 'man':
      return args[0] ? [`Manual entry for ${args[0]}: see help.`] : ['What manual page do you want? Example: man ls'];
    case 'history':
      return ctx.commandHistory.map((c, i) => `  ${i + 1}  ${c}`);
    case 'open':
      return runOpen(args[0] || null, ctx);
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

function runCd(target: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!target || target === '~') {
    ctx.setCwd('/home/igni');
    return [];
  }
  const resolved = resolvePath(target, ctx.cwd);
  if (!getDirectoryEntries(resolved, ctx)) return [`cd: no such file or directory: ${target}`];
  ctx.setCwd(resolved);
  return [];
}

function runLs(args: readonly string[], long: boolean, ctx: TerminalCommandContext): readonly TerminalLine[] {
  const pathArg = args.find(a => !a.startsWith('-')) || null;
  const targetDir = pathArg ? resolvePath(pathArg, ctx.cwd) : ctx.cwd;
  const items = getDirectoryEntries(targetDir, ctx);
  if (!items) return [`ls: cannot access '${pathArg}': No such file or directory`];

  if (long) {
    return [
      `total ${items.length * 4}`,
      ...items.map(item => [
        { text: `${item.isDir ? 'drwxr-xr-x' : '-rw-r--r--'} 1 igni developers 4096 Oct 27 00:00 ` },
        { text: item.name + (item.isDir ? '/' : ''), color: item.color, bold: item.isDir }
      ])
    ];
  }

  const spans: TerminalSpan[] = items.flatMap((item, i) => [
    { text: item.name + (item.isDir ? '/' : ''), color: item.color, bold: item.isDir },
    ...(i < items.length - 1 ? [{ text: '  ' }] : [])
  ]);
  return [spans];
}

function runCat(file: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!file) return ['cat: missing operand'];
  const path = resolvePath(file, ctx.cwd);
  const content = readFileContent(path, ctx);
  if (content) return content;
  if (getDirectoryEntries(path, ctx)) return [`cat: ${file}: Is a directory`];
  return [`cat: ${file}: No such file or directory`];
}

function runTree(pathArg: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  const targetDir = pathArg ? resolvePath(pathArg, ctx.cwd) : ctx.cwd;
  const rootEntries = getDirectoryEntries(targetDir, ctx);
  if (!rootEntries) return [`tree: '${pathArg}': No such file or directory`];

  const lines: string[] = [pathArg || '.'];
  let dirCount = 0;
  let fileCount = 0;

  function walk(dir: string, prefix: string): void {
    const entries = getDirectoryEntries(dir, ctx);
    if (!entries) return;
    entries.forEach((entry, idx) => {
      const isLast = idx === entries.length - 1;
      lines.push(`${prefix}${isLast ? '└── ' : '├── '}${entry.name}`);
      if (entry.isDir) {
        dirCount++;
        walk(`${dir === '/' ? '' : dir}/${entry.name}`, `${prefix}${isLast ? '    ' : '│   '}`);
      } else {
        fileCount++;
      }
    });
  }

  walk(targetDir, '');
  lines.push('', `${dirCount} directories, ${fileCount} files`);
  return lines;
}

function runOpen(target: string | null, ctx: TerminalCommandContext): readonly TerminalLine[] {
  if (!target) return ['Usage: open <target>. Examples: open projects, open blog, open VortexDL, open harm-of-ai'];
  const clean = target.replace(/\.md$/, '').toLowerCase();
  const pageRoute = PAGE_MAP[clean];
  if (pageRoute) {
    ctx.navigateTo(pageRoute);
    return [[{ text: 'Opening: ', color: 'var(--text-dim)' }, { text: pageRoute, color: 'var(--color-green)', bold: true }]];
  }

  const p = ctx.projects?.find(x => x.name.toLowerCase() === clean);
  if (p) {
    ctx.navigateTo('/projects');
    return [[{ text: 'Navigating to project: ', color: 'var(--text-dim)' }, { text: p.name, bold: true, color: 'var(--color-green)' }]];
  }

  const b = ctx.posts?.find(x => x.slug.toLowerCase() === clean);
  if (b) {
    ctx.navigateTo(`/blog/${b.slug}`);
    return [[{ text: 'Navigating to post: ', color: 'var(--text-dim)' }, { text: b.title, bold: true, color: 'var(--color-green)' }]];
  }

  return [`open: target not found: "${target}"`];
}
