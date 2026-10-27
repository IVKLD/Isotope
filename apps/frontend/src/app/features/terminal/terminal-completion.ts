import { TerminalCommandContext } from './terminal.model';
import { BIN_COMMANDS } from './terminal-data';
import { getDirectoryEntries } from './terminal-vfs';

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

  if (command === 'open') {
    const list = [
      'projects',
      'blog',
      'why-angular',
      ...(ctx.projects ?? []).map(p => p.name),
      ...(ctx.posts ?? []).map(p => p.slug)
    ].filter(n => n.toLowerCase().startsWith(arg.toLowerCase()));
    if (list.length === 1) return { newLine: `open ${list[0]}`, candidates: [] };
    return { newLine: rawInput, candidates: list };
  }

  const entries = (getDirectoryEntries(ctx.cwd, ctx) ?? []).map(i => i.name + (i.isDir ? '/' : ''));
  const matches = entries.filter(e => e.toLowerCase().startsWith(arg.toLowerCase()));
  if (matches.length === 1) {
    const prefix = rawInput.slice(0, rawInput.length - arg.length);
    return { newLine: `${prefix}${matches[0]}`, candidates: [] };
  }
  return { newLine: rawInput, candidates: matches };
}
