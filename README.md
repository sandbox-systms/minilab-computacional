# MiniLab Computacional

![UNIASSELVI](https://img.shields.io/badge/UNIASSELVI-Projeto%20Acad%C3%AAmico-005AA9?style=for-the-badge)
![EduTech](https://img.shields.io/badge/EduTech-Simula%C3%A7%C3%A3o%20Computacional-6A5ACD?style=for-the-badge)

---

## 📌 Overview

**MiniLab Computacional** é um simulador interativo de arquitetura de computadores projetado para ensino técnico e fundamental, com foco em visualização de sistemas computacionais e execução orientada a eventos.

O sistema abstrai componentes reais de hardware e permite ao usuário observar, em tempo real, o fluxo de dados e o ciclo de execução de instruções.

---

## 🎯 Objetivos

* Traduzir conceitos complexos de arquitetura em interações visuais
* Demonstrar o funcionamento interno de um computador
* Permitir experimentação controlada de eventos computacionais
* Servir como ferramenta educacional escalável

---

## 🧰 Stack Tecnológica

![JavaScript](https://img.shields.io/badge/JavaScript-Core-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Interface-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Estilo-1572B6?logo=css3&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas-Rendering-FF6F00)

---

## 🛠️ Tooling & Workflow

![Git](https://img.shields.io/badge/Git-Versionamento-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Reposit%C3%B3rio-181717?logo=github)
![Trello](https://img.shields.io/badge/Trello-Tracking-0052CC?logo=trello&logoColor=white)
![FigJam](https://img.shields.io/badge/FigJam-Design-F24E1E?logo=figma&logoColor=white)

---

## 🧠 Core Features

* Simulação de arquitetura de computadores em nível conceitual
* Motor de execução baseado em eventos discretos
* Visualização do ciclo de instrução (Fetch → Decode → Execute)
* Interface interativa com feedback em tempo real
* Modo educacional guiado e exploratório
* Comparação entre arquiteturas (legado vs moderno)

---

## 🏗️ System Architecture

Arquitetura modular baseada em separação de responsabilidades:

```
src/
├── core/            # Modelos de hardware (CPU, RAM, Barramentos)
├── engine/          # Motor de simulação (event queue, clock)
├── components/      # Abstrações dos dispositivos
├── ui/              # Interface e renderização
├── data/            # Conteúdo educacional
└── utils/           # Funções auxiliares
```

### Camadas

* **Core:** Representação dos componentes computacionais
* **Engine:** Execução de eventos e controle temporal
* **UI:** Visualização e interação do usuário
* **Data:** Conteúdo pedagógico e contextual

---

## ⚙️ Getting Started

### Pré-requisitos

* Node.js >= 18
* npm >= 9

### Instalação

```bash
git clone https://github.com/seu-usuario/minilab-computacional.git
cd minilab-computacional
npm install
```

### Execução

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## 🧪 Testing

```bash
npm run test
```

Cobertura de testes integrada via Codecov.

---

## 🔄 CI/CD

Pipeline recomendado com GitHub Actions:

* Build automatizado
* Testes unitários
* Lint (ESLint)
* Verificação de cobertura
* Deploy (opcional)

---

## 📊 Roadmap

### Fase 1 — MVP

* [ ] Simulação de boot
* [ ] Interface básica

### Fase 2 — Engine

* [ ] Sistema de eventos
* [ ] Clock de execução

### Fase 3 — Visualização

* [ ] Fluxo de dados animado
* [ ] Componentes interativos

### Fase 4 — Educação

* [ ] Tooltips dinâmicos
* [ ] Modo guiado

### Fase 5 — Expansão

* [ ] Comparador de arquiteturas
* [ ] Pipeline de CPU
* [ ] Representação binária

---

## 📚 Documentação

Consulte a pasta [docs/](docs/) para documentação completa:

* [architecture.md](docs/architecture.md) - Arquitetura do sistema
* [system-design.md](docs/system-design.md) - Design dos componentes
* [simulation-model.md](docs/simulation-model.md) - Modelo de simulação
* [educational-layer.md](docs/educational-layer.md) - Camada educacional
* [GETTING_STARTED.md](docs/GETTING_STARTED.md) - Guia de início rápido

---

## 🤝 Contributing

### Padrão de commits (Conventional Commits)

* `feat:` nova funcionalidade
* `fix:` correção de bug
* `refactor:` refatoração
* `docs:` documentação
* `test:` testes

### Fluxo

```bash
git checkout -b feature/nome-da-feature
git commit -m "feat: descrição clara"
git push origin feature/nome-da-feature
```

Abrir Pull Request para revisão.

---

## 🔐 Code Quality

* ESLint (padronização)
* Prettier (formatação)
* Testes automatizados
* Revisão por Pull Request

---

## 📄 License

Distribuído sob licença MIT.

---

## 📎 Contexto

Projeto acadêmico aplicado ao ensino de Arquitetura de Computadores, com abordagem prática baseada em simulação e visualização interativa.

---

## 🚀 Extensões Futuras

* Simulador de Assembly real
* Visualização de pipeline de CPU
* Integração com conteúdos educacionais externos
* Suporte a múltiplas arquiteturas

---

## 👤 Autor

Desenvolvido como projeto técnico-acadêmico com foco em engenharia de sistemas e computação educacional.

---

**Versão**: 1.0.0  
**Última atualização**: 27 de março de 2026
