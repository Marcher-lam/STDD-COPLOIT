# Concepts

本指南解释 STDD Copilot 背后的核心概念及其协作方式。实践用法请参阅 [Getting Started](getting-started.md) 和 [Workflows](workflows.md)。

## 设计哲学

STDD Copilot 围绕四个原则构建:

```
fluid not rigid      — 无阶段门槛，做有意义的事
iterative not waterfall — 边做边学，持续优化
easy not complex     — 轻量设置，最小仪式
brownfield-first     — 适合现有代码库，不只是绿地项目
```

### 为什么这些原则重要

**Fluid not rigid.** 传统 spec 系统将你锁定在阶段中：先规划，然后实现，然后完成。STDD Copilot 更灵活 — 你可以按任何有意义的顺序创建产物。

**Iterative not waterfall.** 需求会变化。理解会加深。开始时看似好的方法在看到代码库后可能不再适用。STDD Copilot 拥抱这一现实。

**Easy not complex.** 一些 spec 框架需要大量设置、严格格式或重量级流程。STDD Copilot 不妨碍你。几秒钟初始化，立即开始工作，仅在需要时定制。

**Brownfield-first.** 大多数软件工作不是从零开始 — 而是修改现有系统。STDD Copilot 的 delta 方式使指定对现有行为的修改变得容易，而不仅仅是描述新系统。

## 全局架构

STDD Copilot 将工作组织成两个主要区域:

```
┌─────────────────────────────────────────────────────────────────┐
│                         stdd/                                   │
│                                                                 │
│   ┌─────────────────────┐     ┌──────────────────────────────┐ │
│   │       specs/        │     │         changes/             │ │
│   │                     │     │                              │ │
│   │   Source of Truth   │◄────│   Proposed modifications     │ │
│   │   How your system   │     │   Each change = one folder   │ │
│   │   currently works   │     │   Contains artifacts+deltas  │ │
│   │                     │     │                              │ │
│   └─────────────────────┘     └──────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specs** 是 Source of Truth — 它们描述系统当前的行为。

**Changes** 是提议的修改 — 它们存在于单独的文件夹中，直到准备好合并。

这种分离是关键。你可以并行处理多个变更而不会冲突。你可以在变更影响主 specs 之前审查它。当你归档变更时，其 deltas 干净地合并到 Source of Truth。

## Specs

Specs 使用结构化需求和场景描述系统行为。

### 结构

```
stdd/specs/
├── auth/
│   └── spec.md     # 认证行为
├── payments/
│   └── spec.md     # 支付处理
├── notifications/
│   └── spec.md     # 通知系统
└── ui/
    └── spec.md     # UI 行为和主题
```

按领域组织 specs — 对系统有意义的逻辑分组。常见模式:

- **按功能区域**: `auth/`, `payments/`, `search/`
- **按组件**: `api/`, `frontend/`, `workers/`
- **按限界上下文**: `ordering/`, `fulfillment/`, `inventory/`

### Spec 格式

Spec 包含需求，每个需求有场景:

```markdown
# Auth Specification

## Purpose
应用的认证和会话管理。

## Requirements

### Requirement: User Authentication
The system SHALL issue a JWT token upon successful login.

#### Scenario: Valid credentials
- GIVEN a user with valid credentials
- WHEN the user submits login form
- THEN a JWT token is returned
- AND the user is redirected to dashboard

#### Scenario: Invalid credentials
- GIVEN invalid credentials
- WHEN the user submits login form
- THEN an error message is displayed
- AND no token is issued

### Requirement: Session Expiration
The system MUST expire sessions after 30 minutes of inactivity.

#### Scenario: Idle timeout
- GIVEN an authenticated session
- WHEN 30 minutes pass without activity
- THEN the session is invalidated
- AND the user must re-authenticate
```

### 关键元素

| 元素 | 用途 |
|------|------|
| `## Purpose` | 此 spec 领域的高层描述 |
| `### Requirement:` | 系统必须具备的特定行为 |
| `#### Scenario:` | 需求在行动中的具体示例 |
| SHALL/MUST/SHOULD | RFC 2119 关键词指示需求强度 |

