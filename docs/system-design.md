# System Design - MiniLab Computacional

## 🖥️ CPU (Central Processing Unit)

### Estrutura

```javascript
class CPU {
  // Registradores
  registers = {
    A: 0,     // Acumulador
    B: 0,     // Registrador B
    C: 0,     // Registrador C
    D: 0      // Registrador D
  }
  
  // Contadores e apontadores
  PC = 0;    // Program Counter (endereço próxima instrução)
  SP = 0;    // Stack Pointer (topo da pilha)
  BP = 0;    // Base Pointer (base do frame)
  
  // Flags (Condition Codes)
  flags = {
    Z: false, // Zero Flag
    C: false, // Carry Flag
    O: false, // Overflow Flag
    N: false  // Negative Flag
  }
  
  // Internal Registers (não acessíveis via instruções)
  MAR = 0;   // Memory Address Register
  MDR = 0;   // Memory Data Register
  IR = 0;    // Instruction Register
}
```

### Operações

```javascript
// Fetch: Buscar próxima instrução
fetch(memory) {
  this.MAR = this.PC;
  this.MDR = memory.read(this.MAR);
  this.IR = this.MDR;
  this.PC++;
}

// Decode: Decodificar instrução
decode(instruction) {
  return {
    opcode: (instruction >> 4) & 0x0F,
    operand: instruction & 0x0F
  };
}

// Execute: Executar instrução
execute(opcode, operand) {
  switch(opcode) {
    case OP_LOAD:
      this.registers.A = this.MDR;
      break;
    case OP_ADD:
      this.registers.A += this.registers.B;
      this.updateFlags();
      break;
    // ... mais operações
  }
}

// Update Flags
updateFlags() {
  this.flags.Z = (this.registers.A === 0);
  this.flags.N = (this.registers.A < 0);
  this.flags.C = (this.registers.A > 255);
}
```

---

## 💾 RAM (Random Access Memory)

### Características

```javascript
class RAM {
  // Tamanho padrão: 1024 palavras (1KB)
  size = 1024;
  memory = new Array(1024).fill(0);
  
  // Mapa de memória
  // 0x000-0x0FF: Kernel/BIOS (256 bytes)
  // 0x100-0x1FF: Data (256 bytes)
  // 0x200-0x3FF: Code/Program (512 bytes)
  // 0x400-0x3FF: User Data (256 bytes)
}

// Operações de Memória
read(address) {
  if (address < 0 || address >= this.size) {
    throw new Error('Memory Access Violation');
  }
  return this.memory[address];
}

write(address, value) {
  if (address < 0 || address >= this.size) {
    throw new Error('Memory Access Violation');
  }
  if (address < 0x100) {
    throw new Error('Protected Memory Area');
  }
  this.memory[address] = value & 0xFF;  // 8-bit
}

dump(startAddr, endAddr) {
  // Exibir conteúdo da memória
  for (let addr = startAddr; addr < endAddr; addr++) {
    console.log(`[${addr}]: ${this.memory[addr]}`);
  }
}
```

### Mapa de Memória

```
┌─────────────┬──────────────┐
│  Endereço   │   Conteúdo   │
├─────────────┼──────────────┤
│ 0x000-0x0FF │ Kernel/BIOS  │ (Protegido)
├─────────────┼──────────────┤
│ 0x100-0x1FF │ Data         │ (Variáveis)
├─────────────┼──────────────┤
│ 0x200-0x3FF │ Code/Program │ (Instruções)
├─────────────┼──────────────┤
│ 0x400-0x3FF │ User Data    │ (Heap)
├─────────────┼──────────────┤
│ 0xFF0-0xFFF │ Stack        │ (Stack)
└─────────────┴──────────────┘
```

---

## 🚁 Bus (Barramento)

### Componentes

```javascript
class Bus {
  // Barramento de Dados (8 bits)
  dataLine = 0x00;
  
  // Barramento de Endereço (16 bits)
  addressLine = 0x0000;
  
  // Linhas de Controle
  readLine = false;
  writeLine = false;
  clockLine = false;
  resetLine = false;
  
  // Arbitragem de Bus
  masterDevice = null;
  
  selectMaster(device) {
    this.masterDevice = device;
  }
  
  transferData(from, to, address, data) {
    this.addressLine = address;
    this.dataLine = data;
    // Sinalizar transferência
  }
}
```

---

## 🔢 Conjunto de Instruções (ISA)

### Formato de Instrução

