import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideTerminal, LucideSend } from '@lucide/angular';
import { GithubIconComponent, LogoIconComponent } from '@shared/ui/icons';
import { PlatformService } from '@core/services';
import { TerminalService } from '@features/terminal';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideTerminal,
    LucideSend,
    GithubIconComponent,
    LogoIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    '(window:keydown)': 'onKeydown($event)'
  }
})
export class HeaderComponent {
  private readonly platform = inject(PlatformService);
  protected readonly terminal = inject(TerminalService);

  protected readonly isMac = this.platform.isMac;

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      void this.terminal.open();
    }
  }
}
