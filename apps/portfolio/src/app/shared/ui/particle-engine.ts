export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIndex: number;
  depth: number;
}

const PARTICLE_COLORS = [
  'rgba(228, 0, 58, 0.75)',
  'rgba(244, 63, 94, 0.65)',
  'rgba(255, 255, 255, 0.45)',
  'rgba(161, 161, 170, 0.4)'
];

export class ParticleEngine {
  private particles: Particle[] = [];
  private colorBuckets: number[][] = [[], [], [], []];
  private width = 0;
  private height = 0;
  private dpr = 1;
  private animationFrameId = 0;
  private destroyed = false;
  private paused = false;

  private mouseX = -9999;
  private mouseY = -9999;
  private targetMouseNormX = 0;
  private targetMouseNormY = 0;
  private currentMouseNormX = 0;
  private currentMouseNormY = 0;

  private targetScrollY = 0;
  private currentScrollY = 0;

  private rx = new Float32Array(80);
  private ry = new Float32Array(80);

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly ctx: CanvasRenderingContext2D
  ) {}

  public init(): void {
    this.targetScrollY = typeof window !== 'undefined' ? window.scrollY || 0 : 0;
    this.currentScrollY = this.targetScrollY;
    this.resize();
    this.initParticles();
    this.animate();
  }

  public destroy(): void {
    this.destroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  public pause(): void {
    if (this.paused) return;
    this.paused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
    }
  }

  public resume(): void {
    if (!this.paused || this.destroyed) return;
    this.paused = false;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  public setMousePosition(clientX: number, clientY: number): void {
    this.mouseX = clientX;
    this.mouseY = clientY;

    if (this.width > 0 && this.height > 0) {
      this.targetMouseNormX = (clientX - this.width / 2) / (this.width / 2);
      this.targetMouseNormY = (clientY - this.height / 2) / (this.height / 2);
    }
  }

  public setScrollY(scrollY: number): void {
    this.targetScrollY = scrollY;
  }

  public resize(): void {
    if (typeof window === 'undefined') return;

    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const targetWidth = Math.floor(this.width * this.dpr);
    const targetHeight = Math.floor(this.height * this.dpr);

    if (this.canvas.width !== targetWidth) {
      this.canvas.width = targetWidth;
    }
    if (this.canvas.height !== targetHeight) {
      this.canvas.height = targetHeight;
    }

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  public resetParticles(): void {
    this.resize();
    this.initParticles();
  }

  private initParticles(): void {
    const count = Math.min(Math.floor((this.width * this.height) / 28000), 50);
    this.particles = [];
    this.colorBuckets = [[], [], [], []];

    for (let i = 0; i < count; i++) {
      const depth = Math.random() * 0.75 + 0.25;
      const colorIndex = Math.floor(Math.random() * PARTICLE_COLORS.length);
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.75 * depth,
        vy: (Math.random() - 0.5) * 0.75 * depth,
        radius: (Math.random() * 0.7 + 0.9) * (0.6 + depth * 0.5),
        colorIndex,
        depth
      });
      this.colorBuckets[colorIndex].push(i);
    }

    if (this.rx.length < count) {
      this.rx = new Float32Array(count);
      this.ry = new Float32Array(count);
    }
  }

  private animate = (): void => {
    if (this.destroyed || this.paused) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.currentScrollY += (this.targetScrollY - this.currentScrollY) * 0.08;
    this.currentMouseNormX += (this.targetMouseNormX - this.currentMouseNormX) * 0.05;
    this.currentMouseNormY += (this.targetMouseNormY - this.currentMouseNormY) * 0.05;

    const connectionDist = 130;
    const connectionDistSq = connectionDist * connectionDist;
    const mouseRadius = 140;
    const mouseRadiusSq = mouseRadius * mouseRadius;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x += this.width;
      else if (p.x > this.width) p.x -= this.width;
      if (p.y < 0) p.y += this.height;
      else if (p.y > this.height) p.y -= this.height;

      const mouseShiftX = this.currentMouseNormX * 40 * p.depth;
      const mouseShiftY = this.currentMouseNormY * 40 * p.depth;
      const scrollShiftY = this.currentScrollY * 0.3 * p.depth;

      let rx = (p.x + mouseShiftX) % this.width;
      if (rx < 0) rx += this.width;

      let ry = (p.y + mouseShiftY - scrollShiftY) % this.height;
      if (ry < 0) ry += this.height;

      this.rx[i] = rx;
      this.ry[i] = ry;
    }

    this.ctx.beginPath();
    let hasLines = false;
    for (let i = 0; i < len; i++) {
      const px = this.rx[i];
      const py = this.ry[i];
      const p1 = this.particles[i];

      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        if (Math.abs(p1.depth - p2.depth) > 0.45) continue;

        const dx = px - this.rx[j];
        const dy = py - this.ry[j];
        const distSq = dx * dx + dy * dy;

        if (distSq < connectionDistSq) {
          this.ctx.moveTo(px, py);
          this.ctx.lineTo(this.rx[j], this.ry[j]);
          hasLines = true;
        }
      }
    }
    if (hasLines) {
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.lineWidth = 0.6;
      this.ctx.stroke();
    }

    if (this.mouseX > -1000 && this.mouseY > -1000) {
      this.ctx.beginPath();
      let hasMouseLines = false;
      for (let i = 0; i < len; i++) {
        const px = this.rx[i];
        const py = this.ry[i];
        const mdx = this.mouseX - px;
        const mdy = this.mouseY - py;
        const mdistSq = mdx * mdx + mdy * mdy;

        if (mdistSq < mouseRadiusSq && mdistSq > 0) {
          this.ctx.moveTo(px, py);
          this.ctx.lineTo(this.mouseX, this.mouseY);
          hasMouseLines = true;
        }
      }
      if (hasMouseLines) {
        this.ctx.strokeStyle = 'rgba(228, 0, 58, 0.28)';
        this.ctx.lineWidth = 0.75;
        this.ctx.stroke();
      }
    }

    for (let c = 0; c < PARTICLE_COLORS.length; c++) {
      const indices = this.colorBuckets[c];
      if (!indices || indices.length === 0) continue;

      this.ctx.beginPath();
      for (let k = 0; k < indices.length; k++) {
        const idx = indices[k];
        const px = this.rx[idx];
        const py = this.ry[idx];
        const radius = this.particles[idx].radius;

        this.ctx.moveTo(px + radius, py);
        this.ctx.arc(px, py, radius, 0, Math.PI * 2);
      }
      this.ctx.fillStyle = PARTICLE_COLORS[c];
      this.ctx.fill();
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
