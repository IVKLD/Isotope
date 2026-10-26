import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideSend } from '@lucide/angular';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { CliButtonComponent } from '@shared/ui/cli-button/cli-button.component';

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
  private readonly router = inject(Router);

  protected onKeydown(event: KeyboardEvent): void {
    const isModifier = event.metaKey || event.ctrlKey;
    const isTerminalKey =
      event.key.toLowerCase() === 'k' ||
      event.key === '`' ||
      event.key === 'ё' ||
      event.key === '~';

    if (isModifier && isTerminalKey) {
      event.preventDefault();
      if (this.router.url === '/terminal') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/terminal']);
      }
    }
  }
}
