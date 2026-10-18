import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http://') || req.url.startsWith('https://') || req.url.startsWith('/api')) {
    return next(req);
  }

  const normalizedPath = req.url.startsWith('/') ? req.url : `/${req.url}`;
  return next(req.clone({ url: `/api${normalizedPath}` }));
};
