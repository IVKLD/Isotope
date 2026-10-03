import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_SUMMARIES } from '@features/blog/blog-summaries.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => BLOG_SUMMARIES.map(post => ({ slug: post.slug }))
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
