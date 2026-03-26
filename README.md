# STDD Copilot (Specification & Test-Driven Development Copilot)

STDD Copilot 是一套基于 **Skill Graph（技能图谱）** 的全链路自动化开发框架。它将 **Spec-First (需求规范优先)** 与 **TDD (测试驱动开发)** 深度融合，通过动态编排外部 AI 代码助手（如 Claude Code, Qwen Code, OpenClaw 等），实现从“需求捕获”到“原子化提交”的全自动闭环。

## 🌟 核心特性

- **🤖 动态 Skill Graph 调度**：自动扫描并注册已安装的 AI 插件，根据当前需求关键字自动拼装执行图谱，按需加载外部 AI 能力。
- **📝 严格的需求驱动 (Spec-First)**：通过多轮智能澄清与确认门 (Confirm Gate)，将模糊语言转化为严谨的 BDD 规范。
- **♻️ 自动化 TDD 闭环 (The Ralph Loop)**：红灯 (生成测试) ➡️ 绿灯 (实现代码) ➡️ 重构，全由被调度的 AI 插件自动完成。
- **🛡️ 5级防跑偏防御体系**：
  - **人机确认门**：防需求误解。
  - **微任务隔离**：防上下文范围溢出。
  - **连续失败自动回滚**：防修复死循环与幻觉。
  - **静态类型/语法质检门**：防低级错误。
  - **伪变异审查 (Pseudo-Mutation)**：防测试“骗绿”。
- **📚 代码即文档**：专职 Documenter Agent 自动追踪变更，结束后自动生成完整的《最终需求与实现文档》(FINAL_REQUIREMENT.md)。

## 🚀 快速开始

请参阅以下文档以获取完整的安装和使用指南：

- 📖 **[安装指南 (INSTALL.md)](./INSTALL.md)** - 如何在本地安装并配置 STDD Copilot。
- 💡 **[使用手册 (USAGE.md)](./USAGE.md)** - 核心工作流指令大全及完整操作示例。
- 🏗️ **[架构设计文档](./.agents/documenter/STDD_Copilot_Design_Document.md)** *(由内置 Agent 自动维护)* - 深入了解 Skill Graph 与执行原理。

## 📂 核心工作流一览

系统通过 CLI 斜杠指令进行驱动，核心链路如下：

1. `/stdd-init`：初始化环境与插件记忆库。
2. `/stdd-propose`：提出原始需求草案。
3. `/stdd:clarify` & `/stdd:confirm`：系统主动交互澄清，并由人类最终确认。
4. `/stdd-spec` & `/stdd-plan`：生成 BDD 规格与极细微任务拆解。
5. `/stdd-execute`：动态组装 Skill Graph，并在外部代码助手的加持下自动完成 TDD 循环。
6. `/stdd-commit`：执行规范的原子化打包与提交。
7. `/stdd:final-doc` & `/stdd-apply`：生成最终需求文档，并依此彻底落实后续实现。

## 🤝 贡献与支持

欢迎提交 Issue 或 Pull Request！
STDD Copilot 旨在让每个开发者都能拥有一个不跑偏、不产生“屎山”的超级 AI 结对编程专家。
