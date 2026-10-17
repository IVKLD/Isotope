export type TerminalCommandDto = {
  command: string;
  args?: string[];
};

export type TerminalCommandRdo = {
  output: string;
  exitCode: number;
  format?: 'text' | 'json' | 'ansi';
};
