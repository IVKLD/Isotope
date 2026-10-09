import { inject, isDevMode, PLATFORM_ID, provideAppInitializer } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

export function provideVercelMonitoring() {
  return provideAppInitializer(() => {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) return;

    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
    if (isLocal) return;

    injectAnalytics({ mode: isDevMode() ? 'development' : 'production' });
    injectSpeedInsights();
  });
}
