import { inject, Injectable, PLATFORM_ID, makeEnvironmentProviders } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface WebVitalsSummary {
  cls: number;
  lcp: number | null;
  fcp: number | null;
  inp: number | null;
  ttfb: number | null;
}

declare global {
  interface Window {
    __webVitals?: WebVitalsSummary;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebVitalsService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly metrics: WebVitalsSummary = {
    cls: 0,
    lcp: null,
    fcp: null,
    inp: null,
    ttfb: null
  };

  public init(): void {
    if (!this.isBrowser || typeof PerformanceObserver === 'undefined') {
      return;
    }

    window.__webVitals = this.metrics;

    this.observeCLS();
    this.observeLCP();
    this.observeFCP();
    this.observeINP();
    this.observeTTFB();
  }

  private observeCLS(): void {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: PerformanceEntry[] = [];

      const observer = new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries() as (PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
          sources?: Array<{
            node?: Node;
            previousRect?: DOMRectReadOnly;
            currentRect?: DOMRectReadOnly;
          }>;
        })[]) {
          if (!entry.hadRecentInput) {
            const firstEntry = sessionEntries[0];
            const lastEntry = sessionEntries[sessionEntries.length - 1];

            if (
              sessionValue &&
              entry.startTime - lastEntry.startTime < 1000 &&
              entry.startTime - firstEntry.startTime < 5000
            ) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.cls = Number(clsValue.toFixed(4));

              const rating =
                clsValue <= 0.1 ? 'GOOD' : clsValue <= 0.25 ? 'NEEDS IMPROVEMENT' : 'POOR';
              const color = clsValue <= 0.1 ? '#22c55e' : clsValue <= 0.25 ? '#eab308' : '#ef4444';

              console.groupCollapsed(
                `%c[Web Vitals] CLS: ${this.metrics.cls} (${rating})`,
                `color: ${color}; font-weight: bold; font-family: monospace;`
              );
              console.log('Shift delta:', entry.value);
              console.log('Cumulative total:', this.metrics.cls);
              if (entry.sources?.length) {
                console.log('Shifted elements:', entry.sources.map(s => s.node).filter(Boolean));
              }
              console.groupEnd();
            }
          }
        }
      });

      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // PerformanceObserver for layout-shift not supported
    }
  }

  private observeLCP(): void {
    try {
      const observer = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { element?: Element };
        if (lastEntry) {
          const lcpMs = Math.round(lastEntry.startTime);
          this.metrics.lcp = lcpMs;

          const rating = lcpMs <= 2500 ? 'GOOD' : lcpMs <= 4000 ? 'NEEDS IMPROVEMENT' : 'POOR';
          const color = lcpMs <= 2500 ? '#22c55e' : lcpMs <= 4000 ? '#eab308' : '#ef4444';

          console.log(
            `%c[Web Vitals] LCP: ${lcpMs}ms (${rating})`,
            `color: ${color}; font-weight: bold; font-family: monospace;`,
            lastEntry.element ?? ''
          );
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // Not supported
    }
  }

  private observeFCP(): void {
    try {
      const observer = new PerformanceObserver(entryList => {
        const fcpEntry = entryList.getEntriesByName('first-contentful-paint')[0];
        if (fcpEntry) {
          const fcpMs = Math.round(fcpEntry.startTime);
          this.metrics.fcp = fcpMs;

          const rating = fcpMs <= 1800 ? 'GOOD' : fcpMs <= 3000 ? 'NEEDS IMPROVEMENT' : 'POOR';
          const color = fcpMs <= 1800 ? '#22c55e' : fcpMs <= 3000 ? '#eab308' : '#ef4444';

          console.log(
            `%c[Web Vitals] FCP: ${fcpMs}ms (${rating})`,
            `color: ${color}; font-weight: bold; font-family: monospace;`
          );
          observer.disconnect();
        }
      });

      observer.observe({ type: 'paint', buffered: true });
    } catch {
      // Not supported
    }
  }

  private observeINP(): void {
    try {
      const observer = new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries() as (PerformanceEntry & { duration: number })[]) {
          const duration = Math.round(entry.duration);
          if (this.metrics.inp === null || duration > this.metrics.inp) {
            this.metrics.inp = duration;
            const rating =
              duration <= 200 ? 'GOOD' : duration <= 500 ? 'NEEDS IMPROVEMENT' : 'POOR';
            const color = duration <= 200 ? '#22c55e' : duration <= 500 ? '#eab308' : '#ef4444';

            console.log(
              `%c[Web Vitals] INP: ${duration}ms (${rating})`,
              `color: ${color}; font-weight: bold; font-family: monospace;`
            );
          }
        }
      });

      observer.observe({ type: 'first-input', buffered: true });
    } catch {
      // Not supported
    }
  }

  private observeTTFB(): void {
    try {
      const navEntry = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;
      if (navEntry) {
        const ttfbMs = Math.round(navEntry.responseStart);
        this.metrics.ttfb = ttfbMs;
        const rating = ttfbMs <= 800 ? 'GOOD' : ttfbMs <= 1800 ? 'NEEDS IMPROVEMENT' : 'POOR';
        const color = ttfbMs <= 800 ? '#22c55e' : ttfbMs <= 1800 ? '#eab308' : '#ef4444';

        console.log(
          `%c[Web Vitals] TTFB: ${ttfbMs}ms (${rating})`,
          `color: ${color}; font-weight: bold; font-family: monospace;`
        );
      }
    } catch {
      // Not supported
    }
  }
}

export function provideWebVitals() {
  return makeEnvironmentProviders([
    {
      provide: 'INIT_WEB_VITALS',
      useFactory: () => {
        const vitals = inject(WebVitalsService);
        vitals.init();
      }
    }
  ]);
}
