# Simulation Model - MiniLab Computacional

## ⏰ Motor de Simulação Baseado em Eventos

O motor de simulação segue o paradigma **Discrete Event Simulation (DES)**, onde todos os eventos acontecem em momentos discretos no tempo.

---

## 📋 Conceitos Fundamentais

### Event (Evento)

Um evento representa uma mudança de estado em um momento específico:

```javascript
class Event {
  constructor(type, timestamp, component, data = {}) {
    this.type = type;              // 'fetch', 'decode', 'execute', etc
    this.timestamp = timestamp;    // Tempo de ocorrência
    this.component = component;    // Qual componente gerou
    this.data = data;              // Dados associados
    this.priority = 0;             // Para desempate
  }
  
  isReady(currentTime) {
    return this.timestamp <= currentTime;
  }
}
```

### Clock (Relógio)

O relógio controla o tempo da simulação:

```javascript
class Clock {
  constructor(frequency = 1000) {
    this.frequency = frequency;    // Hz
    this.cycleTime = 1 / frequency; // Tempo por ciclo
    this.cycle = 0;                // Ciclo atual
    this.time = 0;                 // Tempo em segundos
  }
  
  tick() {
    this.cycle++;
    this.time = this.cycle * this.cycleTime;
  }
  
  getCurrentTime() {
    return this.time;
  }
}
```

---

## 🎯 Event Queue (Fila de Eventos)

Gerencia a sequência de eventos futuros:

```javascript
class EventQueue {
  constructor() {
    this.queue = [];    // Min-heap por timestamp
    this.processed = []; // Histórico
  }
  
  // Adicionar evento à fila
  enqueue(event) {
    this.queue.push(event);
    this.queue.sort((a, b) => 
      a.timestamp - b.timestamp || a.priority - b.priority
    );
  }
  
  // Remover próximo evento
  dequeue() {
    const event = this.queue.shift();
    this.processed.push(event);
    return event;
  }
  
  // Obter próximo sem remover
  peek() {
    return this.queue[0];
  }
  
  // Remover eventos até um tempo específico
  processUntil(time) {
    const events = [];
    while (this.queue.length > 0 && this.peek().timestamp <= time) {
      events.push(this.dequeue());
    }
    return events;
  }
  
  // Limpar fila
  clear() {
    this.queue = [];
  }
  
  // Tamanho da fila
  size() {
    return this.queue.length;
  }
}
```

---

## 🔄 Ciclo de Simulação

```
┌─────────────────────────────────┐
│  Inicialização da Simulação     │
│  • Criar components             │
│  • Inicializar estado           │
│  • Criar evento BOOT            │
└──────────────┬──────────────────┘
               │
       ┌───────▼────────┐
       │  Clock Tick    │
       └───────┬────────┘
               │
       ┌───────▼─────────────────┐
       │ Processar Fila de       │
       │ Eventos (Timestamp Atual)
       └───────┬─────────────────┘
               │
       ┌───────▼─────────────┐
       │ Handler Executa     │
       │ Événement           │
       └───────┬─────────────┘
               │
       ┌───────▼──────────────────┐
       │ Atualizar Estado        │
       │ Gerar Novos Eventos     │
       │ Adicionar à Fila        │
       └───────┬──────────────────┘
               │
       ┌───────▼────────────┐
       │ Pode Renderizar?   │
       │ SIM: Atualizar UI  │
       └───────┬────────────┘
               │
       ┌───────▼────────────┐
       │ Parou?             │
       │ NÃO: Voltar ao Tick│
       └────────────────────┘
```

---

## 🏃 Simulação com Ciclos

Cada ciclo de clock executa:

```javascript
class SimulationEngine {
  constructor(cpu, ram, clock) {
    this.cpu = cpu;
    this.ram = ram;
    this.clock = clock;
    this.eventQueue = new EventQueue();
    this.state = 'IDLE';  // IDLE, RUNNING, PAUSED, STOPPED
  }
  
  // Executar um passo (1 ciclo de clock)
  step() {
    if (this.state !== 'RUNNING') return;
    
    // 1. Tick do clock
    this.clock.tick();
    const currentTime = this.clock.getCurrentTime();
    
    // 2. Processar eventos para este timestamp
    const events = this.eventQueue.processUntil(currentTime);
    
    for (const event of events) {
      this.handleEvent(event);
    }
    
    // 3. Renderizar se necessário
    this.notifyObservers();
  }
  
  // Executar N ciclos
  run(cycles = Infinity) {
    this.state = 'RUNNING';
    let count = 0;
    
    while (count < cycles && this.state === 'RUNNING') {
      this.step();
      count++;
    }
  }
  
  // Pausar simulação
  pause() {
    this.state = 'PAUSED';
  }
  
  // Retomar simulação
  resume() {
    if (this.state === 'PAUSED') {
      this.state = 'RUNNING';
    }
  }
  
  // Parar simulação completamente
  stop() {
    this.state = 'STOPPED';
    this.eventQueue.clear();
  }
  
  // Lidar com evento
  handleEvent(event) {
    console.log(`Time: ${event.timestamp} - Event: ${event.type}`);
    
    switch(event.type) {
      case 'FETCH':
        this.cpu.fetch(this.ram);
        this.scheduleEvent('DECODE', this.clock.getCurrentTime() + 1);
        break;
      
      case 'DECODE':
        const instruction = this.cpu.decode(this.cpu.IR);
        this.scheduleEvent('EXECUTE', this.clock.getCurrentTime() + 1, instruction);
        break;
      
      case 'EXECUTE':
        this.cpu.execute(event.data.opcode, event.data.operand);
        this.scheduleEvent('FETCH', this.clock.getCurrentTime() + 1);
        break;
    }
  }
  
  // Agendar novo evento
  scheduleEvent(type, timestamp, data = {}) {
    const event = new Event(type, timestamp, this.cpu, data);
    this.eventQueue.enqueue(event);
  }
}
```

