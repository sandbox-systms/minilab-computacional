# Educational Layer - MiniLab Computacional

## 🎓 Camada Educacional

A camada educacional transforma simulação técnica em uma experiência de aprendizado interativa.

---

## 🎯 Objetivos Pedagógicos

1. **Compreensão de Conceitos**
   - Visualizar fluxo de dados
   - Entender ciclos de execução
   - Ver registradores mudar em tempo real

2. **Experimentação Guiada**
   - Tutoriais passo a passo
   - Desafios progressivos
   - Feedback imediato

3. **Transferência de Conhecimento**
   - Do conceitual para o técnico
   - Da teoria para a prática
   - Diferentes estilos de aprendizado

---

## 📚 Estrutura de Conteúdo

### Níveis de Aprendizado

#### 1. Beginner (Iniciante)
```javascript
const BEGINNER_TUTORIAL = {
  name: 'Introduction to CPU',
  duration: '15 minutes',
  topics: [
    'What is a CPU?',
    'Program Counter',
    'Registers',
    'Memory basics'
  ],
  steps: [
    {
      title: 'The Program Counter',
      description: 'The PC track where we are in the program',
      hint: 'Watch the PC go up after each instruction',
      code: `
        // Your first program
        LOAD A, 5    // Load 5 into register A
      `,
      validation: () => cpu.registers.A === 5
    }
  ]
};
```

#### 2. Intermediate (Intermediário)
```javascript
const INTERMEDIATE_TUTORIAL = {
  name: 'Arithmetic Operations',
  duration: '30 minutes',
  topics: ['ADD', 'SUB', 'Flags', 'Jumps'],
  challenges: [
    { task: 'Write program that adds 3 + 4' },
    { task: 'Use jumps to create a loop' },
    { task: 'Understand zero flag behavior' }
  ]
};
```

#### 3. Advanced (Avançado)
```javascript
const ADVANCED_TUTORIAL = {
  name: 'Architecture Comparison',
  duration: '60 minutes',
  topics: [
    'Pipeline execution',
    'Memory hierarchy',
    'Interrupts and exceptions',
    'Multi-core simulation'
  ]
};
```

---

## 🎨 Componentes Visuais de Educação

### 1. Tooltips Dinâmicos

```javascript
class EducationalTooltip {
  constructor(element, content) {
    this.element = element;
    this.content = content;
    this.visible = false;
  }
  
  show(position) {
    // Mostrar explicação contextual
    const tooltip = document.createElement('div');
    tooltip.className = 'educational-tooltip';
    tooltip.innerHTML = `
      <h4>${this.content.title}</h4>
      <p>${this.content.explanation}</p>
      <p class="example">Example: ${this.content.example}</p>
    `;
    document.body.appendChild(tooltip);
  }
  
  hide() {
    // Esconder tooltip
  }
}

// Exemplo de uso
const pcTooltip = new EducationalTooltip(pcElement, {
  title: 'Program Counter',
  explanation: 'Points to the next instruction to execute',
  example: 'PC starts at 0, then increments after each instruction'
});
```

### 2. Modo Passo a Passo com Explicações

```javascript
class GuidedMode {
  constructor(engine, tutorial) {
    this.engine = engine;
    this.tutorial = tutorial;
    this.currentStep = 0;
  }
  
  nextStep() {
    const step = this.tutorial.steps[this.currentStep];
    
    // Executar um ciclo
    this.engine.step();
    
    // Mostrar explicação
    this.showExplanation(step);
    
    // Validar aprendizado
    if (this.validateUnderstanding(step)) {
      this.currentStep++;
      this.showCongratulations();
    }
  }
  
  showExplanation(step) {
    const panel = document.getElementById('explanation-panel');
    panel.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.description}</p>
      <p class="hint">💡 ${step.hint}</p>
      <div class="code">${step.code}</div>
    `;
  }
  
  validateUnderstanding(step) {
    return step.validation();
  }
}
```

### 3. Visualização de Fluxo de Dados

```javascript
class DataFlowVisualizer {
  drawInstruction(instruction, fromXY, toXY) {
    // Animar fluxo de dados
    // CPU → Registrador → Memória
    
    this.drawArrow(fromXY, toXY, {
      color: instruction.type === 'READ' ? 'blue' : 'red',
      label: `${instruction.operation}`,
      animated: true
    });
  }
  
  highlightCycle(stage) {
    // stage = 'FETCH', 'DECODE', 'EXECUTE'
    
    const stageElement = document.getElementById(`stage-${stage}`);
    stageElement.classList.add('active');
    
    setTimeout(() => {
      stageElement.classList.remove('active');
    }, 500);
  }
  
  showRegisterChange(registerName, oldValue, newValue) {
    const element = document.getElementById(`register-${registerName}`);
    element.textContent = newValue;
    element.classList.add('changed');
    
    // Feedback visual
    this.animateChange(element, {
      from: oldValue,
      to: newValue
    });
  }
}
```

---

## ❓ Sistema de Perguntas e Validação

```javascript
class UnderstandingValidator {
  constructor() {
    this.questions = [];
    this.answers = {};
  }
  
  addQuestion(id, question, correctAnswer) {
    this.questions.push({
      id,
      question,
      correctAnswer,
      userAnswer: null,
      isCorrect: false
    });
  }
  
  checkAnswer(questionId, answer) {
    const q = this.questions.find(q => q.id === questionId);
    q.userAnswer = answer;
    q.isCorrect = answer === q.correctAnswer;
    
    return {
      correct: q.isCorrect,
      feedback: q.isCorrect 
        ? '✅ Correct!' 
        : `❌ Wrong. The answer is ${q.correctAnswer}`,
      explanation: this.getExplanation(questionId)
    };
  }
  
