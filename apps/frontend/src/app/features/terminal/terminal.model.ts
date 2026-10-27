import { BlogSummaryRdo, ProjectRdo } from '@isotope/contracts';

export type TerminalSpan = {
  readonly text: string;
  readonly color?: string;
  readonly bold?: boolean;
};

export type TerminalLine = string | readonly TerminalSpan[];

export type TerminalVirtualLine =
  | {
      readonly id: number;
      readonly kind: 'prompt-top';
      readonly cwd: string;
    }
  | {
      readonly id: number;
      readonly kind: 'prompt-cmd';
      readonly command: string;
    }
  | {
      readonly id: number;
      readonly kind: 'output';
      readonly spans: readonly TerminalSpan[];
    };

export type TerminalCommandContext = {
  readonly cwd: string;
  setCwd(dir: string): void;
  readonly sessionStart: number;
  readonly commandHistory: readonly string[];
  readonly projects: readonly ProjectRdo[] | null;
  readonly posts: readonly BlogSummaryRdo[] | null;
  navigateTo(url: string): void;
};
