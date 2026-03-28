# Documentação - MiniLab Computacional

Bem-vindo à documentação do **MiniLab Computacional**. Este diretório contém toda a documentação técnica e educacional do projeto.

## 📚 Documentos Principais

### 1. [architecture.md](architecture.md)
**Arquitetura técnica do sistema**
- Visão geral da arquitetura
- Componentes principais
- Fluxo de dados
- Padrões de design

👉 *Leia primeiro para entender a estrutura*

---

### 2. [system-design.md](system-design.md)
**Design detalhado dos componentes**
- CPU (Processador)
- Memória RAM
- Barramentos e I/O
- Interfaces de comunicação

👉 *Essencial para desenvolvedores*

---

### 3. [simulation-model.md](simulation-model.md)
**Modelo de simulação e motor de eventos**
- Ciclo de execução
- Fila de eventos
- Clock de simulação
- Sincronização

👉 *Importante para implementar o engine*

---

### 4. [educational-layer.md](educational-layer.md)
**Camada educacional e conteúdo**
- Modos de operação
- Tooltips e explicações
- Conteúdo pedagógico
- Interatividade

👉 *Referência para UX/educação*

---

### 5. [GETTING_STARTED.md](GETTING_STARTED.md)
**Guia de início rápido**
- Setup do ambiente
- Primeiras execuções
- Estrutura de pastas
- Próximos passos

👉 *Comece aqui se é novo no projeto*

---

## 📁 Estrutura do Projeto

```
minilab-computacional/
├── src/
│   ├── core/                # Modelos de hardware
│   │   ├── CPU.js
│   │   ├── RAM.js
│   │   ├── Bus.js
│   │   └── Registers.js
│   ├── engine/              # Motor de simulação
│   │   ├── SimulationEngine.js
│   │   ├── EventQueue.js
│   │   └── Clock.js
│   ├── components/          # Abstrações
│   │   ├── Processor.js
│   │   ├── Memory.js
│   │   └── IODevice.js
│   ├── ui/                  # Interface
│   │   ├── Renderer.js
│   │   ├── Canvas.js
│   │   └── Visualizer.js
│   ├── data/                # Conteúdo
│   │   ├── instructions.js
│   │   ├── tutorials.js
│   │   └── curriculum.js
│   ├── utils/               # Utilidades
│   │   ├── logger.js
│   │   ├── validator.js
│   │   └── helpers.js
│   └── index.js             # Entry point
├── tests/
│   ├── unit/                # Testes unitários
│   └── integration/         # Testes integração
├── public/                  # Arquivos estáticos
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── config/                  # Configurações
│   └── config.js
├── docs/                    # Documentação
└── README.md
```

---

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
cp .env.example .env
```

### 3. Iniciar em desenvolvimento
```bash
npm run dev
```

### 4. Acessar a aplicação
```
http://localhost:3000
```

---

## 🏗️ Fluxo de Desenvolvimento

```
1. Entender arquitetura     → Leia architecture.md
2. Estudar design           → Leia system-design.md
3. Aprender engine          → Leia simulation-model.md
4. Implementar feature      → Veja GETTING_STARTED.md
5. Testar código            → npm test
6. Fazer commit             → Conventional Commits
```

---

## 🧪 Testes

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

## 📋 Convenções

### Commits (Conventional Commits)
```bash
git commit -m "feat: adicionar CPU simulator"
git commit -m "fix: corrigir bug de fetch"
git commit -m "docs: atualizar README"
git commit -m "test: adicionar testes de RAM"
git commit -m "refactor: simplificar EventQueue"
```

### Código
- Use camelCase para variáveis
- Use PascalCase para classes
- Mantenha funções pequenas e focadas
- Adicione comentários em lógica complexa

### Testes
- 1 teste = 1 comportamento
- Use nomes descritivos
- Mantenha testes independentes
- Mire por 80%+ cobertura

---

## 🔗 Links Úteis

### Documentação Interna
- [architecture.md](architecture.md)
- [system-design.md](system-design.md)
- [simulation-model.md](simulation-model.md)
- [educational-layer.md](educational-layer.md)

### Referências Externas
- [MDN - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Node.js Docs](https://nodejs.org/docs/)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Jest Testing](https://jestjs.io/)

---

## 🆘 Troubleshooting

**P: Como começo?**  
R: Leia [GETTING_STARTED.md](GETTING_STARTED.md)

**P: Qual a arquitetura?**  
R: Veja [architecture.md](architecture.md)

**P: Como funciona a simulação?**  
R: Estude [simulation-model.md](simulation-model.md)

**P: Como adiciono conteúdo educacional?**  
R: Consulte [educational-layer.md](educational-layer.md)

---

## 📞 Contato & Suporte

- 📧 Email: dev@minilab.edu
- 💬 Issues: GitHub Issues
- 📱 Discord: Comunidade do projeto

---

**Versão Docs**: 1.0.0  
**Última atualização**: 27 de março de 2026
