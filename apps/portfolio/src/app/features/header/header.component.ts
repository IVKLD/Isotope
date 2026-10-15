import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideSend } from '@lucide/angular';
import { GithubIconComponent, LogoIconComponent } from '@shared/ui/icons';
import { IconButtonDirective } from '@shared/ui/button';
import { CliButtonComponent } from '@shared/ui/cli-button';
import { injectTerminalDialog } from '@features/terminal';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    CliButtonComponent,
    IconButtonDirective,
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
  private readonly openTerminal = injectTerminalDialog();

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openTerminal();
    }
  }
}
