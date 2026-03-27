# STDD 接口契约簿

> 本文件记录项目中的关键接口、类型定义与 API 契约，确保前后端（或模块间）数据结构一致。

---

## 使用说明

1. **新增契约**：在下方添加新的接口/类型定义
2. **引用契约**：在实现代码中 import/require 本文件定义的类型
3. **更新契约**：修改契约后需同步更新所有依赖方

---

## 契约索引

| 契约ID | 类型 | 描述 | 最后更新 |
|--------|------|------|----------|
| (待填充) | | | |

---

## 接口定义

### API 契约

<!-- 示例:
#### `GET /api/todos`

**请求参数**:
- `page?`: number - 页码 (默认: 1)
- `limit?`: number - 每页数量 (默认: 20)

**响应**:
```json
{
  "data": [
    { "id": "string", "title": "string", "completed": boolean }
  ],
  "total": number,
  "page": number
}
```
-->

_(在此添加 API 接口定义)_

---

### 类型契约

<!-- 示例:
#### `Todo`

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: ISO8601DateString;
  updatedAt?: ISO8601DateString;
}
```
-->

_(在此添加类型定义)_

---

### 事件契约

<!-- 示例:
#### `TodoCreated`

```typescript
interface TodoCreated {
  type: 'todo.created';
  payload: {
    id: string;
    title: string;
  };
  timestamp: number;
}
```
-->

_(在此添加事件定义)_

---

## 变更日志

| 日期 | 契约ID | 变更类型 | 描述 |
|------|--------|----------|------|
| (待填充) | | | |

---

> **注意**：本文件由 STDD Copilot 自动维护。手动修改时请确保同步更新所有依赖方。