  getExplanation(questionId) {
    const explanations = {
      'pc-increment': 'The PC increments after each cycle',
      'zero-flag': 'The zero flag sets when result is 0',
      // ...
    };
    return explanations[questionId];
  }
}
```

---

## 🎮 Desafios Interativos

### Challenge 1: Simple Sum

```javascript
const CHALLENGE_SIMPLE_SUM = {
  name: 'Calculate 5 + 3',
  description: 'Write a program that adds 5 and 3',
  difficulty: 'Easy',
  solution: `
    LOAD A, 5    // Load 5 into A
    LOAD B, 3    // Load 3 into B
    ADD  A, B    // Add and store result in A
    STORE 0x10   // Store result in memory
  `,
  testCases: [
    { input: [], expected: { A: 8, mem: [8] } }
  ],
  hints: [
    'Use LOAD to get values into registers',
    'Use ADD to combine them',
    'STORE puts the result in memory'
  ]
};
```

### Challenge 2: Loop Detection

```javascript
const CHALLENGE_LOOP = {
  name: 'Create a Loop',
  description: 'Write a loop that counts from 1 to 5',
  difficulty: 'Medium',
  solution: `
    LOAD A, 0    // Counter = 0
    LOAD B, 5    // Limit = 5
  LOOP:
    ADD A, 1     // Increment
    JMP LOOP     // If A < B, jump back
  `,
  testCases: [
    { expected: { cycles: 15 } }
  ]
};
```

---

## 📊 Progress Tracking

```javascript
class ProgressTracker {
  constructor(userId) {
    this.userId = userId;
    this.completedLessons = [];
    this.completedChallenges = [];
    this.score = 0;
    this.achievements = [];
  }
  
  completeLesson(lessonId) {
    this.completedLessons.push(lessonId);
    this.updateScore(10);
  }
  
  completeChallenge(challengeId, score) {
    this.completedChallenges.push({ id: challengeId, score });
    this.updateScore(score);
    this.checkAchievements();
  }
  
  checkAchievements() {
    // Primeiro programa executado
    if (this.completedChallenges.length === 1) {
      this.unlockAchievement('FIRST_PROGRAM');
    }
    
    // Completion de todas challenges fáceis
    if (this.completedChallenges.filter(c => c.difficulty === 'Easy').length >= 3) {
      this.unlockAchievement('BEGINNER_MASTER');
    }
  }
  
  getLeaderboard() {
    // Comparar pontuação com outros usuários
  }
}
```

---

## 🌍 Modos de Aprendizado

### Modo Exploratório
```javascript
// Usuário experimenta livremente
class ExploratoryMode {
  constructor(engine) {
    this.engine = engine;
    this.freeToExperiment = true;
  }
  
  userModifiesRegister(register, value) {
    this.engine.cpu.registers[register] = value;
    this.showFeedback('You changed ' + register);
  }
  
  userWritesProgram(code) {
    const compiled = this.compile(code);
    this.engine.loadProgram(compiled);
    this.engine.run();
  }
}
```

### Modo Orientado
```javascript
// Tutor guia o usuário
class GuidedMode {
  constructor(engine, tutorial) {
    this.engine = engine;
    this.tutorial = tutorial;
    this.strictMode = true;  // Não permite desvios
  }
  
  executeTutorial() {
    for (const step of this.tutorial.steps) {
      this.showInstruction(step);
      this.waitForCompletion(step);
    }
  }
}
```

### Modo Competição
```javascript
// Desafios com pontuação
class CompetitionMode {
  constructor() {
    this.challenges = [];
    this.leaderboard = [];
  }
  
  participateChallenge(userId, challengeId) {
    const challenge = this.getChallengeById(challengeId);
    const result = this.executeUserProgram();
    const score = this.calculateScore(result, challenge);
    this.updateLeaderboard(userId, score);
  }
}
```

---

## 🔔 Feedback e Orientação

```javascript
class FeedbackEngine {
  generateFeedback(simulation, expectedResult) {
    const actual = simulation.getResult();
    const feedback = {
      correct: this.isCorrect(actual, expectedResult),
      explanation: '',
      nextSteps: []
    };
    
    if (feedback.correct) {
      feedback.explanation = '✅ Excelente! Você entendeu bem.';
      feedback.nextSteps = this.getNextLevels();
    } else {
      feedback.explanation = this.explainMistake(actual, expectedResult);
      feedback.nextSteps = this.getRecommendations();
    }
    
    return feedback;
  }
  
  explainMistake(actual, expected) {
    // Análise inteligente do erro
    if (actual.registerA !== expected.registerA) {
      return 'Register A não tem o valor esperado. Verifique suas operações.';
    }
    // ... mais verificações
  }
}
```

---

## 🎓 Currículo Estruturado

```javascript
const CURRICULUM = {
  modules: [
    {
      id: 'basics',
      name: 'Arquitetura de Computadores - Fundamentos',
      lessons: [
        'Introdução ao CPU',
        'Registradores',
        'Memória',
        'Ciclo Fetch-Decode-Execute',
        'Conjunto de Instruções'
      ]
    },
    {
      id: 'advanced',
      name: 'Tópicos Avançados',
      lessons: [
        'Pipeline de Execução',
        'Hierarquia de Memória',
        'Otimizações de CPU',
        'Arquiteturas Modernas'
      ]
    }
  ]
};
```

---

**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
