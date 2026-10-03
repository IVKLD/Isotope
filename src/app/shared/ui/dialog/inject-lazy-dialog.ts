import { injectAsync, onIdle } from '@angular/core';

export function injectLazyDialog() {
  return injectAsync(() => import('@angular/cdk/dialog').then(m => m.Dialog), {
    prefetch: onIdle
  });
}
