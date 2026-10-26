import { Component } from '@angular/core';
import { BlogListComponent } from '@features/blog/blog-list/blog-list.component';

@Component({
  selector: 'app-blog-list-page',
  imports: [BlogListComponent],
  template: `<app-blog-list />`,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `
})
export class BlogListPageComponent {}
