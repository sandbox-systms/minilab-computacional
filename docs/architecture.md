# Arquitetura - MiniLab Computacional

## 🏗️ Visão Geral da Arquitetura

MiniLab adota uma arquitetura **modular e orientada a eventos**, separando a simulação da visualização para máxima flexibilidade educacional.

```
┌─────────────────────────────────────┐
│       User Interface (UI)           │
│  (Canvas, Interação, Feedback)      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Visualizer & Renderer         │
│  (Conversão de dados para visual)   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Simulation Engine (Motor)        │
│  (Eventos, Clock, Orquestração)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Core Components                │
│  (CPU, RAM, Barramentos, Flags)     │
└─────────────────────────────────────┘
```

---

## 🧩 Camadas Arquiteturais

### 1. **Core Layer** (`src/core/`)

Modelos abstratos dos componentes de hardware reais.

#### Componentes Principais

```javascript
// CPU - Processador Central
class CPU {
  constructor() {
    this.registers = {};      // Registradores
    this.pc = 0;              // Program Counter
    this.flags = {};          // Flags (Zero, Carry, etc)
  }
  
  fetch(memory) { }           // Ciclo: Fetch
  decode(instruction) { }     // Ciclo: Decode
  execute(instruction) { }    // Ciclo: Execute
}

// RAM - Memória Principal
class RAM {
  constructor(size = 1024) {
    this.memory = new Array(size).fill(0);
  }
  
  read(address) { }
  write(address, value) { }
  getState() { }
}

// Registers - Registradores
class Registers {
  constructor() {
    this.A = 0;               // Acumulador
    this.B = 0;               // Registrador B
    this.C = 0;               // Registrador C
  }
}

// Bus - Barramento de Dados
class Bus {
  constructor() {
    this.dataLine = null;     // Linha de dados
    this.addressLine = null;  // Linha de endereço
  }
}
```

---

### 2. **Engine Layer** (`src/engine/`)

Motor de simulação baseado em **eventos discretos** e **ciclo de clock**.

#### Componentes Principais

```javascript
// SimulationEngine - Orquestrador
class SimulationEngine {
  constructor() {
    this.eventQueue = new EventQueue();
    this.clock = new Clock();
    this.components = {};
  }
  
  step() { }                  // Um ciclo de clock
  run(cycles) { }             // Executar N ciclos
  pause() { }
  resume() { }
}

// EventQueue - Fila de Eventos
class EventQueue {
  constructor() {
    this.queue = [];
    this.timestamp = 0;
  }
  
  enqueue(event) { }
  dequeue() { }
  processUntil(time) { }
}

// Clock - Metrônomo da Simulação
class Clock {
  constructor(frequency = 1000) {
    this.frequency = frequency;  // Hz
    this.cycle = 0;
  }
  
  tick() { }
  getCycle() { }
  getFrequency() { }
}
```

---

### 3. **Components Layer** (`src/components/`)

Abstrações de alto nível dos dispositivos físicos.

```javascript
// Processor - Processador de Alto Nível
class Processor extends CPU {
  executeInstruction(instruction) {
    // Pipeline de execução
    this.fetch(instruction);
    this.decode(instruction);
    this.execute(instruction);
  }
}

// Memory - Gerenciador de Memória
class Memory extends RAM {
  allocate(size) { }
  deallocate(address) { }
  getUsage() { }
}

// IODevice - Dispositivo de I/O
class IODevice {
  read() { }
  write(data) { }
  interrupt() { }
}
```

---

### 4. **UI Layer** (`src/ui/`)

Responsável pela visualização e renderização dos componentes.

```javascript
// Renderer - Renderizador Geral
class Renderer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
  }
  
  render(state) { }           // Renderiza estado completo
  clear() { }
  drawComponent(component) { }
}

// Visualizer - Animações e Efeitos
class Visualizer {
  animateDataFlow(from, to) { }
  highlightCycle(stage) { }   // Fetch/Decode/Execute
  showRegisterChange(reg, oldVal, newVal) { }
}
```

---

### 5. **Data Layer** (`src/data/`)

Conteúdo pedagógico, instruções e currículos.

```javascript
// Instructions - Conjunto de instruções
const INSTRUCTIONS = {
  LOAD: { opcode: 0x01, bytes: 2, cycles: 1 },
  STORE: { opcode: 0x02, bytes: 2, cycles: 1 },
  ADD: { opcode: 0x03, bytes: 2, cycles: 2 },
  // ...
};

// Tutorials - Tutoriais interativos
const TUTORIALS = {
  BEGINNER: { steps: [...] },
  INTERMEDIATE: { steps: [...] },
  ADVANCED: { steps: [...] }
};
```

