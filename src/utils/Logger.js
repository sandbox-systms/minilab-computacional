// src/utils/Logger.js

export class Logger {
  constructor(name = 'MiniLab') {
    this.name = name;
    this.logLevel = process.env.LOG_LEVEL || 'info';
  }

  _format(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      name: this.name,
      message,
      ...data
    };
  }

  debug(message, data) {
    if (['debug'].includes(this.logLevel)) {
      console.log('DEBUG', this._format('DEBUG', message, data));
    }
  }

  info(message, data) {
    if (['debug', 'info'].includes(this.logLevel)) {
      console.log('INFO', this._format('INFO', message, data));
    }
  }

  warn(message, data) {
    if (['debug', 'info', 'warn'].includes(this.logLevel)) {
      console.warn('WARN', this._format('WARN', message, data));
    }
  }

  error(message, error = null) {
    console.error('ERROR', this._format('ERROR', message, {
      error: error?.message,
      stack: error?.stack
    }));
  }
}

export default new Logger('MiniLab');
