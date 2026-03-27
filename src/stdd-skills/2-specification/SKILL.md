---
description: 生成 BDD 规格 - 创建行为规格文件
version: "1.0"
---

# /stdd:spec - 生成 BDD 规格

将需求提案转化为结构化的 BDD (Behavior-Driven Development) 规格。

## 使用方式

```
/stdd:spec                    # 为当前变更生成规格
/stdd:spec --domain=auth      # 指定领域
/stdd:spec --all-domains      # 为所有相关领域生成
```

## 执行流程

```
┌─────────────────────────────────────────────────────────────┐
│                    /stdd:spec 流程                          │
│                                                             │
│  Input: proposal.md                                        │
│      │                                                      │
│      ▼                                                      │
│  1. 分析需求                                                │
│     ├── 提取功能点                                          │
│     ├── 识别领域边界                                        │
│     └── 确定变更类型                                        │
│                                                             │
│  2. 选择模板                                                │
│     ├── ADDED (新增)                                       │
│     ├── MODIFIED (修改)                                    │
│     └── REMOVED (删除)                                      │
│                                                             │
│  3. 生成场景                                                │
│     ├── Given (前置条件)                                    │
│     ├── When (触发动作)                                     │
│     └── Then (期望结果)                                     │
│                                                             │
│  4. 输出 Delta Spec                                         │
│     stdd/changes/xxx/specs/{domain}/spec.md                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Delta Spec 格式

```markdown
# Delta for [Domain]

## ADDED Requirements

### Requirement: [Requirement Name]
The system SHALL/MUST/SHOULD [behavior description].

#### Scenario: [Scenario Name]
- GIVEN [precondition]
- WHEN [action]
- THEN [expected outcome]

## MODIFIED Requirements

### Requirement: [Requirement Name]
The system SHALL [new behavior].
(Previously: [old behavior])

#### Scenario: [Scenario Name]
- GIVEN [precondition]
- WHEN [action]
- THEN [expected outcome]

## REMOVED Requirements

### Requirement: [Requirement Name]
(Deprecated because [reason])
```

## RFC 2119 关键词

| 关键词 | 含义 |
|--------|------|
| **MUST** | 绝对要求 |
| **SHALL** | 绝对要求 (同 MUST) |
| **SHOULD** | 推荐，但可有例外 |
| **MAY** | 可选项 |

## 示例输出

```markdown
# Delta for Auth

## ADDED Requirements

### Requirement: Two-Factor Authentication
The system MUST support TOTP-based two-factor authentication.

#### Scenario: 2FA enrollment
- GIVEN a user without 2FA enabled
- WHEN the user enables 2FA in settings
- THEN a QR code is displayed for authenticator app setup
- AND the user must verify with a code before activation

#### Scenario: 2FA login
- GIVEN a user with 2FA enabled
- WHEN the user submits valid credentials
- THEN an OTP challenge is presented
- AND login completes only after valid OTP

## MODIFIED Requirements

### Requirement: Session Expiration
The system MUST expire sessions after 15 minutes of inactivity.
(Previously: 30 minutes)

## REMOVED Requirements

### Requirement: Remember Me
(Deprecated in favor of 2FA)
```

## 领域组织

```
stdd/specs/
├── auth/
│   └── spec.md        # 认证授权
├── payments/
│   └── spec.md        # 支付处理
├── notifications/
│   └── spec.md        # 通知系统
└── ui/
    └── spec.md        # UI 行为
```

## 最佳实践

1. **Spec 是行为合约，不是实现计划**
   - 描述外部可观察的行为
   - 避免内部实现细节

2. **场景要可测试**
   - 使用 Given/When/Then 格式
   - 覆盖正常路径和边界情况

3. **保持轻量**
   - 默认使用 Lite 模式
   - 仅高风险变更使用 Full 模式

## 下一步

| 命令 | 说明 |
|------|------|
| `/stdd:design` | 生成技术设计 |
| `/stdd:continue` | 自动执行下一步 |
| `/stdd:validate` | 验证规格格式 |
