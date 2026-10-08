import { Routes } from '@angular/router';
import { blogPostResolver } from '@features/blog/blog.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent),
    title: 'IgnI — Frontend / Angular Developer'
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('@features/bento-grid/bento-grid.component').then(m => m.BentoGridComponent),
    title: 'Проекты — Коммерческая разработка и open-source | IgnI'
  },
  {
    path: 'why-angular',
    loadComponent: () =>
      import('@features/angular-choice/angular-choice.component').then(
        m => m.AngularChoiceComponent
      ),
    title: 'Почему Angular, а не React, Vue или Svelte | IgnI'
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
    title: route => {
      const post = route.data?.['post'];
      return post?.title ? `${post.title} — Блог | IgnI` : 'Статья блога | IgnI';
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
