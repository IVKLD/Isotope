import { Component, input } from '@angular/core';
import { LucideClock, LucideSend } from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills/tech-pills.component';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { GithubIconComponent } from '@shared/ui/icons/github-icon.component';
import { IconButtonDirective } from '@shared/ui/button/icon-button.directive';
import { CliButtonComponent } from '@shared/ui/cli-button/cli-button.component';
import { BlogPostRdo } from '@isotope/contracts';

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
  public readonly post = input.required<BlogPostRdo>();
}
