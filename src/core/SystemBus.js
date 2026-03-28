// src/core/SystemBus.js

export class SystemBus {
  constructor(cpu, ram) {
    this.cpu = cpu;
    this.ram = ram;
    this.devices = [];
  }

  attachDevice(device) {
    this.devices.push(device);
  }

  readFromMemory(address) {
    return this.ram.read(address);
  }

  writeToMemory(address, value) {
    this.ram.write(address, value);
  }

  transferData(source, destination, value) {
    if (source.type === 'register' && destination.type === 'memory') {
      this.writeToMemory(destination.address, value);
    } else if (source.type === 'memory' && destination.type === 'register') {
      return this.readFromMemory(source.address);
    }
  }

  broadcast(event, data) {
    this.devices.forEach(device => {
      if (device.onBusEvent) {
        device.onBusEvent(event, data);
      }
    });
  }
}

export default SystemBus;
