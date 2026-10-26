import {
  Component,
  inject,
  signal,
  viewChild,
  afterNextRender
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  RxVirtualScrollViewportComponent,
  RxVirtualFor,
  FixedSizeVirtualScrollStrategy,
  RxVirtualScrollElementDirective
} from '@rx-angular/template/virtual-scrolling';
import { SoundService } from '@core/services/sound.service';
import { TerminalService } from './terminal.service';

@Component({
  selector: 'app-terminal',
  host: {
    '[class.theme-dark]': "terminal.theme() === 'dark'",
    '[class.theme-matrix]': "terminal.theme() === 'matrix'",
    '[class.theme-amber]': "terminal.theme() === 'amber'",
    '(window:keydown)': 'onGlobalKeydown($event)'
  },
  imports: [
    FormField,
    RxVirtualScrollViewportComponent,
    RxVirtualFor,
    FixedSizeVirtualScrollStrategy,
    RxVirtualScrollElementDirective
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent {
  private readonly virtualViewport = viewChild<RxVirtualScrollViewportComponent>('virtualViewport');

  protected readonly terminal = inject(TerminalService);
  private readonly sound = inject(SoundService);
  protected readonly currentInput = signal('');
  protected readonly field = form(this.currentInput);

  private historyCursor = -1;
  private inputStash = '';

  constructor() {
    afterNextRender(() => {
      this.field().focusBoundControl();
      this.scrollToBottom();
    });
  }

  protected promptPath(): string {
    return this.terminal.promptPath();
  }

  protected formatEntryPath(cwd: string): string {
    if (cwd === '/home/igni') return '~';
    if (cwd.startsWith('/home/igni/')) return `~/${cwd.slice(11)}`;
    return cwd;
  }

  protected onSubmit(event?: Event): void {
    event?.preventDefault();
    const cmd = this.currentInput();
    this.terminal.execute(cmd);
    this.resetInput();
    this.scrollToBottom();
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    if (!event.repeat && event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Meta') {
      this.sound.playKeyClick();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      this.onSubmit(event);
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      this.handleTabCompletion();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.navigateHistory(-1);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.navigateHistory(1);
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      const lowKey = event.key.toLowerCase();
      if (lowKey === 'c') {
        const selection = window.getSelection()?.toString();
        if (!selection) {
          event.preventDefault();
          this.terminal.pushAbortedLine(this.currentInput());
          this.resetInput();
          this.scrollToBottom();
        }
        return;
      }

      if (lowKey === 'l') {
        event.preventDefault();
        this.terminal.clear();
        return;
      }

      if (lowKey === 'd') {
        if (!this.currentInput()) {
          event.preventDefault();
          this.terminal.exit();
        }
        return;
      }
    }
  }

  protected onGlobalKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.terminal.exit();
    }
  }

  private handleTabCompletion(): void {
    const raw = this.currentInput();
    const res = this.terminal.getCompletions(raw);

    if (res.newLine !== raw) {
      this.currentInput.set(res.newLine);
    } else if (res.candidates.length > 0) {
      this.terminal.pushCandidates(raw, res.candidates);
    }
    this.scrollToBottom();
  }

  private navigateHistory(direction: number): void {
    const list = this.terminal.commandHistory();
    if (list.length === 0) return;

    if (this.historyCursor === -1 && direction < 0) {
      this.inputStash = this.currentInput();
      this.historyCursor = list.length - 1;
      this.currentInput.set(list[this.historyCursor]);
      return;
    }

    const next = this.historyCursor + direction;
    if (next < 0) return;
    if (next >= list.length) {
      this.historyCursor = -1;
      this.currentInput.set(this.inputStash);
      return;
    }

    this.historyCursor = next;
    this.currentInput.set(list[this.historyCursor]);
  }

  private resetInput(): void {
    this.currentInput.set('');
    this.historyCursor = -1;
    this.inputStash = '';
  }

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const vp = this.virtualViewport();
      const count = this.terminal.lines().length;
      if (vp && count > 0) {
        vp.scrollToIndex(count - 1);
      }
    });
  }

}
