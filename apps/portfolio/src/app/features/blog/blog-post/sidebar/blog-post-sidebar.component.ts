import { Component, input } from '@angular/core';
import { LucideBrain } from '@lucide/angular';

@Component({
  selector: 'app-blog-post-sidebar',
  imports: [LucideBrain],
  templateUrl: './blog-post-sidebar.component.html',
  styleUrl: './blog-post-sidebar.component.scss'
})
export class BlogPostSidebarComponent {
  public readonly items = input.required<{ id: string; title: string }[]>();
  public readonly takeaway = input.required<string>();
}
