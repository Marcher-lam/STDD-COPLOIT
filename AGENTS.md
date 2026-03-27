# STDD Copilot

Specification & Test-Driven Development Copilot - 基于 Skill Graph 的全链路自动化开发框架。

## 规则

- 使用 Conventional Commits 规范提交代码
- 提交前运行 `npm run quality` 确保代码质量
- 所有技能定义遵循 `src/skills/` 目录结构
- 变更管理使用 `stdd/changes/` 目录

## 项目结构

```
stdd-copilot/
├── .claude/                 # Claude Code 集成
│   ├── commands/stdd/       # /stdd:* 斜杠命令
│   └── skills/              # 技能定义 (可被命令调用)
├── src/                     # 源代码
│   ├── stdd-skills/         # STDD 专用技能 (按阶段组织)
│   │   ├── 1-proposal/      # 提案阶段
│   │   ├── 2-specification/ # 规格阶段
│   │   ├── 3-design/        # 设计阶段
│   │   ├── 4-implementation/# 实现阶段
│   │   └── 5-verification/  # 验证阶段
│   ├── core-skills/         # 核心技能
│   │   ├── stdd-init/
│   │   ├── stdd-help/
│   │   └── stdd-graph/
│   └── utils/               # 工具函数
├── stdd/                    # 工作目录 (类似 OpenSpec 的 openspec/)
│   ├── specs/               # 规格文件 (Source of Truth)
│   ├── changes/             # 变更管理
│   │   └── archive/         # 归档变更
│   ├── explorations/        # 探索文档
│   ├── memory/              # 记忆库
│   ├── graph/               # Graph 配置
│   └── config.yaml          # 项目配置
├── docs/                    # 文档
│   ├── getting-started.md   # 快速开始
│   ├── concepts.md          # 核心概念
│   ├── workflows.md         # 工作流程
│   ├── commands.md          # 命令参考
│   ├── customization.md     # 自定义配置
│   ├── tutorials/           # 教程
│   ├── explanation/         # 深度解释
│   └── reference/           # API 参考
├── schemas/                 # JSON/YAML Schema
│   └── spec-driven/
│       ├── schema.yaml
│       └── templates/
├── tools/                   # CLI 工具
│   └── cli/
├── test/                    # 测试
│   ├── commands/
│   ├── core/
│   └── fixtures/
├── AGENTS.md                # 本文件 - AI 代理指令
├── README.md                # 项目介绍
├── USAGE.md                 # 使用手册
├── ARCHITECTURE.md          # 架构文档
└── INSTALL.md               # 安装指南
```

## 工作流程

```
/stdd:init ──► /stdd:new ──► /stdd:ff ──► /stdd:apply ──► /stdd:archive
    │              │              │              │              │
    ▼              ▼              ▼              ▼              ▼
  初始化        创建变更       生成产物       TDD实现        归档
```

## 核心概念

### 1. Specs (规格)
- 位于 `stdd/specs/`
- 描述系统当前行为的 Source of Truth
- 使用 BDD 格式 (Given/When/Then)

### 2. Changes (变更)
- 位于 `stdd/changes/`
- 每个变更是独立的文件夹
- 包含 proposal → specs → design → tasks

### 3. Delta Specs (增量规格)
- 描述相对于当前规格的变更
- 使用 ADDED/MODIFIED/REMOVED 章节
- 归档时合并到主规格

### 4. Ralph Loop (TDD 循环)
- 🔴 红灯: 生成失败测试
- 🔍 静态检查: 语法/类型验证
- 🟢 绿灯: 最小实现
- 🧪 变异审查: 检测骗绿灯
- 🔵 重构: 优化代码

## 5 级防跑偏

1. 人机确认门 - 关键决策需确认
2. 微任务隔离 - 5~6 个原子任务
3. 连续失败回滚 - 3 次失败熔断
4. 静态质检门 - 语法/类型检查
5. 伪变异审查 - 检测骗绿灯断言

## 技能验证

运行 `npm run validate:skills` 验证技能定义格式。

## 更多信息

- [快速开始](docs/getting-started.md)
- [核心概念](docs/concepts.md)
- [命令参考](docs/commands.md)
- [工作流程](docs/workflows.md)
