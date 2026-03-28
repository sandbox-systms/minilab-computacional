// tests/integration/SimulationEngine.test.js

import { SimulationEngine } from '../../src/engine/SimulationEngine.js';
import { CPU } from '../../src/core/CPU.js';
import { RAM } from '../../src/core/RAM.js';

describe('SimulationEngine Integration', () => {
  let engine;
  let cpu;
  let ram;

  beforeEach(() => {
    cpu = new CPU();
    ram = new RAM(256);
    engine = new SimulationEngine(cpu, ram);
  });

  describe('Basic Simulation', () => {
    it('should initialize with IDLE state', () => {
      expect(engine.state).toBe('IDLE');
    });

    it('should execute one step', () => {
      engine.step();
      expect(engine.clock.cycle).toBe(1);
    });

    it('should execute multiple steps', () => {
      engine.run(10);
      expect(engine.clock.cycle).toBeGreaterThan(0);
    });
  });

  describe('Clock', () => {
    it('should tick correctly', () => {
      engine.clock.tick();
      expect(engine.clock.cycle).toBe(1);
    });

    it('should calculate time correctly', () => {
      engine.clock.tick();
      expect(engine.clock.time).toBeGreaterThan(0);
    });
  });

  describe('State Management', () => {
    it('should pause simulation', () => {
      engine.state = 'RUNNING';
      engine.pause();
      expect(engine.state).toBe('PAUSED');
    });

    it('should resume simulation', () => {
      engine.state = 'PAUSED';
      engine.resume();
      expect(engine.state).toBe('RUNNING');
    });

    it('should stop simulation', () => {
      engine.stop();
      expect(engine.state).toBe('STOPPED');
    });

    it('should reset simulation', () => {
      engine.clock.cycle = 50;
      engine.reset();
      expect(engine.clock.cycle).toBe(0);
      expect(engine.state).toBe('IDLE');
    });
  });

  describe('getState', () => {
    it('should return simulation state', () => {
      const state = engine.getState();
      expect(state.state).toBe('IDLE');
      expect(state.cycle).toBe(0);
    });
  });
});
