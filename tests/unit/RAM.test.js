// tests/unit/RAM.test.js

import { RAM } from '../../src/core/RAM.js';

describe('RAM', () => {
  let ram;

  beforeEach(() => {
    ram = new RAM(256);
  });

  describe('Constructor', () => {
    it('should initialize with specified size', () => {
      expect(ram.size).toBe(256);
    });

    it('should initialize with all zeros', () => {
      expect(ram.memory[0]).toBe(0);
      expect(ram.memory[255]).toBe(0);
    });
  });

  describe('Read Operation', () => {
    it('should read value from memory', () => {
      ram.memory[10] = 42;
      const value = ram.read(10);
      expect(value).toBe(42);
    });

    it('should throw error on invalid address', () => {
      expect(() => ram.read(-1)).toThrow();
      expect(() => ram.read(256)).toThrow();
    });
  });

  describe('Write Operation', () => {
    it('should write value to memory', () => {
      ram.write(10, 100);
      expect(ram.memory[10]).toBe(100);
    });

    it('should protect kernel area', () => {
      expect(() => ram.write(0x50, 123)).toThrow('Protected Memory Area');
    });

    it('should mask to 8-bit', () => {
      ram.write(0x100, 256);
      expect(ram.memory[0x100]).toBe(0);
    });
  });

  describe('Dump Operation', () => {
    it('should return memory slice', () => {
      ram.write(0x100, 5);
      ram.write(0x101, 10);
      
      const slice = ram.dump(0x100, 0x102);
      expect(slice).toEqual([5, 10]);
    });
  });

  describe('Clear Operation', () => {
    it('should clear all memory', () => {
      ram.write(0x100, 50);
      ram.clear();
      expect(ram.memory[0x100]).toBe(0);
    });
  });

  describe('getState', () => {
    it('should return memory state', () => {
      ram.write(0x100, 42);
      const state = ram.getState();
      
      expect(state.size).toBe(256);
      expect(state.used).toBeGreaterThan(0);
    });
  });
});
