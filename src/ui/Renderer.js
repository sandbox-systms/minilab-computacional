// src/ui/Renderer.js

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.colors = {
      background: '#1a1a1a',
      grid: '#333333',
      text: '#00ff00',
      register: '#0066ff',
      memory: '#ff6600',
      highlight: '#ffff00'
    };
  }

  clear() {
    this.ctx.fillStyle = this.colors.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawGrid(cellSize = 40) {
    this.ctx.strokeStyle = this.colors.grid;
    this.ctx.lineWidth = 0.5;

    for (let x = 0; x < this.width; x += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += cellSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  drawText(text, x, y, color = this.colors.text) {
    this.ctx.fillStyle = color;
    this.ctx.font = 'monospace 12px';
    this.ctx.fillText(text, x, y);
  }

  drawRegister(name, value, x, y) {
    const registerText = `${name}: 0x${value.toString(16).padStart(4, '0')}`;
    this.drawText(registerText, x, y, this.colors.register);
  }

  drawMemoryCell(address, value, x, y) {
    const cellText = `[${address}]: ${value}`;
    this.drawText(cellText, x, y, this.colors.memory);
  }

  drawRectangle(x, y, w, h, color = this.colors.highlight) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, w, h);
  }

  drawCircle(x, y, radius, color = this.colors.highlight) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
}

export default Renderer;
