import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowLeft,
  LucideHeart,
  LucideFlame,
  LucideRocket,
  LucideSparkles
} from '@lucide/angular';
import { LogoIconComponent } from '@shared/ui/icons/logo-icon.component';
import { OutlineButtonDirective } from '@shared/ui/button/outline-button.directive';
import { ReactionType } from '@isotope/contracts';

@Component({
  selector: 'app-blog-post-footer',
  imports: [
    RouterLink,
    OutlineButtonDirective,
    LogoIconComponent,
    LucideArrowLeft,
    LucideHeart,
    LucideFlame,
    LucideRocket,
    LucideSparkles
  ],
  templateUrl: './blog-post-footer.component.html',
  styleUrl: './blog-post-footer.component.scss'
})
export class BlogPostFooterComponent {
  public readonly reactions = input.required<Record<ReactionType, number>>();
  public readonly react = output<ReactionType>();
}
