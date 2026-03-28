// src/index.js - Entry point da aplicação

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { CPU } from './core/CPU.js';
import { RAM } from './core/RAM.js';
import { SimulationEngine } from './engine/SimulationEngine.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Criar instâncias
const cpu = new CPU();
const ram = new RAM(1024);
const engine = new SimulationEngine(cpu, ram);

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/simulation/state', (req, res) => {
  res.json({
    cpu: cpu.getState(),
    ram: ram.getState(),
    engine: engine.getState()
  });
});

app.post('/api/simulation/step', (req, res) => {
  engine.step();
  res.json({
    success: true,
    state: {
      cpu: cpu.getState(),
      cycle: engine.clock.cycle
    }
  });
});

app.post('/api/simulation/run', (req, res) => {
  const { cycles = 100 } = req.body;
  engine.run(cycles);
  res.json({
    success: true,
    totalCycles: engine.clock.cycle
  });
});

app.post('/api/simulation/pause', (req, res) => {
  engine.pause();
  res.json({ success: true, status: 'paused' });
});

app.post('/api/simulation/resume', (req, res) => {
  engine.resume();
  res.json({ success: true, status: 'running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: err.message,
    status: 'error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MiniLab Computacional running on http://localhost:${PORT}`);
  console.log(`📚 Docs available at http://localhost:${PORT}/docs`);
});

export { app, cpu, ram, engine };
