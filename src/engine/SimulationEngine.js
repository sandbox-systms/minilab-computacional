// src/engine/SimulationEngine.js - Motor de Simulação

export class Clock {
  constructor(frequency = 1000) {
    this.frequency = frequency;
    this.cycleTime = 1 / frequency;
    this.cycle = 0;
    this.time = 0;
  }

  tick() {
    this.cycle++;
    this.time = this.cycle * this.cycleTime;
  }

  getCurrentTime() {
    return this.time;
  }
}

export class EventQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(event) {
    this.queue.push(event);
    this.queue.sort((a, b) => a.timestamp - b.timestamp);
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  clear() {
    this.queue = [];
  }
}

export class SimulationEngine {
  constructor(cpu, ram) {
    this.cpu = cpu;
    this.ram = ram;
    this.clock = new Clock(1000);
    this.eventQueue = new EventQueue();
    this.state = 'IDLE';  // IDLE, RUNNING, PAUSED, STOPPED
  }

  /**
   * Executar um passo (ciclo)
   */
  step() {
    if (this.state !== 'RUNNING' && this.state !== 'IDLE') return;

    this.state = 'RUNNING';
    this.clock.tick();

    // Simulação simples: Fetch-Decode-Execute
    try {
      this.cpu.fetch(this.ram);
      const instruction = this.cpu.decode(this.cpu.IR);
      this.cpu.execute(instruction.opcode, instruction.operand);
    } catch (error) {
      console.error('Simulation error:', error);
      this.state = 'STOPPED';
    }
  }

  /**
   * Executar N ciclos
   */
  run(cycles = Infinity) {
    this.state = 'RUNNING';
    let count = 0;

    while (count < cycles && this.state === 'RUNNING') {
      this.step();
      count++;
    }
  }

  /**
   * Pausar simulação
   */
  pause() {
    if (this.state === 'RUNNING') {
      this.state = 'PAUSED';
    }
  }

  /**
   * Retomar simulação
   */
  resume() {
    if (this.state === 'PAUSED') {
      this.state = 'RUNNING';
    }
  }

  /**
   * Parar simulação
   */
  stop() {
    this.state = 'STOPPED';
    this.eventQueue.clear();
  }

  /**
   * Resetar simulação
   */
  reset() {
    this.cpu.reset();
    this.ram.clear();
    this.clock.cycle = 0;
    this.clock.time = 0;
    this.eventQueue.clear();
    this.state = 'IDLE';
  }

  /**
   * Obter estado
   */
  getState() {
    return {
      state: this.state,
      cycle: this.clock.cycle,
      time: this.clock.time,
      frequency: this.clock.frequency
    };
  }
}
