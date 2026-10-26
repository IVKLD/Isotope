import { Component, input } from '@angular/core';
import { BlogPostRdo } from '@isotope/contracts';
import { BlogPostComponent } from '@features/blog/blog-post/blog-post.component';

@Component({
  selector: 'app-blog-post-page',
  imports: [BlogPostComponent],
  template: `<app-blog-post [post]="post()" />`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class BlogPostPageComponent {
  public readonly post = input.required<BlogPostRdo>();
}
