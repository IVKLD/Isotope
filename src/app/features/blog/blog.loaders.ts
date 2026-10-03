import { BlogPost } from './blog.types';

export const BLOG_POST_LOADERS: Record<string, () => Promise<BlogPost>> = {
  'harm-of-ai-in-projects': () => import('./posts/harm-of-ai.data').then(m => m.HARM_OF_AI_POST),
  'zoneless-angular-signals-production': () =>
    import('./posts/zoneless.data').then(m => m.ZONELESS_POST),
  'nx-monorepo-domain-boundaries': () =>
    import('./posts/nx-monorepo.data').then(m => m.NX_MONOREPO_POST),
  'rust-and-angular-desktop-integration': () =>
    import('./posts/rust-desktop.data').then(m => m.RUST_DESKTOP_POST),
  'cva-reusable-form-controls': () => import('./posts/cva-forms.data').then(m => m.CVA_FORMS_POST)
};
