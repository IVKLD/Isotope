import { Routes } from '@angular/router';
import { blogPostResolver } from '@features/blog/blog.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent),
    title: 'IgnI — Frontend / Angular Developer'
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('@features/blog/blog-list/blog-list.component').then(m => m.BlogListComponent),
    title: 'Блог — Инженерные статьи и заметки | IgnI'
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('@features/blog/blog-post/blog-post.component').then(m => m.BlogPostComponent),
    resolve: {
      post: blogPostResolver
    },
    title: 'Статья блога | IgnI'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
