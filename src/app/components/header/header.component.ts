import { Component, inject } from '@angular/core';
import { TerminalService } from '@services/terminal.service';
import { LucideTerminal, LucideSend } from '@lucide/angular';
import { GithubIconComponent } from '@components/icons/github-icon.component';

@Component({
  selector: 'app-header',
  imports: [LucideTerminal, LucideSend, GithubIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(window:keydown)': 'onKeydown($event)'
  }
})
export class HeaderComponent {
  private readonly terminal = inject(TerminalService);

  protected scrollTo(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }

  protected toggleTerminal(): void {
    this.terminal.toggle();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.terminal.toggle();
    }
  }
}
