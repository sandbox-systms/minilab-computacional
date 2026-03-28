// public/app.js - Aplicação Frontend

class MiniLabApp {
  constructor() {
    this.apiBase = '/api';
    this.canvas = document.getElementById('cpu-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isRunning = false;

    this.setupEventListeners();
    this.updateUI();
  }

  setupEventListeners() {
    document.getElementById('step-btn').addEventListener('click', () => this.step());
    document.getElementById('run-btn').addEventListener('click', () => this.run());
    document.getElementById('pause-btn').addEventListener('click', () => this.pause());
    document.getElementById('reset-btn').addEventListener('click', () => this.reset());
  }

  async step() {
    try {
      const response = await fetch(`${this.apiBase}/simulation/step`, {
        method: 'POST'
      });
      const data = await response.json();
      this.updateUI(data);
      this.render();
    } catch (error) {
      console.error('Erro ao executar step:', error);
    }
  }

  async run() {
    try {
      this.isRunning = true;
      const response = await fetch(`${this.apiBase}/simulation/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycles: 10 })
      });
      const data = await response.json();
      this.updateUI(data);
      this.render();
      this.isRunning = false;
    } catch (error) {
      console.error('Erro ao executar run:', error);
    }
  }

  async pause() {
    try {
      await fetch(`${this.apiBase}/simulation/pause`, {
        method: 'POST'
      });
      this.isRunning = false;
    } catch (error) {
      console.error('Erro ao pausar:', error);
    }
  }

  async reset() {
    try {
      const response = await fetch(`${this.apiBase}/simulation/state`);
      const data = await response.json();
      this.updateUI(data);
      this.render();
    } catch (error) {
      console.error('Erro ao resetar:', error);
    }
  }

  async getState() {
    try {
      const response = await fetch(`${this.apiBase}/simulation/state`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter estado:', error);
      return null;
    }
  }

  updateUI(data = {}) {
    if (data.state && data.state.cpu) {
      const cpu = data.state.cpu;
      document.getElementById('register-a').value = cpu.A || 0;
      document.getElementById('register-b').value = cpu.B || 0;
      document.getElementById('register-pc').value = cpu.pc || 0;

      document.getElementById('stat-cycles').textContent = data.state.cycle || 0;
    }
  }

  render() {
    // Limpar canvas
    this.ctx.fillStyle = '#f5f5f5';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Desenhar componentes
    this.drawCPU();
    this.drawMemory();
    this.drawBus();
  }

  drawCPU() {
    const x = 50, y = 50;
    this.ctx.fillStyle = '#667eea';
    this.ctx.fillRect(x, y, 150, 100);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText('CPU', x + 50, y + 55);
  }

  drawMemory() {
    const x = 300, y = 50;
    this.ctx.fillStyle = '#764ba2';
    this.ctx.fillRect(x, y, 150, 100);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Arial';
    this.ctx.fillText('RAM', x + 50, y + 55);
  }

  drawBus() {
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.moveTo(200, 100);
    this.ctx.lineTo(300, 100);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }
}

// Inicializar app quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new MiniLabApp();
});
