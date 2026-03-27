---
description: Fast-Forward - 一键生成所有产物
version: "1.0"
---

# /stdd:ff - Fast-Forward 快速模式

按依赖顺序一次性生成四个核心产物，适合需求明确的场景。

## 使用方式

```
/stdd:ff [需求描述]
```

## 生成产物

按顺序自动生成:

| 顺序 | 产物 | 文件 | 说明 |
|------|------|------|------|
| 1 | proposal.md | 需求提案 | 结构化需求描述 |
| 2 | specs/*.md | Delta 规格 | ADDED/MODIFIED/REMOVED |
| 3 | design.md | 设计文档 | 架构和接口设计 |
| 4 | tasks.md | 任务列表 | 原子化任务拆解 |

## 执行流程

```
proposal.md
    │
    │  Intent + Scope + Approach
    ▼
specs/
    │
    │  BDD Scenarios (Given/When/Then)
    ▼
design.md
    │
    │  Technical Approach + File Changes
    ▼
tasks.md
    │
    │  Checklist with [ ] items
    ▼
Ready for /stdd:apply
```

## 状态流转

```
📝 Draft → 📋 Specified → 🎨 Designed → 📝 Ready
```

## 与 `/stdd:continue` 的区别

| 特性 | /stdd:ff | /stdd:continue |
|------|----------|----------------|
| 执行方式 | 一次性全部 | 逐步生成 |
| 中间干预 | 无 | 每步可调整 |
| 适用场景 | 需求明确 | 需求渐进清晰 |
| 速度 | 快 | 较慢 |

## 示例

```bash
# 简单明确需求
/stdd:ff 实现一个支持 Markdown 导出的 todo-list

# API 功能
/stdd:ff 添加用户登录 API，支持邮箱密码认证

# 工具函数
/stdd:ff 实现一个日期格式化工具函数

# Bug 修复
/stdd:ff 修复登录页面在移动端的布局问题
```

## 完整输出示例

```
🚀 Fast-Forward: 实现 todo-list Markdown 导出

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 1/4: proposal.md
   Created: stdd/changes/change-20260327-143052/proposal.md
   - Intent: 用户需要导出 todo-list 为 Markdown
   - Scope: 导出按钮、格式转换、文件下载
   - Approach: 使用 DOM Blob API

✅ Step 2/4: specs/todo-export.md
   Created: stdd/changes/change-20260327-143052/specs/todo-export.md
   - ADDED: Markdown Export Requirement
   - 3 Scenarios: empty list, completed items, mixed status

✅ Step 3/4: design.md
   Created: stdd/changes/change-20260327-143052/design.md
   - ExportService class design
   - File changes: src/services/ExportService.ts

✅ Step 4/4: tasks.md
   Created: stdd/changes/change-20260327-143052/tasks.md
   - 4 task groups, 12 sub-tasks
   - Ready for /stdd:apply

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Change created: change-20260327-143052

Next step: /stdd:apply
```

## 注意事项

- 仅适用于**需求明确**的场景
- 如果需求模糊，建议使用 `/stdd:new` + `/stdd:continue`
- 生成后可手动调整各产物
- 完成后运行 `/stdd:apply` 开始实现

## 与 OpenSpec 的对应

| OpenSpec | STDD Copilot |
|----------|--------------|
| `/opsx:ff` | `/stdd:ff` |
