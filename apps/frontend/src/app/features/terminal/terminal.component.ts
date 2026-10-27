import {
  Component,
  inject,
  signal,
  viewChild,
  afterNextRender
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
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
    '(window:keydown.escape)': 'terminal.exit()'
  },
  imports: [
    FormField,
    FormRoot,
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
  protected readonly field = form(this.currentInput, {
    submission: {
      action: async () => {
        const cmd = this.currentInput();
        this.terminal.execute(cmd);
        this.resetInput();
        this.scrollToBottom();
      }
    }
  });

  private historyCursor = -1;
  private inputStash = '';

  constructor() {
    afterNextRender(() => {
      this.field().focusBoundControl();
      this.scrollToBottom();
    });
  }

  protected onInputKeydown(event: KeyboardEvent): void {
    if (!event.repeat && event.key !== 'Shift' && event.key !== 'Control' && event.key !== 'Alt' && event.key !== 'Meta') {
      this.sound.playKeyClick();
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