### 为什么这样结构化 Specs

**需求是"做什么"** — 它们陈述系统应该做什么，不指定实现。

**场景是"何时"** — 它们提供可验证的具体示例。好的场景:
- 可测试 (可以为其编写自动化测试)
- 覆盖正常路径和边界情况
- 使用 Given/When/Then 或类似结构化格式

**RFC 2119 关键词** (SHALL, MUST, SHOULD, MAY) 传达意图:
- **MUST/SHALL** — 绝对要求
- **SHOULD** — 推荐，但存在例外
- **MAY** — 可选

### 保持轻量: 渐进式严谨

STDD Copilot 旨在避免官僚主义。使用仍能使变更可验证的最轻量级别。

**Lite spec (默认):**
- 简短的行为优先需求
- 清晰的范围和非目标
- 几个具体的验收检查

**Full spec (更高风险):**
- 跨团队或跨仓库变更
- API/契约变更、迁移、安全/隐私关注
- 歧义可能导致昂贵返工的变更

大多数变更应保持 Lite 模式。

## Changes

Change 是对系统的提议修改，打包为包含理解和实现所需一切的文件夹。

### Change 结构

```
stdd/changes/add-dark-mode/
├── proposal.md         # 为什么和做什么
├── design.md           # 怎么做 (技术方案)
├── tasks.md            # 实现清单
├── .stdd.yaml          # Change 元数据 (可选)
└── specs/              # Delta specs
    └── ui/
        └── spec.md     # ui/spec.md 的变更
```

每个 Change 是自包含的。它有:
- **产物** — 捕捉意图、设计和任务的文档
- **Delta specs** — 添加、修改或删除的规格
- **元数据** — 此特定变更的可选配置

### 为什么 Changes 是文件夹

将变更打包为文件夹有几个好处:

1. **一切在一起。** Proposal、design、tasks 和 specs 在一个地方。无需在不同位置查找。
2. **并行工作。** 多个变更可以同时存在而不冲突。在处理 `add-dark-mode` 的同时，`fix-auth-bug` 也在进行中。
3. **清晰历史。** 归档时，变更带着完整上下文移动到 `changes/archive/`。你可以回顾并理解不仅是什么变了，还有为什么。
4. **易于审查。** Change 文件夹容易审查 — 打开它，阅读 proposal，检查 design，查看 spec deltas。

## Delta Specs

Delta specs 是使 STDD Copilot 适用于棕地开发的核心概念。它们描述**正在变更的内容**而不是重述整个 spec。

### 格式

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

