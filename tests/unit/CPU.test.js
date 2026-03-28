// tests/unit/CPU.test.js

import { CPU } from '../../src/core/CPU.js';
import { RAM } from '../../src/core/RAM.js';

describe('CPU', () => {
  let cpu;
  let ram;

  beforeEach(() => {
    cpu = new CPU();
    ram = new RAM(256);
  });

  describe('Constructor', () => {
    it('should initialize with zero values', () => {
      expect(cpu.registers.A).toBe(0);
      expect(cpu.registers.B).toBe(0);
      expect(cpu.PC).toBe(0);
    });

    it('should initialize flags', () => {
      expect(cpu.flags.Z).toBe(false);
      expect(cpu.flags.C).toBe(false);
    });
  });

  describe('Fetch Operation', () => {
    it('should fetch instruction from memory', () => {
      ram.memory[0] = 0x15;  // Instruction
      cpu.fetch(ram);

      expect(cpu.IR).toBe(0x15);
      expect(cpu.PC).toBe(1);
    });
  });

  describe('Decode Operation', () => {
    it('should decode instruction correctly', () => {
      const instruction = 0x25;  // opcode=2, operand=5
      const decoded = cpu.decode(instruction);

      expect(decoded.opcode).toBe(0x02);
      expect(decoded.operand).toBe(0x05);
    });
  });

  describe('Execute Operation', () => {
    it('should execute ADD operation', () => {
      cpu.registers.A = 5;
      cpu.registers.B = 3;
      cpu.execute(0x02, 0x00);  // ADD

      expect(cpu.registers.A).toBe(8);
    });

    it('should execute SUB operation', () => {
      cpu.registers.A = 5;
      cpu.registers.B = 3;
      cpu.execute(0x03, 0x00);  // SUB

      expect(cpu.registers.A).toBe(2);
    });
  });

  describe('Flags', () => {
    it('should set Zero flag when result is zero', () => {
      cpu.registers.A = 5;
      cpu.registers.B = 5;
      cpu.execute(0x03, 0x00);  // SUB

      expect(cpu.flags.Z).toBe(true);
    });
  });

  describe('Reset', () => {
    it('should reset all values', () => {
      cpu.registers.A = 100;
      cpu.PC = 50;
      cpu.flags.Z = true;
      
      cpu.reset();

      expect(cpu.registers.A).toBe(0);
      expect(cpu.PC).toBe(0);
      expect(cpu.flags.Z).toBe(false);
    });
  });

  describe('getState', () => {
    it('should return current state', () => {
      cpu.registers.A = 42;
      cpu.PC = 10;

      const state = cpu.getState();

      expect(state.registers.A).toBe(42);
      expect(state.pc).toBe(10);
    });
  });
});