---

## 🔗 Fluxo Detalhado de uma Instrução

```
T=0 FETCH
├─ PC → MAR (0)
├─ RAM[0] → MDR
├─ MDR → IR (LOAD)
├─ PC++
└─ Schedule DECODE @ T=1

T=1 DECODE
├─ IR → Control Unit
├─ Opcode: LOAD
├─ Operand: 0x05
├─ Schedule EXECUTE @ T=2
└─ Preparar sinais de controle

T=2 EXECUTE
├─ ALU preparado
├─ RAM[0x05] → Registrador A
├─ Flags atualizadas
└─ Schedule FETCH @ T=3

T=3 FETCH (Próxima instrução)
└─ (Repeats...)
```

---

## 📊 Rastreamento de Estado

```javascript
class StateTracker {
  constructor() {
    this.snapshots = [];
  }
  
  // Capturar estado em cada ciclo
  captureSnapshot(cpu, ram, clock) {
    const snapshot = {
      time: clock.getCurrentTime(),
      cycle: clock.cycle,
      registers: { ...cpu.registers },
      flags: { ...cpu.flags },
      pc: cpu.PC,
      sp: cpu.SP,
      ir: cpu.IR,
      ram: [...ram.memory]
    };
    this.snapshots.push(snapshot);
    return snapshot;
  }
  
  // Voltar a estado anterior
  rollback(steps = 1) {
    const index = Math.max(0, this.snapshots.length - steps - 1);
    return this.snapshots[index];
  }
  
  // Histórico completo
  getHistory() {
    return this.snapshots;
  }
}
```

---

## ⚙️ Sincronização Multi-Componente

Para simular múltiplos componentes sincronizados:

```javascript
class MultiComponentEngine extends SimulationEngine {
  constructor() {
    super();
    this.components = new Map();
    this.barriers = new Map();
  }
  
  registerComponent(name, component) {
    this.components.set(name, component);
  }
  
  // Barreira de sincronização
  createBarrier(name, participants) {
    this.barriers.set(name, {
      name,
      participants: new Set(participants),
      arrived: new Set(),
      timestamp: 0
    });
  }
  
  // Componente aguarda até que todos cheguem
  waitAtBarrier(componentName, barrierName) {
    const barrier = this.barriers.get(barrierName);
    barrier.arrived.add(componentName);
    
    if (barrier.arrived.size === barrier.participants.size) {
      barrier.arrived.clear();
      barrier.timestamp++;
    }
  }
}
```

---

## 📈 Métricas de Simulação

```javascript
class SimulationMetrics {
  constructor() {
    this.totalCycles = 0;
    this.totalInstructions = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.memoryAccess = [];
    this.registerActivity = {};
  }
  
  recordInstruction() {
    this.totalInstructions++;
  }
  
  recordMemoryAccess(address, type) {
    this.memoryAccess.push({
      address,
      type, // READ/WRITE
      cycle: this.totalCycles
    });
  }
  
  getStatistics() {
    return {
      totalCycles: this.totalCycles,
      totalInstructions: this.totalInstructions,
      avgCycles: this.totalCycles / this.totalInstructions,
      cacheHitRate: this.cacheHits / (this.cacheHits + this.cacheMisses),
      memoryAccesses: this.memoryAccess.length
    };
  }
}
```

---

## 🎮 Modos de Simulação

### Modo Contínuo
```javascript
engine.run();  // Executa indefinidamente
```

### Modo Passo a Passo
```javascript
engine.step();  // Um ciclo por chamada
```

### Modo com Breakpoint
```javascript
engine.setBreakpoint('PC == 0x10');
engine.run();   // Para quando PC == 0x10
```

### Modo Trace
```javascript
engine.enableTrace();
engine.step();
console.log(engine.getTraceLog());
```

---

## 🧪 Exemplo Completo de Simulação

```javascript
// 1. Criar componentes
const cpu = new CPU();
const ram = new RAM(256);
const clock = new Clock(1000);  // 1 GHz

// 2. Criar engine
const engine = new SimulationEngine(cpu, ram, clock);

// 3. Carregar programa em RAM
const program = [0x15, 0x20, 0x30];  // Load, Add, Store
ram.memory[0] = program[0];
ram.memory[1] = program[1];
ram.memory[2] = program[2];

// 4. Agendar primeiro evento
engine.scheduleEvent('FETCH', 0);

// 5. Executar
engine.run(100);  // 100 ciclos

// 6. Analisar resultados
console.log('Program Counter:', cpu.PC);
console.log('Registro A:', cpu.registers.A);
```

---

**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