---

### 6. **Utils Layer** (`src/utils/`)

Funções auxiliares e utilitários.

```javascript
// logger.js - Logging estruturado
logger.info('Simulação iniciada');
logger.debug('Instrução fetched');
logger.error('Erro de memória');

// validator.js - Validação
validateInstruction(instruction);
validateMemoryAccess(address);

// helpers.js - Funções auxiliares
formatBinary(value);
sanitizeUserInput(input);
```

---

## 🔄 Fluxo de Dados

```
1. User Input (UI)
   ↓
2. Event Created & Enqueued (Engine)
   ↓
3. Event Processed (Engine)
   ↓
4. Component State Updated (Core/Components)
   ↓
5. State Change Logged (Utils)
   ↓
6. Visualizer Updated (UI)
   ↓
7. Canvas Rendered (UI)
   ↓
8. Display Updated (Browser)
```

---

## 🔗 Padrões de Design

### 1. **Event-Driven Architecture**
- Desacoplamento entre componentes
- Comunicação via eventos
- Escalabilidade

### 2. **Model-View Separation**
- Core = Model (lógica)
- UI = View (apresentação)
- Engine = Controller (orquestração)

### 3. **Singleton Pattern**
- SimulationEngine (única instância)
- Clock (compartilhado)

### 4. **Observer Pattern**
- Componentes observam mudanças de estado
- UI observa engine

### 5. **Factory Pattern**
- Criação de instruções
- Criação de eventos

---

## 🚀 Ciclo de Execução Detalhado

```
┌─────────────────────────────────────────┐
│      CICLO DE EXECUÇÃO (Fetch-Decode)   │
└─────────────────────────────────────────┘

1. FETCH (Buscar Instrução)
   └─ PC → MAR (Memory Address Register)
   └─ RAM[MAR] → MDR (Memory Data Register)
   └─ MDR → IR (Instruction Register)
   └─ PC++

2. DECODE (Decodificar)
   └─ Analisar IR
   └─ Extrair opcode
   └─ Extrair operandos
   └─ Carregar flags

3. EXECUTE (Executar)
   └─ Executar operação
   └─ Atualizar registradores
   └─ Atualizar RAM
   └─ Atualizar flags

4. STORE (Armazenar Resultado)
   └─ Resultado → Registrador ou RAM
   └─ Atualizar PC para próxima instrução

REPETIR
```

---

## 🧠 Máquina de Estados

```
    ┌─────────┐
    │  START  │
    └────┬────┘
         │
    ┌────▼─────────┐
    │  INITIALIZED │
    └────┬─────────┘
         │
    ┌────▼─────────┐      pause()
    │  RUNNING     │◄─────────────┐
    └────┬─────────┘              │
         │                        │
    ┌────▼─────────┐        resume()
    │  PAUSED      │────────────────┘
    └────┬─────────┘
         │
    ┌────▼─────────┐
    │  STOPPED     │
    └─────────────┘
```

---

## 📊 Responsabilidades por Camada

| Camada | Responsabilidade |
|--------|---|
| **Core** | Modelos de hardware, estado |
| **Engine** | Simulação, eventos, clock |
| **Components** | Abstração de componentes |
| **UI** | Render, canvas, interação |
| **Data** | Conteúdo, tutoriais, instruções |
| **Utils** | Logging, validação, helpers |

---

## 🔌 Extensibilidade

Adicionar novo componente:

```javascript
// 1. Estender Core
class CustomComponent extends CoreComponent {
  constructor() { super(); }
  execute() { }
}

// 2. Registrar em Engine
engine.registerComponent(new CustomComponent());

// 3. Criar Visualização
const visualizer = new ComponentVisualizer(component);

// 4. Integrar UI
uiLayer.addComponent(visualizer);
```

---

## 🎯 Princípios de Design

✅ **Coesão Alta** - Componentes focados  
✅ **Acoplamento Baixo** - Independência entre camadas  
✅ **Separação de Responsabilidades** - Cada camada tem um propósito  
✅ **Escalabilidade** - Fácil adicionar novos componentes  
✅ **Testabilidade** - Cada camada testável independentemente  
✅ **Mantenibilidade** - Código claro e documentado  

---

**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
