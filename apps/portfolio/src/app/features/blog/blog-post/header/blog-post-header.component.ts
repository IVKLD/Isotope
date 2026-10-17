import { Component, inject, input } from '@angular/core';
import { LucideClock, LucideSend } from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { CliButtonComponent } from '@shared/ui/cli-button/cli-button.component';
import { LazyDialogService } from '@core/services/lazy-dialog.service';
import { BlogPostRdo } from '@portfolio/contracts';

@Component({
  selector: 'app-blog-post-header',
  imports: [
    IconButtonDirective,
    CliButtonComponent,
    TechPillsComponent,
    LogoIconComponent,
    GithubIconComponent,
    LucideClock,
    LucideSend
  ],
  templateUrl: './blog-post-header.component.html',
  styleUrl: './blog-post-header.component.scss'
})
export class BlogPostHeaderComponent {
  private readonly dialog = inject(LazyDialogService);

  public readonly post = input.required<BlogPostRdo>();

  protected openTerminal(): void {
    this.dialog
      .openLazy(
        () => import('@features/terminal/terminal-modal.component').then(m => m.TerminalModalComponent)
      )
      .subscribe();
  }
}
