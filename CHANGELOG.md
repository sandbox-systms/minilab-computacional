// CHANGELOG.md

# Changelog

All notable changes to MiniLab Computacional are documented in this file.

## [1.0.0] - 2024

### Initial Release

#### Added
- **Core CPU Module**
  - 4 general-purpose registers (A, B, C, D)
  - Special purpose registers (PC, SP, BP)
  - Internal registers (MAR, MDR, IR)
  - 4 status flags (Z, C, O, N)
  - Fetch-Decode-Execute cycle implementation

- **Memory System**
  - 64KB RAM address space
  - Protected kernel memory area (0x0000-0x00FF)
  - User accessible memory (0x0100-0xFFFF)
  - Memory access logging and protection

- **Simulation Engine**
  - Discrete Event Simulation (DES) framework
  - Clock with configurable frequency
  - Event queue management
  - State machine (IDLE, RUNNING, PAUSED, STOPPED)
  - Step-by-step and continuous execution modes

- **Instruction Set**
  - NOP: No operation
  - LOAD: Load value into register
  - ADD: Arithmetic addition
  - SUB: Arithmetic subtraction
  - STORE: Store register to memory
  - JUMP: Program counter modification

- **Frontend Interface**
  - Canvas-based visualization
  - Real-time register display
  - Memory state monitoring
  - Simulation controls (Step, Run, Pause, Resume, Reset)
  - Responsive web interface

- **REST API**
  - Simulation state endpoints
  - Execution control endpoints
  - Educational content delivery
  - Challenge verification

- **Educational Framework**
  - Beginner: Registers, basic instructions
  - Intermediate: Memory management, loops
  - Advanced: Fetch-Decode-Execute, optimization
  - Progressive challenge system (10+ challenges)
  - Interactive tutorials with quizzes

- **Test Suite**
  - Unit tests for CPU core
  - Unit tests for memory system
  - Integration tests for simulation engine
  - 20+ test cases

- **Developer Tools**
  - Logging system with multiple levels
  - Input validation framework
  - Code formatting utilities
  - ESLint configuration
  - Prettier code formatting

#### Technical Details
- **Runtime**: Node.js 18+
- **Backend**: Express.js
- **Frontend**: Vanilla JavaScript + Canvas API
- **Testing**: Jest framework
- **Code Quality**: ESLint + Prettier
- **Documentation**: 2500+ lines of markdown guides

### Architecture
- 6-layer modular design
- Separation of concerns
- Event-driven communication
- Clean interface boundaries

### Documentation
- Architecture guide (system design patterns)
- System design documentation (ISA, memory model)
- Simulation model guide (DES implementation)
- Educational layer documentation
- Getting started guide
- Quick start guide
- Development guide

### Future Enhancements
- [ ] Assembly language compiler
- [ ] Debugger with breakpoints
- [ ] Performance profiler
- [ ] Additional instruction set (shift, bitwise ops)
- [ ] Interrupt handling
- [ ] Virtual memory support
- [ ] Multi-processor simulation
- [ ] Real-time visualizations

---

## Version History

### Development Files Structure
```
minilab-computacional/
├── src/
│   ├── core/              # CPU, RAM, SystemBus
│   ├── engine/            # Simulation engine + clock
│   ├── components/        # Processor, Memory, Computer
│   ├── ui/                # Renderer, Visualizer
│   ├── data/              # Instructions, Tutorials, Challenges
│   └── utils/             # Logger, Validator, Formatter
├── tests/
│   ├── unit/              # CPU, RAM tests
│   └── integration/       # SimulationEngine tests
├── config/                # Environment configuration
├── public/                # Web interface
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docs/                  # Documentation
└── [config files]         # package.json, .eslintrc, jest.config, etc.
```

---

## Maintenance

### Code Quality Metrics
- Test Coverage: 70%+ (threshold)
- Linting: ESLint passing
- Formatting: Prettier compliant

### Performance Targets
- Instruction cycle: < 1ms
- Memory access: < 100μs
- Visualization update: 60 FPS

---

## Contributors
- Initial Development: MiniLab Computacional Team

---

*Last Updated: 2024*
