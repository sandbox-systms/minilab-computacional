// src/core/RAM.js - Memória Principal

export class RAM {
  constructor(size = 1024) {
    this.size = size;
    this.memory = new Array(size).fill(0);
  }

  /**
   * Ler dado da memória
   */
  read(address) {
    if (address < 0 || address >= this.size) {
      throw new Error(`Memory Access Violation: address ${address}`);
    }
    return this.memory[address];
  }

  /**
   * Escrever dado na memória
   */
  write(address, value) {
    if (address < 0 || address >= this.size) {
      throw new Error(`Memory Access Violation: address ${address}`);
    }
    // Proteger memória do kernel
    if (address < 0x100) {
      throw new Error('Protected Memory Area');
    }
    this.memory[address] = value & 0xFF;  // 8-bit
  }

  /**
   * Obter slice da memória
   */
  dump(startAddr, endAddr) {
    return this.memory.slice(startAddr, endAddr);
  }

  /**
   * Limpar memória
   */
  clear() {
    this.memory.fill(0);
  }

  /**
   * Obter estado
   */
  getState() {
    return {
      size: this.size,
      used: this.memory.filter(v => v !== 0).length,
      memory: this.memory.slice(0, 256) // Mostrar primeiros 256 endereços
    };
  }
}
