import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideX, LucideTerminal, LucideCornerDownLeft } from '@lucide/angular';
import { DialogCloseDirective } from '@directives/dialog-close.directive';
import { TerminalService, TerminalEntry } from '@services/terminal.service';

@Component({
  selector: 'app-terminal-modal',
  imports: [
    FormsModule,
    LucideX,
    LucideTerminal,
    LucideCornerDownLeft,
    DialogCloseDirective
  ],
  templateUrl: './terminal-modal.component.html',
  styleUrl: './terminal-modal.component.scss'
})
export class TerminalModalComponent {
  private readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');

  protected readonly terminal = inject(TerminalService);
  protected currentInput = '';

  constructor() {
    effect(() => {
      this.terminal.history();
      queueMicrotask(() => {
        const el = this.viewport()?.nativeElement;
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      });
    });
  }

  protected onSubmit(): void {
    if (!this.currentInput.trim()) return;
    this.terminal.execute(this.currentInput);
    this.currentInput = '';
  }

  protected trackByEntry(index: number, item: TerminalEntry): string {
    return `${index}-${item.command}`;
  }
}
