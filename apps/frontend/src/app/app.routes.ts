import { Routes } from '@angular/router';
import { blogPostResolver } from '@features/blog/blog.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/home-page/home-page.component').then(m => m.HomePageComponent),
        title: 'IgnI — Frontend / Angular Developer'
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('@pages/projects-page/projects-page.component').then(m => m.ProjectsPageComponent),
        title: 'Проекты — Коммерческая разработка и open-source | IgnI'
      },
      {
        path: 'why-angular',
        loadComponent: () =>
          import('@pages/why-angular-page/why-angular-page.component').then(
            m => m.WhyAngularPageComponent
          ),
        title: 'Почему Angular, а не React, Vue или Svelte | IgnI'
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('@pages/blog-list-page/blog-list-page.component').then(m => m.BlogListPageComponent),
        title: 'Блог — Инженерные статьи и заметки | IgnI'
      },
      {
        path: 'blog/:slug',
        loadComponent: () =>
          import('@pages/blog-post-page/blog-post-page.component').then(m => m.BlogPostPageComponent),
        resolve: {
          post: blogPostResolver
        },
        title: route => {
          const post = route.data?.['post'];
          return post?.title ? `${post.title} — Блог | IgnI` : 'Статья блога | IgnI';
        }
      }
    ]
  },
  {
    path: 'terminal',
    loadComponent: () =>
      import('@pages/terminal-page/terminal-page.component').then(m => m.TerminalPageComponent),
    title: 'Terminal (TTY) — NixOS Interactive Shell | IgnI'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
