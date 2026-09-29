import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { TerminalService } from '@services/terminal.service';
import { FormsModule } from '@angular/forms';
import { LucideX, LucideTerminal, LucideCornerDownLeft } from '@lucide/angular';

@Component({
  selector: 'app-terminal-modal',
  imports: [FormsModule, LucideX, LucideTerminal, LucideCornerDownLeft],
  templateUrl: './terminal-modal.component.html',
  styleUrl: './terminal-modal.component.scss',
  host: {
    '(window:keydown.escape)': 'onEscape()'
  }
})
export class TerminalModalComponent {
  private readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');
  private readonly cmdInput = viewChild<ElementRef<HTMLInputElement>>('cmdInput');

  protected readonly terminal = inject(TerminalService);
  protected currentInput = '';

  constructor() {
    effect(() => {
      if (this.terminal.isOpen()) {
        setTimeout(() => {
          this.cmdInput()?.nativeElement.focus();
        }, 50);
      }
    });
  }

  protected handleClose(): void {
    this.terminal.close();
  }

  protected onEscape(): void {
    if (this.terminal.isOpen()) {
      this.handleClose();
    }
  }

  protected onSubmit(): void {
    if (!this.currentInput.trim()) return;
    this.terminal.execute(this.currentInput);
    this.currentInput = '';
    this.scrollToBottom();
  }

  protected runQuick(command: string): void {
    this.terminal.execute(command);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const el = this.scrollContainer()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 10);
  }

  protected isArray(val: unknown): boolean {
    return Array.isArray(val);
  }

  protected asArray(val: unknown): string[] {
    return val as string[];
  }
}
