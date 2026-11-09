/**
 * ConfettiEngine - High-performance celebratory confetti & hearts particle engine
 * Zero dependencies, works offline, supports hearts, stars, ribbons, and pastel particles.
 */
class ConfettiEngine {
  constructor(canvasId = 'confetti-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.colors = [
      '#FFCAD4', '#FFE5D9', '#FFD166', '#06D6A0',
      '#118AB2', '#FF70A6', '#F4A261', '#E76F51',
      '#FFB703', '#B5E2FA', '#EDAFB8', '#D8E2DC'
    ];
    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  /**
   * Launch a celebratory burst of confetti & floating hearts from coordinates
   * @param {number} x - normalized (0 to 1) or pixels
   * @param {number} y - normalized (0 to 1) or pixels
   * @param {number} count - number of particles
   */
  burst(x = 0.5, y = 0.5, count = 120) {
    const originX = x <= 1 ? x * this.width : x;
    const originY = y <= 1 ? y * this.height : y;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      const shapeType = Math.random() > 0.65 ? 'heart' : (Math.random() > 0.4 ? 'ribbon' : 'circle');

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed * (Math.random() * 0.8 + 0.6),
        vy: (Math.sin(angle) * speed - Math.random() * 4) * (Math.random() * 0.8 + 0.6),
        gravity: 0.22,
        drag: 0.965,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 14,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        size: Math.random() * 9 + 6,
        shape: shapeType,
        opacity: 1,
        fadeSpeed: Math.random() * 0.008 + 0.004,
        wiggle: Math.random() * Math.PI * 2,
        wiggleSpeed: Math.random() * 0.1 + 0.05
      });
    }

    if (!this.animationId) {
      this.animationId = requestAnimationFrame(this.update);
    }
  }

  /**
   * Continuous celebration stream (e.g. at the finale or unwrap)
   */
  shower(durationMs = 2500) {
    const interval = 80;
    let elapsed = 0;
    const timer = setInterval(() => {
      this.burst(Math.random() * 0.8 + 0.1, Math.random() * 0.3 + 0.1, 20);
      elapsed += interval;
      if (elapsed >= durationMs) {
        clearInterval(timer);
      }
    }, interval);
  }

  drawHeart(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-7, -7, -15, 2, 0, 15);
    ctx.bezierCurveTo(15, 2, 7, -7, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.wiggle += p.wiggleSpeed;
      p.x += Math.sin(p.wiggle) * 0.8;
      p.opacity -= p.fadeSpeed;

      if (p.opacity <= 0 || p.y > this.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'heart') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.drawHeart(this.ctx, 0, 0, p.size);
      } else if (p.shape === 'ribbon') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size * 1.5, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.update);
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
}

// Global instance
window.confetti = new ConfettiEngine('confetti-canvas');
