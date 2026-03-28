// src/data/Instructions.js

export const INSTRUCTION_SET = {
  0x00: {
    name: 'NOP',
    description: 'No Operation',
    operands: 0,
    cycles: 1,
    affectsFlags: false
  },
  0x01: {
    name: 'LOAD',
    description: 'Load value into register',
    operands: 1,
    cycles: 2,
    affectsFlags: false
  },
  0x02: {
    name: 'ADD',
    description: 'Add registers A and B, store in A',
    operands: 0,
    cycles: 1,
    affectsFlags: true
  },
  0x03: {
    name: 'SUB',
    description: 'Subtract register B from A, store in A',
    operands: 0,
    cycles: 1,
    affectsFlags: true
  },
  0x04: {
    name: 'STORE',
    description: 'Store register value in memory',
    operands: 1,
    cycles: 2,
    affectsFlags: false
  },
  0x05: {
    name: 'JUMP',
    description: 'Jump to address',
    operands: 1,
    cycles: 1,
    affectsFlags: false
  }
};

export class Instruction {
  constructor(opcode, operand = null) {
    this.opcode = opcode;
    this.operand = operand;
    this.metadata = INSTRUCTION_SET[opcode];
    
    if (!this.metadata) {
      throw new Error(`Invalid opcode: 0x${opcode.toString(16)}`);
    }
  }

  getDescription() {
    return this.metadata.description;
  }

  getCycles() {
    return this.metadata.cycles;
  }

  execute(cpu) {
    return cpu.execute(this.opcode, this.operand);
  }
}

export default INSTRUCTION_SET;
