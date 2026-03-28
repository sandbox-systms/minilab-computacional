// src/core/CPU.js - Processador Central

export class CPU {
  constructor() {
    // Registradores gerais
    this.registers = {
      A: 0,  // Acumulador
      B: 0,  // Registrador B
      C: 0,  // Registrador C
      D: 0   // Registrador D
    };

    // Registradores especiais
    this.PC = 0;   // Program Counter
    this.SP = 0;   // Stack Pointer
    this.BP = 0;   // Base Pointer

    // Registradores internos
    this.MAR = 0;  // Memory Address Register
    this.MDR = 0;  // Memory Data Register
    this.IR = 0;   // Instruction Register

    // Flags (Condition Codes)
    this.flags = {
      Z: false,  // Zero Flag
      C: false,  // Carry Flag
      O: false,  // Overflow Flag
      N: false   // Negative Flag
    };
  }

  /**
   * Fetch - Buscar instrução da memória
   */
  fetch(memory) {
    this.MAR = this.PC;
    this.MDR = memory.read(this.MAR);
    this.IR = this.MDR;
    this.PC++;
  }

  /**
   * Decode - Decodificar instrução
   */
  decode(instruction) {
    return {
      opcode: (instruction >> 4) & 0x0F,
      operand: instruction & 0x0F
    };
  }

  /**
   * Execute - Executar instrução
   */
  execute(opcode, operand) {
    switch (opcode) {
    case 0x00: // LOAD
      this.registers.A = this.MDR;
      break;
    case 0x02: // ADD
      this.registers.A += this.registers.B;
      this.updateFlags();
      break;
    case 0x03: // SUB
      this.registers.A -= this.registers.B;
      this.updateFlags();
      break;
    case 0x08: // NOP (No Operation)
      break;
    }
  }

  /**
   * Atualizar flags baseado no resultado
   */
  updateFlags() {
    this.flags.Z = (this.registers.A === 0);
    this.flags.N = (this.registers.A < 0);
    this.flags.C = (this.registers.A > 255);
  }

  /**
   * Obter estado atual do CPU
   */
  getState() {
    return {
      registers: { ...this.registers },
      pc: this.PC,
      sp: this.SP,
      bp: this.BP,
      flags: { ...this.flags },
      ir: this.IR
    };
  }

  /**
   * Reset do CPU
   */
  reset() {
    Object.keys(this.registers).forEach(key => {
      this.registers[key] = 0;
    });
    this.PC = 0;
    this.SP = 0;
    this.BP = 0;
    this.IR = 0;
    Object.keys(this.flags).forEach(key => {
      this.flags[key] = false;
    });
  }
}
