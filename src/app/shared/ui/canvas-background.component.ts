import {
  Component,
  ElementRef,
  NgZone,
  viewChild,
  inject,
  afterNextRender,
  PLATFORM_ID,
  DestroyRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ParticleEngine } from './particle-engine';

@Component({
  selector: 'app-canvas-background',
  template: '<canvas #canvas></canvas>',
  styles: `
    :host {
      display: block;
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: -1;

      canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  `
})
export class CanvasBackgroundComponent {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  private engine: ParticleEngine | null = null;
  private readonly abort = new AbortController();

  constructor() {
    if (!this.isBrowser) return;

    this.destroyRef.onDestroy(() => {
      this.abort.abort();
      this.engine?.destroy();
    });

    afterNextRender(() => {
      const canvas = this.canvasRef().nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const startEngine = () => {
        if (this.abort.signal.aborted) return;
        this.engine = new ParticleEngine(canvas, ctx);

        this.ngZone.runOutsideAngular(() => {
          this.engine?.init();

          const opts: AddEventListenerOptions = { passive: true, signal: this.abort.signal };
          window.addEventListener('resize', this.onResize, opts);
          window.addEventListener('mousemove', this.onMouseMove, opts);
          window.addEventListener('scroll', this.onScroll, opts);

          document.addEventListener(
            'visibilitychange',
            () => {
              if (document.hidden) {
                this.engine?.pause();
              } else {
                this.engine?.resume();
              }
            },
            opts
          );
        });
      };

      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(startEngine);
      } else {
        setTimeout(startEngine, 60);
      }
    });
  }

  private onMouseMove = (event: MouseEvent): void => {
    this.engine?.setMousePosition(event.clientX, event.clientY);
  };

  private onScroll = (): void => {
    this.engine?.setScrollY(window.scrollY || 0);
  };

  private onResize = (): void => {
    this.engine?.resetParticles();
  };
}
