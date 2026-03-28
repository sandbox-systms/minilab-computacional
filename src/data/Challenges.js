// src/data/Challenges.js

export const CHALLENGES = {
  beginner: [
    {
      id: 'ch-01-load-register',
      title: 'Load Value into Register',
      description: 'Load value 42 into register A',
      difficulty: 'Easy',
      points: 10,
      steps: [
        'Execute LOAD instruction with value 42',
        'Verify value is in register A'
      ],
      expectedState: {
        registers: { A: 42 },
        description: 'Register A should contain 42'
      },
      solution: `
        // Solution:
        const cpu = new CPU();
        cpu.execute(0x01, 42);  // LOAD 42
        console.log(cpu.registers.A);  // 42
      `
    },
    {
      id: 'ch-02-basic-addition',
      title: 'Add Two Numbers',
      description: 'Add 15 and 27, result should be in A',
      difficulty: 'Easy',
      points: 15,
      steps: [
        'Load 15 into register A',
        'Load 27 into register B',
        'Execute ADD instruction',
        'Verify result is 42'
      ],
      expectedState: {
        registers: { A: 42 },
        description: 'A = 15 + 27 = 42'
      }
    },
    {
      id: 'ch-03-subtraction',
      title: 'Subtract Numbers',
      description: 'Calculate 100 - 58 = 42',
      difficulty: 'Easy',
      points: 15,
      steps: [
        'Load 100 into A',
        'Load 58 into B',
        'Execute SUB',
        'Verify result is 42'
      ],
      expectedState: {
        registers: { A: 42 },
        description: 'A = 100 - 58 = 42'
      }
    }
  ],

  intermediate: [
    {
      id: 'ch-04-memory-store',
      title: 'Store to Memory',
      description: 'Calculate result and store in memory',
      difficulty: 'Medium',
      points: 25,
      steps: [
        'Load two values',
        'Perform addition',
        'Store result to memory address 0x100',
        'Verify memory contains result'
      ]
    },
    {
      id: 'ch-05-loop-simulation',
      title: 'Loop Simulation',
      description: 'Execute instructions in a loop pattern',
      difficulty: 'Medium',
      points: 30
    }
  ],

  advanced: [
    {
      id: 'ch-06-complex-program',
      title: 'Complex Program Execution',
      description: 'Execute multi-instruction program',
      difficulty: 'Hard',
      points: 50
    }
  ]
};

export class Challenge {
  constructor(challengeData) {
    Object.assign(this, challengeData);
    this.solved = false;
    this.attempts = 0;
  }

  verify(cpuState, memoryState) {
    this.attempts++;
    
    // Check if expected state matches
    if (cpuState.registers.A === this.expectedState.registers.A) {
      this.solved = true;
      return { success: true, points: this.points };
    }
    
    return { success: false, message: 'Incorrect result' };
  }
}

export default CHALLENGES;
