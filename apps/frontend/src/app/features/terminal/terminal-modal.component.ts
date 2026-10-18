import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  afterNextRender,
  DestroyRef
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  LucideX,
  LucideTerminal,
  LucideCornerDownLeft,
  LucideMaximize2,
  LucideMinimize2,
  LucideMoveDiagonal2
} from '@lucide/angular';
import { DialogCloseDirective } from '@shared/ui/dialog/dialog-close.directive';
import { DialogHeaderDirective } from '@shared/ui/dialog/dialog-header.directive';
import { createWindowResizeController } from '@shared/ui/dialog/window-resize.util';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { TerminalService } from './terminal.service';

@Component({
  selector: 'app-terminal-modal',
  host: {
    '[class.is-maximized]': 'isMaximized()',
    '[style.--terminal-width]': 'customWidth()',
    '[style.--terminal-height]': 'customHeight()'
  },
  imports: [
    FormField,
    LucideX,
    LucideTerminal,
    LucideCornerDownLeft,
    LucideMaximize2,
    LucideMinimize2,
    LucideMoveDiagonal2,
    DialogCloseDirective,
    DialogHeaderDirective,
    IconButtonDirective,
    OutlineButtonDirective
  ],
  templateUrl: './terminal-modal.component.html',
  styleUrl: './terminal-modal.component.scss'
})
export class TerminalModalComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');
  private readonly cmdInput = viewChild<ElementRef<HTMLInputElement>>('cmdInput');
  private readonly destroyRef = inject(DestroyRef);
  private readonly resizer = createWindowResizeController();

  protected readonly terminal = inject(TerminalService);
  protected readonly currentInput = signal('');
  protected readonly inputField = form(this.currentInput);
  protected readonly isMaximized = signal(false);
  protected readonly customWidth = signal<string | null>(null);
  protected readonly customHeight = signal<string | null>(null);
  protected readonly quickCommands = ['whoami', 'projects', 'stack', 'contact', 'clear'] as const;

  private scrollRafId = 0;

  constructor() {
    afterNextRender(() => {
      this.cmdInput()?.nativeElement.focus();
      this.scrollToBottom();
    });

    this.destroyRef.onDestroy(() => {
      this.resizer.destroy();
      if (this.scrollRafId) {
        cancelAnimationFrame(this.scrollRafId);
        this.scrollRafId = 0;
      }
    });
  }

  protected toggleMaximize(): void {
    if (!this.isMaximized()) {
      this.customWidth.set('calc(100vw - 32px)');
      this.customHeight.set('calc(100vh - 32px)');
      this.isMaximized.set(true);
    } else {
      this.customWidth.set(null);
      this.customHeight.set(null);
      this.isMaximized.set(false);
    }

    this.scrollToBottom();
  }

  protected onResizeStart(event: PointerEvent): void {
    if (this.isMaximized()) return;
    this.resizer.startResize(event, this.elementRef.nativeElement, ({ width, height }) => {
      this.customWidth.set(`${width}px`);
      this.customHeight.set(`${height}px`);
    });
  }

  protected onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const value = this.currentInput().trim();
    if (!value) return;
    this.runCommand(value);
    this.currentInput.set('');
  }

  protected runCommand(command: string): void {
    this.terminal.execute(command);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
    }
    this.scrollRafId = requestAnimationFrame(() => {
      this.scrollRafId = 0;
      const el = this.viewport()?.nativeElement;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  }
}
