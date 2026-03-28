// src/data/Tutorials.js

export const TUTORIALS = {
  beginner: [
    {
      id: 'intro-registers',
      title: 'Introduction to CPU Registers',
      description: 'Learn about CPU registers and how they store data',
      level: 'Beginner',
      duration: '5 minutes',
      content: `
        # CPU Registers
        
        Registers are small, fast memory locations inside the CPU.
        
        ## General Purpose Registers:
        - A (Accumulator): Used for arithmetic operations
        - B (Base): Often used for addressing
        - C (Counter): Used for loop counting
        - D (Data): General data storage
        
        ## Special Purpose Registers:
        - PC (Program Counter): Points to next instruction
        - SP (Stack Pointer): Points to top of stack
        - BP (Base Pointer): References stack frame
      `,
      quiz: [
        {
          question: 'What is a register?',
          options: [
            'Small fast memory in CPU',
            'Large disk storage',
            'Network device',
            'Power source'
          ],
          correct: 0
        }
      ]
    },
    {
      id: 'basic-instructions',
      title: 'Basic CPU Instructions',
      description: 'Understand fundamental instruction types',
      level: 'Beginner',
      duration: '10 minutes',
      content: `
        # Basic Instructions
        
        ## Arithmetic Instructions:
        - ADD: Add two numbers
        - SUB: Subtract two numbers
        
        ## Memory Instructions:
        - LOAD: Load value from memory
        - STORE: Store value to memory
        
        ## Control Instructions:
        - NOP: No operation (pause)
        - JUMP: Jump to different address
      `,
      quiz: [
        {
          question: 'What does ADD do?',
          options: [
            'Adds A and B',
            'Subtracts B from A',
            'Loads memory',
            'Jumps to address'
          ],
          correct: 0
        }
      ]
    }
  ],

  intermediate: [
    {
      id: 'memory-management',
      title: 'Memory Management',
      description: 'Learn about memory addressing and protection',
      level: 'Intermediate',
      duration: '15 minutes',
      content: `
        # Memory Management
        
        ## Address Space:
        - Memory is divided into addresses (0x0000 to 0xFFFF)
        - Each address stores 8-bit value (byte)
        
        ## Memory Protection:
        - Kernel area (0x0000 - 0x00FF): Protected
        - User area (0x0100 - 0xFFFF): Accessible
        
        ## Access Types:
        - Read: Fetch value from memory
        - Write: Store value to memory
      `,
      quiz: []
    }
  ],

  advanced: [
    {
      id: 'fetch-decode-execute',
      title: 'Fetch-Decode-Execute Cycle',
      description: 'Deep dive into CPU execution model',
      level: 'Advanced',
      duration: '20 minutes',
      content: `
        # Fetch-Decode-Execute Cycle
        
        ## Step 1: Fetch
        - CPU reads instruction from memory at PC
        - Instruction stored in IR (Instruction Register)
        - PC incremented
        
        ## Step 2: Decode
        - IR parsed to extract opcode and operands
        - Control signals generated
        
        ## Step 3: Execute
        - ALU performs operation
        - Results stored in registers
        - Flags updated if needed
      `,
      quiz: []
    }
  ]
};

export default TUTORIALS;
