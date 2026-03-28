// config/environment.js

export const config = {
  development: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: 'development',
    DEBUG: true,
    LOG_LEVEL: 'debug',
    CORS_ORIGIN: '*',
    SIMULATION: {
      DEFAULT_FREQUENCY: 1000000,  // Hz
      MAX_CYCLES: 1000000,
      MEMORY_SIZE: 65536,
      KERNEL_SIZE: 256
    }
  },

  production: {
    PORT: process.env.PORT || 8080,
    NODE_ENV: 'production',
    DEBUG: false,
    LOG_LEVEL: 'info',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'https://minilab.example.com',
    SIMULATION: {
      DEFAULT_FREQUENCY: 1000000,
      MAX_CYCLES: 10000000,
      MEMORY_SIZE: 65536,
      KERNEL_SIZE: 256
    }
  },

  test: {
    PORT: 3001,
    NODE_ENV: 'test',
    DEBUG: false,
    LOG_LEVEL: 'error',
    CORS_ORIGIN: '*',
    SIMULATION: {
      DEFAULT_FREQUENCY: 1000000,
      MAX_CYCLES: 10000,
      MEMORY_SIZE: 1024,
      KERNEL_SIZE: 128
    }
  }
};

const env = process.env.NODE_ENV || 'development';
export default config[env];
