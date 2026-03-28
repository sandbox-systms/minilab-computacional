// src/components/Processor.js

import { CPU } from '../core/CPU.js';
import { Logger } from '../utils/Logger.js';

export class Processor {
  constructor() {
    this.cpu = new CPU();
    this.logger = new Logger('Processor');
    this.executedInstructions = 0;
  }

  initialize() {
    this.cpu.reset();
    this.executedInstructions = 0;
    this.logger.info('Processor initialized');
  }

  execute(instruction, operand = 0) {
    try {
      this.cpu.execute(instruction, operand);
      this.executedInstructions++;
      this.logger.debug(`Executed instruction: 0x${instruction.toString(16)}`);
    } catch (error) {
      this.logger.error('Instruction execution failed', error);
      throw error;
    }
  }

  getState() {
    return {
      cpu: this.cpu.getState(),
      executedInstructions: this.executedInstructions
    };
  }

  reset() {
    this.cpu.reset();
    this.executedInstructions = 0;
  }
}

export default Processor;
