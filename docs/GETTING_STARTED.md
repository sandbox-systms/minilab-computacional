# Getting Started - MiniLab Computacional

Bem-vindo ao **MiniLab Computacional**! Este guia vai ajudar você a começar em menos de 30 minutos.

---

## ✅ Pré-requisitos

### Softwares Necessários

```bash
# Node.js 18+ LTS
node --version    # v18.0.0 ou superior

# npm 9+
npm --version     # 9.0.0 ou superior

# Git
git --version     # 2.30.0 ou superior
```

### Se não tem instalado:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Editor: [VS Code](https://code.visualstudio.com/) (recomendado)

---

## 📥 Passo 1: Clonar o Repositório

```bash
# Clone
git clone https://github.com/seu-usuario/minilab-computacional.git

# Entre na pasta
cd minilab-computacional

# Verifique a estrutura
ls -la
```

---

## 🔧 Passo 2: Instalar Dependências

```bash
# Instale
npm install

# Verifique
npm list --depth=0
```

---

## ⚙️ Passo 3: Configurar Ambiente

```bash
# Copie arquivo de exemplo
cp .env.example .env

# Arquivo .env pronto para uso
cat .env
```

---

## ▶️ Passo 4: Iniciar o Servidor

```bash
# Modo desenvolvimento
npm run dev

# Você verá
# Server running on http://localhost:3000
```

---

## 🌐 Passo 5: Acessar a Aplicação

Abra seu navegador:
```
http://localhost:3000
```

Você verá:
- Interface com componentes do CPU
- Visualização de memória
- Painel de controle da simulação

---

## 📁 Estrutura de Pastas

```
minilab-computacional/
├── src/
│   ├── core/              # Modelos de hardware
│   ├── engine/            # Motor de simulação
│   ├── components/        # Abstrações
│   ├── ui/                # Interface
│   ├── data/              # Conteúdo educacional
│   ├── utils/             # Utilitários
│   └── index.js           # Entry point
├── tests/                 # Testes
├── public/                # Assets estáticos
├── docs/                  # Documentação
├── config/                # Configurações
└── README.md
```

---

## 🧪 Passo 6: Rodar Testes

```bash
# Todos os testes
npm test

# Testes específicos
npm test -- unit

# Com cobertura
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📖 Passo 7: Ler Documentação

Comece com estes documentos:

1. **[architecture.md](architecture.md)** - Arquitetura geral
2. **[system-design.md](system-design.md)** - Design dos componentes
3. **[simulation-model.md](simulation-model.md)** - Como funciona a simulação
4. **[educational-layer.md](educational-layer.md)** - Interface educacional

---

## 🚀 Próximos Passos

### Para Aprender a Codebase
1. Leia [architecture.md](architecture.md)
2. Explore `src/core/` para entender os modelos
3. Veja `src/engine/` para o motor
4. Estude `src/ui/` para a visualização

### Para Desenvolver
1. Crie uma branch: `git checkout -b feature/sua-feature`
2. Faça alterações em `src/`
3. Escreva testes em `tests/`
4. Commit com [Conventional Commits](#commits)
5. Push e abra PR

### Para Testar Simulação
```javascript
// Exemplo em JavaScript/Node.js
const { CPU, RAM, SimulationEngine } = require('./src');

const cpu = new CPU();
const ram = new RAM(256);
const engine = new SimulationEngine(cpu, ram);

// Carrega programa
ram.write(0, 0x15);  // LOAD A, 5

// Executa
engine.run(10);

// Verifica resultado
console.log('Registro A:', cpu.registers.A);
```

---

## 💡 Dicas

### Desenvolvimento Rápido
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Watch tests
npm run test:watch

# Terminal 3: Lint/Format
npm run lint:fix
```

### Debug
```bash
# Inicie com debug
npm run test:debug

# Acesse: chrome://inspect
```

### Documentação em Tempo Real
```bash
# Abra em VS Code
code docs/

# Leia enquanto desenvolve
```

---

## ⚠️ Troubleshooting

### Erro: "npm: command not found"
```bash
# Instale Node.js
# https://nodejs.org/
```

### Erro: "Port 3000 already in use"
```bash
# Altere a porta
PORT=3001 npm run dev

# OU mate o processo
lsof -i :3000
kill -9 <PID>
```

### Erro: "Cannot find module"
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Testes falhando
```bash
# Deixe falhas be specific
npm test -- --verbose

# Re-run testes
npm test -- --no-cache
```

---

## 📋 Convenções de Código

### Commits (Conventional Commits)
```bash
# Feature nova
git commit -m "feat: adicionar CPU simulator"

# Correção de bug
git commit -m "fix: corrigir lógica de ALU"

# Documentação
git commit -m "docs: atualizar README"

# Testes
git commit -m "test: adicionar testes de RAM"

# Refatoração
git commit -m "refactor: simplificar EventQueue"
```

### Nomenclatura
```javascript
// ✅ Certo
class CPUSimulator { }
function executeInstruction() { }
const registerA = 0;

// ❌ Evitar
class cpu_simulator { }
function Execute_Instruction() { }
const register_a = 0;
```

---

## 🔗 Recursos Úteis

### Documentação
- [Node.js Docs](https://nodejs.org/docs/)
- [Jest Testing](https://jestjs.io/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### Ferramentas
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [Git](https://git-scm.com/)

---

## ✨ Próximas Sessões

Depois de setup:

**Sessão 1**: Entender arquitetura
- Leia architecture.md
- Explore src/core/
- Veja como CPU funciona

**Sessão 2**: Trabalhar com Engine
- Leia simulation-model.md
- Veja src/engine/
- Entenda fila de eventos

**Sessão 3**: Adicionar Feature
- Escolha uma feature pequena
- Implemente em src/
- Escreva testes
- Faça PR

---

## 🎓 Recursos de Aprendizado

Recomendamos estudar em paralelo:

1. **Computer Architecture Basics**
   - CPU, RAM, Registers
   - Fetch-Decode-Execute
   - Instruction Set

2. **Assembly Language**
   - LOAD, STORE, ADD
   - Jumps e Branches
   - Flags

3. **Discrete Event Simulation**
   - Event queues
   - Event handlers
   - Timing

---

## 🤝 Contribuindo

Quer contribuir?

1. Fork o repositório
2. Crie uma branch: `git checkout -b fix/seu-fix`
3. Commit: `git commit -m "fix: descrição"`
4. Push: `git push origin fix/seu-fix`
5. Abra Pull Request

---

## 📞 Suporte

Se ficar preso:

- 📖 Leia a [documentação](docs/)
- 🔍 Procure nos issues existentes
- 💬 Abra uma issue nova
- 📧 Contate: ghostnether28@gmail.com

---

**Tempo total**: ~30 minutos  
**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
