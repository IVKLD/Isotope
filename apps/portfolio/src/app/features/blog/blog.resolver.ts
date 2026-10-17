import { inject } from '@angular/core';
import { ResolveFn, RedirectCommand, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BlogPostRdo } from '@portfolio/contracts';
import { BlogService } from './blog.service';

export const blogPostResolver: ResolveFn<BlogPostRdo> = async route => {
  const router = inject(Router);
  const blogService = inject(BlogService);
  const slug = route.paramMap.get('slug');

  if (!slug) {
    return new RedirectCommand(router.parseUrl('/blog'));
  }

  const post = await firstValueFrom(blogService.getPost(slug));
  if (!post) {
    return new RedirectCommand(router.parseUrl('/blog'));
  }

  return post;
};
