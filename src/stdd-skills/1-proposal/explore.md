---
description: 自由探索模式 - 只读分析现有系统
version: "1.0"
---

# /stdd:explore - 自由探索模式

进入只读探索模式，在动手前理清思路，可衔接 `/stdd:new`。

## 使用方式

```
/stdd:explore [探索目标]
```

## 特点

- **只读模式** - 不修改任何代码
- **自由思考** - 允许探索多个方向
- **产出分析** - 生成探索报告
- **可衔接** - 探索结果可直接用于创建提案

## 执行流程

```
┌─────────────────────────────────────────────────────────────┐
│                   /stdd:explore 流程                        │
│                                                             │
│  1. 分析现有代码                                            │
│     ├── 读取项目结构                                        │
│     ├── 识别技术栈                                          │
│     └── 理解架构模式                                        │
│                                                             │
│  2. 识别约束                                                │
│     ├── 框架限制                                            │
│     ├── 代码规范                                            │
│     └── 依赖关系                                            │
│                                                             │
│  3. 探索方案                                                │
│     ├── 多种实现可能性                                      │
│     ├── 优缺点分析                                          │
│     └── 风险评估                                            │
│                                                             │
│  4. 生成报告                                                │
│     stdd/explorations/explore-YYYYMMDD-HHMMSS.md           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 输出文件

```
stdd/explorations/
└── explore-20260327-143052.md
```

## 探索报告模板

```markdown
# Exploration: [探索主题]

## Context
- Date: 2026-03-27
- Focus: [探索焦点]

## Current State
### Project Structure
[当前项目结构分析]

### Tech Stack
- Language: TypeScript
- Framework: React 18
- Testing: Vitest

## Findings
### Finding 1: [发现标题]
[详细描述]

### Finding 2: [发现标题]
[详细描述]

## Constraints
- [约束 1]
- [约束 2]

## Options
### Option A: [方案名]
- Pros: [优点]
- Cons: [缺点]

### Option B: [方案名]
- Pros: [优点]
- Cons: [缺点]

## Recommendation
[推荐方案及理由]

## Next Steps
1. [下一步 1]
2. [下一步 2]
```

## 示例

```bash
/stdd:explore 理解现有的认证系统架构

/stdd:explore 分析数据库访问模式

/stdd:explore 评估引入 GraphQL 的可行性

/stdd:explore 寻找性能瓶颈
```

## 适用场景

| 场景 | 说明 |
|------|------|
| 需求表达不出来 | 先探索，理解现状 |
| 对现有系统不了解 | 分析架构，识别约束 |
| 需要技术选型 | 比较方案，评估风险 |
| 寻找重构切入点 | 分析痛点，规划路径 |

## 衔接其他命令

```
/stdd:explore --> /stdd:new --> /stdd:ff --> ...
```

探索报告会自动作为 `/stdd:new` 的上下文输入。
