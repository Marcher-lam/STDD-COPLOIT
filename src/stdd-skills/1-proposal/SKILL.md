---
description: 创建新变更提案 - 开始 STDD 工作流
version: "1.0"
---

# /stdd:new - 创建变更提案

创建一个新的 STDD 变更提案，系统将引导你完成需求收集和澄清过程。

## 使用方式

```
/stdd:new <需求描述>
```

## 执行流程

```
┌─────────────────────────────────────────────────────────────┐
│                    /stdd:new 流程                           │
│                                                             │
│  1. 创建变更目录                                            │
│     stdd/changes/change-YYYYMMDD-HHMMSS/                   │
│                                                             │
│  2. 生成提案文件                                            │
│     ├── proposal.md      # 需求提案                        │
│     ├── .status.yaml     # 状态追踪                        │
│     └── specs/           # 规格目录 (待填充)                │
│                                                             │
│  3. 启动澄清                                                │
│     自动进入需求澄清阶段                                    │
│                                                             │
│  4. 状态标记                                                │
│     📝 待启动                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 生成的文件结构

```
stdd/changes/change-20260327-143052/
├── proposal.md          # 需求提案
├── .status.yaml         # 状态追踪
├── specs/               # Delta 规格 (待生成)
│   └── .gitkeep
├── design.md            # 设计文档 (待生成)
├── tasks.md             # 任务列表 (待生成)
└── apply.log            # 实现记录 (待生成)
```

## proposal.md 模板

```markdown
# Proposal: [变更标题]

## Intent
[为什么做这个变更？解决什么问题？]

## Scope
### In Scope
- [功能点 1]
- [功能点 2]

### Out of Scope
- [排除项 1]
- [排除项 2]

## Approach
[技术方案概述]

## Success Criteria
- [ ] [验收条件 1]
- [ ] [验收条件 2]

## Metadata
- Created: 2026-03-27
- Status: 📝 Draft
- Change ID: change-20260327-143052
```

## 示例

```bash
/stdd:new 实现一个支持 Markdown 导出的 todo-list

/stdd:new 优化用户认证流程，支持多因素认证

/stdd:new 重构数据访问层，使用 Repository 模式
```

## 下一步

| 命令 | 说明 |
|------|------|
| `/stdd:ff` | Fast-Forward 一键生成所有产物 |
| `/stdd:continue` | 逐步生成下一个产物 |
| `/stdd:explore` | 先探索再继续 |

## 与 OpenSpec 的对应

| OpenSpec | STDD Copilot |
|----------|--------------|
| `/opsx:new` | `/stdd:new` |
| `/opsx:propose` | `/stdd:new` |
| proposal.md | proposal.md |
