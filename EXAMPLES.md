# STDD Copilot 高阶实战：Agent 强化学习与进化遗传图谱

本文档弃用了简单的 Todo-List 示例，直接从 0 到 1 演示如何使用 STDD Copilot 框架落地一个极具工程复杂度的硬核项目：**包含进化遗传算法 (GA) 的 Agent 强化学习 (RL) 框架**。

这是 STDD Copilot 的**终极指北**——它端到端拉通了所有的斜杠指令，以大厂架构师的“顶层设计、抓手破局、数据闭环”视角，为你提供一份可以直接照做、降维打击的标准答案。

---

## 🧭 指令生命周期全景图

复杂系统开发决不能一蹴而就。我们将执行以下 7 大战役，覆盖全部技能卡：

1. **全局基线与愿景** (`init`, `vision`, `context`)
2. **战略破局与澄清** (`brainstorm`, `prp`, `propose`, `clarify`, `confirm`)
3. **标准化契约前置** (`spec`, `schema`, `api-spec`, `contract`)
4. **架构调度与委派** (`plan`, `supervisor`, `roles`, `parallel`)
5. **硬核 TDD 落地** (`outside-in`, `mock`, `factory`, `apply`, `execute`)
6. **防腐化质量拦截** (`complexity`, `mutation`, `metrics`, `certainty`)
7. **验收闭环与归档** (`verify`, `validate`, `user-test`, `final-doc`, `commit`, `archive`, `learn`, `graph`, `help`)

---

## 战役 1：全局基线与愿景对齐 (The Foundation)

一切从建立信任与全局基线（Context）开始。不要写一行代码，先统一思想。

```bash
# 1. 建立具有 AI 工程偏好的 STDD 基础设施
/stdd:init

# 2. 注入顶层愿景，确保 Agent 的代码具有长期演进能力
/stdd:vision 目标是构建一个支持 PPO 与神经进化（Neuroevolution）混合驱动的 Agent 训练架构，能够在非平稳环境中保持优秀的遗传多样性。

# 3. 建立三层文档架构（Foundation/Component/Feature）防止后续上下文 Token 耗尽
/stdd:context
```

## 战役 2：提案破局与深度澄清 (战略层)

面对算法架构需求，必须先拆解底层逻辑。

```bash
# 1. 开启头脑风暴：评估多目标优化中，纯 RL 与进化遗传混合算法的理论边界
/stdd:brainstorm

# 2. 结构化立项（What/Why/How/Success）：确定框架的 MVP 范围
/stdd:prp 规划第一版进化遗传 RL 框架的边界和验收指标。

# 3. 发起正式变更提案
/stdd:propose 构建遗传变异与深度强化学习统一的框架，支持交叉 (Crossover)、变异 (Mutation) 及适应度 (Fitness) 评估。

# 4. 极致需求深挖（78 种结构化推导）
/stdd:clarify --elicitation=first-principles
# AI [系统] 诊断反问：
# - 基因组 (Genome) 是直接编码超参数，还是编码神经网络的 Topology？
# - 适应度评估 (Fitness) 生命周期是同步的还是异步分布式的？

# 5. 用户确认门（HitL）。双方签字画押，严防中途需求蔓延。
/stdd:confirm
```

## 战役 3：契约即真理 (Source of Truth)

需求明确后，强制进行规格前置。代码只是规格的翻译。

```bash
# 1. 将确认的需求转化为严谨的 BDD 规格行为树 (Given/When/Then)
/stdd:spec

# 2. 类型引擎前置：自动生成 Genome 矩阵和 State 观测空间的 Zod/JSON Schema 定义
/stdd:schema generate --format=zod --strict

# 3. API 契约：定义 Agent 节点与外部环境 (如 OpenAI Gym) 的 gRPC 或 REST 数据流规约
/stdd:api-spec

# 4. 消费者驱动契约：规定并发进程池间歇通信的 5 种边界模式
/stdd:contract
```

## 战役 4：架构微隔离与调度 (战术层)

复杂度需要被分解为原子级颗粒度，并分配给专业的微角色。

```bash
# 1. 架构师拆卡：将大系统拆为"种群管理"、"选择算子"、"PPO Actor-Critic"等 15 个原子任务
/stdd:plan

# 2. 委派执行制：使用 Supervisor 协调多个分层代理（负责调度底层模型工作）
/stdd:supervisor

# 3. 约束 Agent 角色身份：为不同任务挂载专属专家人设（如算法专家、性能工程师）
/stdd:roles

# 4. DAG 无依赖任务并行编排（并发计算变异率和环境封装代码）
/stdd:parallel
```

