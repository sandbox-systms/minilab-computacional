// src/ui/Visualizer.js

import { Renderer } from './Renderer.js';

export class Visualizer {
  constructor(canvas) {
    this.renderer = new Renderer(canvas);
    this.layout = {
      registerWidth: 200,
      memoryHeight: 150,
      padding: 10
    };
  }

  render(simulationState) {
    this.renderer.clear();
    this.renderer.drawGrid(50);

    this.renderRegisters(simulationState.cpu);
    this.renderMemory(simulationState, 20, this.layout.memoryHeight);
    this.renderStatus(simulationState);
  }

  renderRegisters(cpuState) {
    let y = 20;
    this.renderer.drawText('=== CPU Registers ===', 10, y, '#00ff00');
    y += 20;

    const registers = cpuState.registers;
    for (const [name, value] of Object.entries(registers)) {
      this.renderer.drawRegister(name, value, 10, y);
      y += 20;
    }

    y += 10;
    this.renderer.drawText(`Flags: Z=${cpuState.flags.Z ? 1 : 0} C=${cpuState.flags.C ? 1 : 0}`, 10, y);
  }

  renderMemory(state, x, y) {
    this.renderer.drawText('=== Memory View ===', x, y, '#00ff00');
    y += 20;

    const memStart = 0x200;
    const memRange = 16;
    
    for (let i = 0; i < memRange; i++) {
      const addr = memStart + i;
      this.renderer.drawMemoryCell(addr, 0, x, y);
      y += 15;
    }
  }

  renderStatus(state) {
    const statusY = 10;
    const statusX = this.renderer.width - 250;

    this.renderer.drawText('=== Simulation Status ===', statusX, statusY, '#00ff00');
    this.renderer.drawText(`State: ${state.state}`, statusX, statusY + 20);
    this.renderer.drawText(`Cycle: ${state.cycle}`, statusX, statusY + 40);
    this.renderer.drawText(`Time: ${state.time.toFixed(2)}ms`, statusX, statusY + 60);
  }
}

export default Visualizer;
