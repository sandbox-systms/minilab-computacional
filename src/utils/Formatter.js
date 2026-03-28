// src/utils/Formatter.js

export class Formatter {
  static formatByte(value) {
    return `0x${value.toString(16).padStart(2, '0')}`;
  }

  static formatWord(value) {
    return `0x${value.toString(16).padStart(4, '0')}`;
  }

  static formatAddress(address) {
    return `0x${address.toString(16).toUpperCase().padStart(4, '0')}`;
  }

  static formatInstruction(opcode, operand) {
    const opcodeStr = this.formatByte(opcode);
    const operandStr = operand !== undefined ? ` ${this.formatByte(operand)}` : '';
    return `${opcodeStr}${operandStr}`;
  }

  static formatCycles(cycles) {
    if (cycles < 1000) return `${cycles}`;
    if (cycles < 1000000) return `${(cycles / 1000).toFixed(2)}K`;
    return `${(cycles / 1000000).toFixed(2)}M`;
  }

  static formatTime(ms) {
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    return `${(ms / 60000).toFixed(2)}m`;
  }

  static formatMemorySize(bytes) {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  }

  static formatState(state) {
    return JSON.stringify(state, null, 2);
  }

  static parseInstruction(hexStr) {
    const parts = hexStr.trim().split(/\s+/);
    const opcode = parseInt(parts[0], 16);
    const operand = parts.length > 1 ? parseInt(parts[1], 16) : 0;
    return { opcode, operand };
  }
}

export default Formatter;
