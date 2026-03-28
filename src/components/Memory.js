// src/components/Memory.js

import { RAM } from '../core/RAM.js';
import { Logger } from '../utils/Logger.js';

export class Memory {
  constructor(size = 65536) {
    this.ram = new RAM(size);
    this.logger = new Logger('Memory');
    this.accessCount = { read: 0, write: 0 };
  }

  initialize() {
    this.ram.clear();
    this.accessCount = { read: 0, write: 0 };
    this.logger.info(`Memory initialized: ${this.ram.size} bytes`);
  }

  read(address) {
    try {
      const value = this.ram.read(address);
      this.accessCount.read++;
      return value;
    } catch (error) {
      this.logger.error(`Memory read failed at address ${address}`, error);
      throw error;
    }
  }

  write(address, value) {
    try {
      this.ram.write(address, value);
      this.accessCount.write++;
    } catch (error) {
      this.logger.error(`Memory write failed at address ${address}`, error);
      throw error;
    }
  }

  loadProgram(program, startAddress = 0x200) {
    try {
      for (let i = 0; i < program.length; i++) {
        this.write(startAddress + i, program[i]);
      }
      this.logger.info(`Program loaded: ${program.length} bytes at 0x${startAddress.toString(16)}`);
    } catch (error) {
      this.logger.error('Program loading failed', error);
      throw error;
    }
  }

  getState() {
    return {
      size: this.ram.size,
      accessCount: this.accessCount,
      memory: this.ram.getState()
    };
  }

  reset() {
    this.ram.clear();
    this.accessCount = { read: 0, write: 0 };
  }
}

export default Memory;
