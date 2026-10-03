import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideClock,
  LucideTriangleAlert,
  LucideCircleCheck,
  LucideTerminal,
  LucideShieldAlert,
  LucideBrain,
  LucideBug,
  LucideSend
} from '@lucide/angular';
import { TechPillsComponent } from '@shared/ui/tech-pills';
import { CodeBlockComponent } from '@shared/ui/code-block';
import { LogoIconComponent, GithubIconComponent } from '@shared/ui/icons';
import { TerminalService } from '@features/terminal';
import { BlogPost } from '../blog.types';

@Component({
  selector: 'app-blog-post',
  imports: [
    RouterLink,
    TechPillsComponent,
    CodeBlockComponent,
    LogoIconComponent,
    GithubIconComponent,
    LucideArrowLeft,
    LucideClock,
    LucideTriangleAlert,
    LucideCircleCheck,
    LucideTerminal,
    LucideShieldAlert,
    LucideBrain,
    LucideBug,
    LucideSend
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  public readonly post = input.required<BlogPost>();
  protected readonly terminal = inject(TerminalService);

  protected readonly tocItems = computed(() => {
    return this.post().sections.map(section => ({
      id: section.id,
      title: section.title
    }));
  });
}
