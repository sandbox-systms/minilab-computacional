// src/components/Computer.js

import { Processor } from './Processor.js';
import { Memory } from './Memory.js';
import { Logger } from '../utils/Logger.js';
import { SystemBus } from '../core/SystemBus.js';

export class Computer {
  constructor(config = {}) {
    this.processor = new Processor();
    this.memory = new Memory(config.memorySize || 65536);
    this.bus = new SystemBus(this.processor.cpu, this.memory.ram);
    this.logger = new Logger('Computer');
    this.halted = false;
  }

  initialize() {
    this.processor.initialize();
    this.memory.initialize();
    this.logger.info('Computer system initialized');
  }

  loadProgram(program) {
    try {
      this.memory.loadProgram(program);
      this.logger.info('Program loaded successfully');
    } catch (error) {
      this.logger.error('Failed to load program', error);
      throw error;
    }
  }

  executeCycle() {
    if (this.halted) {
      return false;
    }

    try {
      const pc = this.processor.cpu.PC;
      const instruction = this.memory.read(pc);
      const operand = this.memory.read(pc + 1);
      
      this.processor.execute(instruction, operand);
      return true;
    } catch (error) {
      this.logger.error('Execution error', error);
      this.halted = true;
      return false;
    }
  }

  getSystemState() {
    return {
      processor: this.processor.getState(),
      memory: this.memory.getState(),
      halted: this.halted
    };
  }

  reset() {
    this.processor.reset();
    this.memory.reset();
    this.halted = false;
    this.logger.info('Computer system reset');
  }

  halt() {
    this.halted = true;
    this.logger.info('Computer system halted');
  }
}

export default Computer;
