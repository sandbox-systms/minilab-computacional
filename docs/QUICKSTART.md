// docs/QUICKSTART.md

# MiniLab Computacional - Quick Start Guide

## Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment
\`\`\`bash
cp .env.example .env
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

The simulator will be available at \`http://localhost:3000\`

---

## First Steps

### Running a Simple Simulation

1. **Open the Web Interface**
   - Navigate to http://localhost:3000
   - You'll see CPU registers and memory display

2. **Execute Instructions**
   - Click "Step" to execute one instruction
   - Use "Run" for continuous execution
   - Use "Pause"/"Resume" to control

3. **Monitor State**
   - Watch register values change
   - View memory access patterns
   - Track cycle count and execution time

---

## Example Program

Create a simple program that adds two numbers:

\`\`\`javascript
// Load values and add
const program = [
  0x01, 0x0F,  // LOAD 15 into A
  0x02, 0x1B,  // LOAD 27 into B  
  0x02, 0x00   // ADD A + B
];

// Execute
simulator.load(program);
simulator.run();
\`\`\`

---

## API Endpoints

### Simulation Control
- \`GET /api/health\` - Health check
- \`GET /api/simulation/state\` - Get current state
- \`POST /api/simulation/step\` - Execute one cycle
- \`POST /api/simulation/run\` - Execute N cycles
- \`POST /api/simulation/reset\` - Reset simulator

### Learning Resources
- \`GET /api/tutorials\` - Get tutorials
- \`GET /api/challenges\` - Get challenges
- \`POST /api/challenges/:id/verify\` - Check challenge solution

---

## Tutorials

Start with Beginner tutorials:
1. **Introduction to Registers** - Learn about CPU registers
2. **Basic Instructions** - Understand instruction types
3. **Memory Basics** - How memory works

Then progress to Intermediate and Advanced topics.

---

## Challenges

Complete coding challenges at your level:
- **Beginner**: Load values, basic arithmetic
- **Intermediate**: Memory operations, loops
- **Advanced**: Complex programs, optimization

---

## Troubleshooting

### Port Already in Use
\`\`\`bash
npm run dev -- --port 3001
\`\`\`

### Reset Simulator State
\`\`\`bash
POST /api/simulation/reset
\`\`\`

### View Logs
Set log level in \`.env\`:
\`\`\`
LOG_LEVEL=debug
\`\`\`

---

## Next Steps

- Read full [Architecture Guide](./architecture.md)
- Explore [System Design](./system-design.md)
- Try the [Tutorials Collection](./tutorials/)
- Complete available [Challenges](./challenges/)

---

For more help, see [DEVELOPMENT.md](./DEVELOPMENT.md)
