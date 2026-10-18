import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideSend } from '@lucide/angular';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { CliButtonComponent } from '@shared/ui/cli-button/cli-button.component';
import { LazyDialogService } from '@core/services/lazy-dialog.service';

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
  private readonly dialog = inject(LazyDialogService);

  protected openTerminal(): void {
    this.dialog
      .openLazy(
        () => import('@features/terminal/terminal-modal.component').then(m => m.TerminalModalComponent)
      )
      .subscribe();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.openTerminal();
    }
  }
}
