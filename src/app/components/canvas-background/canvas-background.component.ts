import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  viewChild,
  inject
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

@Component({
  selector: 'app-canvas-background',
  templateUrl: './canvas-background.component.html',
  styleUrl: './canvas-background.component.scss'
})
export class CanvasBackgroundComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly ngZone = inject(NgZone);

  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameId = 0;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private mouseX = -9999;
  private mouseY = -9999;

  public ngAfterViewInit(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);

    this.ngZone.runOutsideAngular(() => {
      this.initParticles();
      this.animate();
    });
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private onMouseMove = (event: MouseEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private onResize = (): void => {
    this.resizeCanvas();
    this.initParticles();
  };

  private resizeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = Math.floor(this.width * this.dpr);
    canvas.height = Math.floor(this.height * this.dpr);
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;

    if (this.ctx) {
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }
  }

  private initParticles(): void {
    const count = Math.min(Math.floor((this.width * this.height) / 18000), 70);
    this.particles = [];

    const colors = [
      'rgba(221, 0, 49, 0.6)',
      'rgba(255, 26, 75, 0.45)',
      'rgba(123, 0, 212, 0.6)',
      'rgba(160, 64, 245, 0.45)',
      'rgba(180, 0, 130, 0.5)'
    ];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 0.9 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  private animate = (): void => {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const connectionDist = 135;
    const mouseRadius = 150;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse gentle interaction
      const mdx = this.mouseX - p.x;
      const mdy = this.mouseY - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouseRadius && mdist > 0) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = `rgba(160, 64, 245, ${0.4 * (1 - mdist / mouseRadius)})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDist) {
          const alpha = 0.22 * (1 - dist / connectionDist);
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          // Alternate between red and purple connections
          const useRed = (i + j) % 2 === 0;
          const r = useRed ? 221 : 123;
          const g = 0;
          const b = useRed ? 49 : 212;
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
