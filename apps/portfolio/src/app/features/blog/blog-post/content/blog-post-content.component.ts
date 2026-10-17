import { Component, input } from '@angular/core';
import {
  LucideShieldAlert,
  LucideTriangleAlert,
  LucideBug,
  LucideCircleCheck
} from '@lucide/angular';
import { CodeBlockComponent } from '@shared/ui/code-block/code-block.component';
import { BlogSectionRdo } from '@portfolio/contracts';

@Component({
  selector: 'app-blog-post-content',
  imports: [
    CodeBlockComponent,
    LucideShieldAlert,
    LucideTriangleAlert,
    LucideBug,
    LucideCircleCheck
  ],
  templateUrl: './blog-post-content.component.html',
  styleUrl: './blog-post-content.component.scss'
})
export class BlogPostContentComponent {
  public readonly sections = input.required<readonly BlogSectionRdo[]>();
}
