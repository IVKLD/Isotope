export interface TerminalCommandRequest {
  command: string;
  args?: string[];
}

export interface TerminalCommandResponse {
  output: string;
  exitCode: number;
  format?: 'text' | 'json' | 'ansi';
}