```
┌────┬────────┐
│ Op │ Operado│
├────┼────────┤
│4bit│  4bit  │
└────┴────────┘

Op codes:
0000 - LOAD  (Carregar em registro)
0001 - STORE (Armazenar em memória)
0010 - ADD   (Soma)
0011 - SUB   (Subtração)
0100 - AND   (AND lógico)
0101 - OR    (OR lógico)
0110 - JMP   (Salta para endereço)
0111 - JZ    (Salta se Zero)
1000 - NOP   (Não faz nada)
```

### Exemplos de Instruções

```javascript
// LOAD 0x05 - Carrega valor de endereço 0x05 para A
{
  opcode: 0x00,
  operand: 0x05,
  description: 'Carrega A ← MEM[0x05]'
}

// ADD 0x02 - Soma A + B
{
  opcode: 0x02,
  operand: 0x02,
  description: 'ADD A, B'
}

// JMP 0x10 - Pula para endereço 0x10
{
  opcode: 0x06,
  operand: 0x10,
  description: 'PC ← 0x10'
}
```

---

## 🔌 Conectores e Interfaces

### CPU ↔ RAM

```javascript
interface CPUtoRAM {
  // CPU envia para RAM
  addressBus: number;    // Qual endereço
  dataBus: number;       // Qual dado
  controlSignal: string; // READ ou WRITE
  
  // RAM responde
  dataReady: boolean;
  data: number;
}
```

### CPU ↔ I/O

```javascript
interface CPUtoIO {
  // Input
  readFromDevice(deviceID) { }
  
  // Output
  writeToDevice(deviceID, data) { }
  
  // Interrupts
  handleInterrupt(irqNumber) { }
}
```

---

## ⚡ Ciclos de Clock

### T1: Fetch
```
1. CPU.PC → MAR
2. Enviar READ signal
3. RAM devolve instrução
4. Instrução → IR
5. PC++
```

### T2: Decode
```
1. IR → Control Unit
2. Decodificar opcode
3. Decodificar operandos
4. Carregar flags relevantes
```

### T3: Execute
```
1. Executar operação
2. Atualizar registradores
3. Atualizar flags
```

### T4: Store (Opcional)
```
1. Se necessário, escrever em memória
2. Sinalizar conclusão
```

---

## 🧮 ALU (Arithmetic Logic Unit)

```javascript
class ALU {
  // Entradas
  inputA = 0;
  inputB = 0;
  operation = 'ADD';
  
  execute() {
    let result = 0;
    
    switch(this.operation) {
      case 'ADD':
        result = this.inputA + this.inputB;
        break;
      case 'SUB':
        result = this.inputA - this.inputB;
        break;
      case 'AND':
        result = this.inputA & this.inputB;
        break;
      case 'OR':
        result = this.inputA | this.inputB;
        break;
      case 'XOR':
        result = this.inputA ^ this.inputB;
        break;
      case 'NOT':
        result = ~this.inputA;
        break;
      case 'SHL': // Shift Left
        result = this.inputA << 1;
        break;
      case 'SHR': // Shift Right
        result = this.inputA >> 1;
        break;
    }
    
    return result;
  }
}
```

---

## 🎛️ Unidade de Controle

```javascript
class ControlUnit {
  decodeInstruction(ir) {
    const opcode = (ir >> 4) & 0x0F;
    const operand = ir & 0x0F;
    
    const controlSignals = {
      aluOperation: this.mapOpcodeToOperation(opcode),
      memoryRead: this.needsMemoryRead(opcode),
      memoryWrite: this.needsMemoryWrite(opcode),
      registerWrite: this.needsRegisterWrite(opcode),
      pcIncrement: true
    };
    
    return controlSignals;
  }
  
  mapOpcodeToOperation(opcode) {
    const map = {
      0x02: 'ADD',
      0x03: 'SUB',
      0x04: 'AND',
      // ...
    };
    return map[opcode] || 'NOP';
  }
}
```

---

## 📊 Diagrama de Componentes

```
┌────────────────────────────────┐
│          Simulation            │
└────────────────────────────────┘
         ▲          ▲         ▲
         │          │         │
    ┌────┴─┐   ┌────┴─┐   ┌──┴────┐
    │ CPU  │◄──┤ Bus  ├──►│ RAM    │
    └─┬────┘   └──┬───┘   └────────┘
      │           │
      │      ┌────▼─────┐
      │      │ I/O Device│
      │      └───────────┘
      │
   ┌──▼──────────────┐
   │  Control Unit   │
   └─────────────────┘
```

---

**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