## 战役 5：极限 TDD 落地 (执行层)

这是 Ralph Loop 运转的战场，不允许**没过测试就交付**的伪动作。

```bash
# 1. 外向内驱动：从环境与种群交互的 E2E 测试开始向下推导集成和单元测试
/stdd:outside-in --start=e2e

# 2. 隔离业务依赖：自动模拟 (Mock) 外部的渲染沙盒环境
/stdd:mock generate --api=/env/step

# 3. 造数据闭环：通过工厂模式生成边界异常的初代种群数据供测试使用
/stdd:factory

# 4. 领取微任务卡片，进入局部编码上下文
/stdd:apply

# 5. 核心：启动 The Ralph Loop 执行循环（🔴红灯 → 🔍静检 → 🟢绿灯 → 🧪变异 → 🔵重构）
/stdd:execute
```

## 战役 6：质量拦截与防腐化门禁 (质管层)

完成代码不等于质量合格，必须通过量化数据反逼代码精简。

```bash
# 1. APP Mass 结构化复杂度扫描，防止计算图写成“屎山”
/stdd:complexity src/core/genetic/

# 2. 伪变异审查：主动修改遗传变异概率的核心随机数逻辑，看看测试会不会绿（防骗绿灯拦截）
/stdd:mutation run --mode=deep --file=src/core/genetic/MutationOp.ts

# 3. 多元数据仪表盘汇总（代码行数、认知复杂度、分支覆盖）
/stdd:metrics trend

# 4. 架构师信心评估：大语言模型进行 5 维度置信度推理，达标才允许推进
/stdd:certainty
```

## 战役 7：全域验收与永久闭环 (交付层)

最后一步，拉通文档与代码一致性，完成架构沉淀。

```bash
# 1. 规范防溢露校对：验证最终交付的代码与 Phase 3 写的 BDD 是否 100% 映射
/stdd:validate --review

# 2. BDD 双向验证执行
/stdd:verify

# 3. 客户用例模拟：产出给 QA 团队/AI 测试代理的验收剧本
/stdd:user-test --agent --human

# 4. 生成最终架构白皮书（ADR、时序图聚合）
/stdd:final-doc

# 5. 原子化带上下文的 GIT 提交
/stdd:commit

# 6. 一切落定，进入归档区作为审计日志和知识库
/stdd:archive

# 7. 闭环学习系统：提取本次 RL 项目架构风格，形成 Pattern，给后续其它算法开发使用
/stdd:learn analyze-patterns

# ---- 其它辅助系统 ----
# 追溯历史：回放整个项目的 Skill 执行有向无环图
/stdd:graph replay
/stdd:graph visualize

# 日常求助：如果你对某个概念不清楚
/stdd:help "如何配置 mutation 的最低阈值？"
```

---

## 🎯 其它特殊操作场景

除了上述的从 0 到 1 稳妥流程，日常也存在以下需求：

**场景 A：一键极速流 (高确定性任务)**
如果只需要写一个小评估函数作为框架补充，无需过多会议：
```bash
/stdd:turbo 实现一个基于轮盘赌法则 (Roulette Wheel) 的选择算子
```

**场景 B：带防御性的修 Bug 闭环 (生产事故支援)**
如果 RL Agent 在训练后期出现梯度爆炸问题：
```bash
# 自动通过 TDD 补充失败的用例复现 Bug -> 验证修复 -> 加入回归
/stdd:issue "PPO_Clip 超过阈值导致 Loss 变 NAN"
```

**场景 C：陷入无尽重试泥潭**
当一个复杂依赖报错无法通过测试，不要手动乱改，直接托管给机器死磕：
```bash
# 自动 Plan-Execute-Reflect 递归试错
/stdd:iterate
```

**场景 D：跨大项的语义记忆检索**
如果你在另一个新项里面需要回忆当前项目如何定义 Crossover 算子：
```bash
/stdd:memory "搜索遗传算子里交叉策略的最佳实践类型"
```

**场景 E：被条例拦截与强制豁免**
如果你为了快速验证，故意违反了 Article 2 (TDD)，触发了红线被 Hook 拒绝写入。如果有充足的架构理由：
```bash
/stdd:constitution waiver --article=2 --reason="当前算法探索期，只需快速验证收敛性，后续补齐测试"
```

---
> 因为信任，所以简单。看懂这套流程，你就不再是个在 Copilot 对话框里盲人摸象的代码工，而是端到端对结果负责的 AI 架构师。🔥
