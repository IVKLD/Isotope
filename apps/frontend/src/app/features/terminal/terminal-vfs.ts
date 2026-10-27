import { TerminalCommandContext } from './terminal.model';
import {
  BIN_COMMANDS,
  BIO_TEXT,
  NIXOS_OS_RELEASE,
  SKILLS_JSON
} from './terminal-data';

export interface DirEntry {
  readonly name: string;
  readonly isDir: boolean;
  readonly color: string;
}

export function resolvePath(target: string, cur: string): string {
  if (!target || target === '~') return '/home/igni';
  const full = target.startsWith('~/')
    ? `/home/igni/${target.slice(2)}`
    : target.startsWith('/')
      ? target
      : `${cur}/${target}`;

  const stack: string[] = [];
  for (const part of full.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') {
      stack.pop();
    } else {
      stack.push(part);
    }
  }
  return '/' + stack.join('/');
}

export function getDirectoryEntries(dir: string, ctx: TerminalCommandContext): readonly DirEntry[] | null {
  switch (dir) {
    case '/':
      return [
        { name: 'bin', isDir: true, color: '#38bdf8' },
        { name: 'etc', isDir: true, color: '#38bdf8' },
        { name: 'home', isDir: true, color: '#38bdf8' }
      ];
    case '/bin':
      return BIN_COMMANDS.map(c => ({ name: c, isDir: false, color: '#4ade80' }));
    case '/etc':
      return [{ name: 'os-release', isDir: false, color: '#f1f5f9' }];
    case '/home':
      return [{ name: 'igni', isDir: true, color: '#38bdf8' }];
    case '/home/igni':
      return [
        { name: 'about', isDir: true, color: '#38bdf8' },
        { name: 'blog', isDir: true, color: '#38bdf8' },
        { name: 'projects', isDir: true, color: '#38bdf8' }
      ];
    case '/home/igni/about':
      return [
        { name: 'bio.md', isDir: false, color: '#f1f5f9' },
        { name: 'skills.json', isDir: false, color: '#facc15' }
      ];
    case '/home/igni/projects':
      return (ctx.projects ?? []).map(p => ({
        name: `${p.name}.md`,
        isDir: false,
        color: '#f1f5f9'
      }));
    case '/home/igni/blog':
      return (ctx.posts ?? []).map(b => ({
        name: `${b.slug}.md`,
        isDir: false,
        color: '#f1f5f9'
      }));
    default:
      return null;
  }
}

export function readFileContent(path: string, ctx: TerminalCommandContext): readonly string[] | null {
  if (path === '/etc/os-release') return NIXOS_OS_RELEASE.split('\n');
  if (path === '/home/igni/about/bio.md') return BIO_TEXT.split('\n');
  if (path === '/home/igni/about/skills.json') return SKILLS_JSON.split('\n');

  if (path.startsWith('/home/igni/projects/')) {
    const name = path.slice(20).replace(/\.md$/, '').toLowerCase();
    const p = ctx.projects?.find(x => x.name.toLowerCase() === name);
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
    const b = ctx.posts?.find(x => x.slug.toLowerCase() === slug);
    if (b) {
      return [`# ${b.title}`, `Subtitle: ${b.subtitle}`, `Read time: ${b.readTime}`, '', b.excerpt];
    }
  }

  return null;
}
