<div align="center">

# STDD Copilot

**Specification & Test-Driven Development Copilot**

A Full-Pipeline Automated Development Framework Powered by Skill Graph

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[**简体中文**](./README.md) · [**English**](./README_EN.md)

</div>

---

### Introduction

STDD Copilot is a **Specification & Test-Driven Development** framework powered by **Skill Graph**. It deeply integrates Spec-First methodology with TDD, orchestrating 22 AI coding engines (Claude Code, Cursor, Windsurf, etc.) for a fully automated pipeline from requirements capture to atomic commits.

### Key Features

- **38 Skills + 12 Agent Roles** — Complete workflow coverage from proposal to commit.
- **Ralph Loop TDD** — Red → Check → Green → Mutation → Refactor automated loop.
- **5-Level Anti-Drift** — Confirm gates, micro-tasks, circuit breaker, static checks, and mutation review to prevent AI hallucinations.
- **Constitution + Hooks** — 9 development articles enforced by Pre/Post ToolUse hooks with an explicit waiver auditing system.
- **Skill Graph Engine** — DAG visualization, orchestration, scheduling, and runtime tracking.
- **22 AI Engine Support** — 4-tier engine compatibility.
- **Cross-Model Delegation** — Automatic model degradation (e.g., from Opus to Sonnet) on consecutive failures.

### Quick Start

```bash
# Install framework
git clone https://github.com/Marcher-lam/STDD-COPILOT.git ~/stdd-copilot
cd ~/stdd-copilot && npm install && npm link

# Initialize in your target project
cd your-project
stdd init

# Start conversation in Claude Code
/stdd:new your-epic-feature
/stdd:apply
/stdd:archive
```

### Documentation

| Document | Description |
|----------|-------------|
| [Installation](./INSTALL.md) | Setup instructions and requirements |
| [CLI Guide](./docs/en/cli-guide.md) | Complete CLI and command reference (EN) |
| [Getting Started](./docs/en/getting-started.md) | Quick start tutorial and core concepts (EN) |
| [Usage](./USAGE.md) | Complete usage guide |
| [Architecture](./ARCHITECTURE.md) | System architecture overview |
| [Examples](./EXAMPLES.md) | Best practice templates and examples |

---

<div align="center">

**STDD Copilot** — Equip every developer with an AI Pair Programming Expert that never drifts and never builds tech debt.

Made with ❤️ by [Marcher-lam](https://github.com/Marcher-lam)

</div>