## MODIFIED Requirements

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA. Users should re-authenticate each session.)
```

### 为什么用 Deltas 而非完整 Specs

**清晰。** Delta 准确显示正在变更的内容。阅读完整 spec 时，你必须在脑海中与当前版本进行 diff。

**避免冲突。** 两个变更可以触及同一个 spec 文件而不会冲突，只要它们修改不同的需求。

**审查效率。** 审查者看到变更，而不是未变的上下文。专注于重要的事情。

**棕地适配。** 大多数工作修改现有行为。Deltas 使修改变成一等公民，而不是事后补充。

## Artifacts

Artifacts 是变更中指导工作的文档。

### Artifact 流程

```
proposal ──────► specs ──────► design ──────► tasks ──────► implement
│               │             │              │
why             what          how            steps
+ scope         changes       approach       to take
```

Artifacts 相互构建。每个 Artifact 为下一个提供上下文。

## Ralph Loop (TDD 循环)

STDD Copilot 使用 Ralph Loop 进行测试驱动开发:

```
┌──────────────────────────────────────────────────────┐
│                    Ralph Loop                         │
│                                                     │
│  🔴 红灯  →  🔍 静态检查  →  🟢 绿灯  →           │
│  生成失败测试    语法/类型检查    最简实现           │
│                                                     │
│  →  🧪 伪变异审查  →  🔵 重构  →  ✅ 完成           │
│     检测骗绿灯断言     优化代码                       │
│                                                     │
│  ⚠️ 连续失败 3 次 → 自动熔断                          │
└──────────────────────────────────────────────────────┘
```

## 5 级防跑偏防御体系

| 级别 | 机制 | 说明 |
|------|------|------|
| 1 | 人机确认门 | 关键决策需人类确认 |
| 2 | 微任务隔离 | 5~6 个原子任务，降低上下文迷失 |
| 3 | 连续失败回滚 | 3 次失败自动熔断 |
| 4 | 静态质检门 | 语法/类型检查在测试前执行 |
| 5 | 伪变异审查 | 检测骗绿灯断言 |

## Archive

归档通过将 delta specs 合并到主 specs 并保留变更历史来完成变更。

### 归档时发生什么

1. **合并 deltas。** 每个 delta spec 章节 (ADDED/MODIFIED/REMOVED) 应用到相应的主 spec。
2. **移动到 archive。** Change 文件夹带着日期前缀移动到 `changes/archive/` 以便按时间排序。
3. **保留上下文。** 所有产物在 archive 中保持完整。你随时可以回顾理解为什么做出变更。

## 如何整合在一起

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STDD FLOW                                         │
│                                                                             │
│   ┌────────────────┐                                                        │
│   │ 1. START       │ /stdd:new (core) or /stdd:new + /stdd:ff (expanded)  │
│   │    CHANGE      │                                                        │
│   └───────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│   ┌────────────────┐                                                        │
│   │ 2. CREATE      │ /stdd:ff or /stdd:continue (expanded workflow)        │
│   │    ARTIFACTS   │ Creates proposal → specs → design → tasks              │
│   │                │ (based on schema dependencies)                          │
│   └───────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│   ┌────────────────┐                                                        │
│   │ 3. IMPLEMENT   │ /stdd:apply                                            │
│   │    TASKS       │ Work through tasks, checking them off                   │
│   │                │◄──── Update artifacts as you learn                      │
│   └───────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│   ┌────────────────┐     ┌──────────────────────────────────────────────┐  │
│   │ 4. VERIFY      │────►│ Check implementation matches specs            │  │
│   │    WORK        │     │ (optional)                                    │  │
│   └───────┬────────┘     └──────────────────────────────────────────────┘  │
│           │                                                                 │
│           ▼                                                                 │
│   ┌────────────────┐     ┌──────────────────────────────────────────────┐  │
│   │ 5. ARCHIVE     │────►│ Delta specs merge into main specs            │  │
│   │    CHANGE      │     │ Change folder moves to archive/              │  │
│   └────────────────┘     │ Specs are now the updated source of truth    │  │
│                          └──────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**良性循环:**
1. Specs 描述当前行为
2. Changes 提议修改 (作为 deltas)
3. Implementation 使变更成为现实
4. Archive 将 deltas 合并到 specs
5. Specs 现在描述新行为
6. 下一个变更基于更新的 specs

## 术语表

| 术语 | 定义 |
|------|------|
| **Artifact** | Change 中的文档 (proposal, design, tasks, 或 delta specs) |
| **Archive** | 完成 Change 并将其 deltas 合并到主 specs 的过程 |
| **Change** | 对系统的提议修改，打包为包含 artfacts 的文件夹 |
| **Delta spec** | 描述相对于当前 specs 的变更 (ADDED/MODIFIED/REMOVED) 的 spec |
| **Domain** | Specs 的逻辑分组 (如 `auth/`, `payments/`) |
| **Requirement** | 系统必须具备的特定行为 |
| **Scenario** | 需求的具体示例，通常使用 Given/When/Then 格式 |
| **Source of truth** | `stdd/specs/` 目录，包含当前达成共识的行为 |

## 下一步

- [Getting Started](getting-started.md) - 实践第一步
- [Workflows](workflows.md) - 常见模式和使用场景
- [Commands](commands.md) - 完整命令参考
- [CLI Guide](cli-guide.md) - CLI 完整文档
