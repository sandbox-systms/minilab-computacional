// src/utils/Validator.js

export class Validator {
  static validateAddress(address, memorySize) {
    if (!Number.isInteger(address)) {
      throw new Error('Address must be an integer');
    }
    if (address < 0 || address >= memorySize) {
      throw new Error(`Address out of bounds: ${address}`);
    }
  }

  static validateValue(value) {
    if (!Number.isInteger(value)) {
      throw new Error('Value must be an integer');
    }
    if (value < 0 || value > 255) {
      throw new Error(`Value out of byte range: ${value}`);
    }
  }

  static validateOpcode(opcode) {
    const validOpcodes = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05];
    if (!validOpcodes.includes(opcode)) {
      throw new Error(`Invalid opcode: 0x${opcode.toString(16)}`);
    }
  }

  static validateCycles(cycles) {
    if (!Number.isInteger(cycles) || cycles < 1) {
      throw new Error('Cycles must be a positive integer');
    }
  }

  static validateRegister(register) {
    const validRegisters = ['A', 'B', 'C', 'D', 'PC', 'SP', 'BP'];
    if (!validRegisters.includes(register)) {
      throw new Error(`Invalid register: ${register}`);
    }
  }
}

export default Validator;
