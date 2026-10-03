import { inject } from '@angular/core';
import { ResolveFn, RedirectCommand, Router } from '@angular/router';
import { BlogPost } from './blog.types';
import { BLOG_POST_LOADERS } from './blog.loaders';

export const blogPostResolver: ResolveFn<BlogPost> = async route => {
  const router = inject(Router);
  const slug = route.paramMap.get('slug');
  const loader = slug ? BLOG_POST_LOADERS[slug] : undefined;

  if (!loader) {
    return new RedirectCommand(router.parseUrl('/blog'));
  }

  return await loader();
};
