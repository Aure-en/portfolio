function Particle(canvas, context, color) {
  // Particle settings (initial position, velocity)
  this.canvas = canvas;
  this.context = context;
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.vx = Math.random() - 0.5;
  this.vy = Math.random() - 0.5;
  this.size = Math.random();
  this.color = color;
}

Particle.prototype.draw = function () {
  this.x += this.vx;
  this.y += this.vy;

  /* Makes sure the particle stays in the canvas.
    If the particle hits a "wall", change its direction by changing the velocity. */

  if (
    this.x <= 0 ||
    this.x >= this.canvas.width ||
    this.y <= 0 ||
    this.y >= this.canvas.height
  ) {
    this.vx = -this.vx * Math.random();
    this.vy = -this.vy * Math.random();
  }

  // Draw on canvas
  this.context.beginPath();
  this.context.fillStyle = this.color;
  this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
  this.context.closePath();
  this.context.fill();
};

export default Particle;
