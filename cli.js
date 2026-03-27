#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// ASCII Logo
const LOGO = `
${chalk.cyan('╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮')}
${chalk.cyan('│')}  ${chalk.bold.blue('STDD')} ${chalk.bold.white('Copilot')} ${chalk.gray('v1.0.0')}           ${chalk.cyan('│')}
${chalk.cyan('│')}  ${chalk.gray('Spec-First + TDD Framework')}       ${chalk.cyan('│')}
${chalk.cyan('╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯')}
`;

// 检查项目状态
function checkProjectStatus() {
  const stddDir = path.join(process.cwd(), '.stdd');
  const memoryDir = path.join(stddDir, 'memory');
  const activeFeatureDir = path.join(stddDir, 'active_feature');

  const status = {
    initialized: fs.existsSync(stddDir),
    hasProposal: false,
    hasClarification: false,
    hasConfirmed: false,
    hasBddSpec: false,
    hasDesign: false,
    hasTasks: false,
    hasFinalDoc: false,
    hasImplementation: false
  };

  if (status.initialized) {
    const proposalPath = path.join(activeFeatureDir, '01_proposal.md');
    if (fs.existsSync(proposalPath)) {
      status.hasProposal = true;
      const proposalContent = fs.readFileSync(proposalPath, 'utf-8');
      status.hasClarification = proposalContent.includes('<!-- Clarify -->');
      status.hasConfirmed = proposalContent.includes('<!-- Confirmed -->');
    }

    status.hasBddSpec = fs.existsSync(path.join(activeFeatureDir, '02_bdd_specs.feature'));
    status.hasDesign = fs.existsSync(path.join(activeFeatureDir, '03_design.md'));
    status.hasTasks = fs.existsSync(path.join(activeFeatureDir, '04_tasks.md'));
    status.hasFinalDoc = fs.existsSync(path.join(activeFeatureDir, 'FINAL_REQUIREMENT.md'));

    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      const files = fs.readdirSync(srcDir, { recursive: true });
      status.hasImplementation = files.some(f => /\.(js|ts|jsx|tsx)$/.test(f));
    }
  }

  return status;
}

// 显示状态
function displayStatus() {
  const status = checkProjectStatus();

  console.log(LOGO);
  console.log(chalk.bold('\n🔍 STDD 项目状态检测\n'));

  const steps = [
    { name: '初始化', done: status.initialized, cmd: '/stdd-init' },
    { name: '需求捕获', done: status.hasProposal, cmd: '/stdd-propose' },
    { name: '需求澄清', done: status.hasClarification, cmd: '/stdd-clarify' },
    { name: '需求确认', done: status.hasConfirmed, cmd: '/stdd-confirm' },
    { name: 'BDD 规格', done: status.hasBddSpec, cmd: '/stdd-spec' },
    { name: '架构设计', done: status.hasDesign, cmd: '/stdd-plan' },
    { name: '任务拆解', done: status.hasTasks, cmd: '/stdd-plan' },
    { name: '最终文档', done: status.hasFinalDoc, cmd: '/stdd-final-doc' },
    { name: '代码实现', done: status.hasImplementation, cmd: '/stdd-apply' }
  ];

  steps.forEach((step, index) => {
    const icon = step.done ? chalk.green('✅') : chalk.gray('⬜');
    console.log(`  ${icon} ${index + 1}. ${step.name.padEnd(10)} ${step.done ? '' : chalk.gray(`(${step.cmd})`)}`);
  });

  // 找到下一步
  const nextStep = steps.find(s => !s.done);
  if (nextStep) {
    console.log(chalk.bold.cyan(`\n📋 建议的下一步:`));
    console.log(chalk.white(`   运行 ${chalk.yellow(nextStep.cmd)}`));
  } else {
    console.log(chalk.bold.green('\n🎉 所有步骤已完成！'));
    console.log(chalk.white('   可以运行 /stdd-commit 提交代码'));
  }

  // 计算进度
  const completed = steps.filter(s => s.done).length;
  const progress = Math.round((completed / steps.length) * 100);
  const bar = '█'.repeat(Math.round(progress / 10)) + '░'.repeat(10 - Math.round(progress / 10));
  console.log(chalk.gray(`\n   进度: [${bar}] ${progress}%`));
}

// 获取帮助信息
function getHelp(topic) {
  const helpTopics = {
    init: {
      title: '初始化工作区',
      content: `
${chalk.bold('/stdd-init')} - 初始化 STDD 工作区

功能:
  • 创建 .stdd/memory/ 目录（持久化记忆）
  • 创建 .stdd/active_feature/ 目录（当前工作区）
  • 扫描并注册外部 AI 插件
  • 生成 foundation.md（技术栈约束）
  • 生成 registry.json（技能注册表）

示例:
  /stdd-init
`
    },
    propose: {
      title: '捕获需求',
      content: `
${chalk.bold('/stdd-propose <需求>')} - 捕获原始需求

功能:
  • 创建 01_proposal.md 需求草案
  • 自动检测 Epic 级需求
  • 触发需求澄清流程

示例:
  /stdd-propose 实现一个支持 Markdown 导出的 todo-list
  /stdd-propose 添加用户登录功能
`
    },
    tdd: {
      title: 'TDD 执行循环',
      content: `
${chalk.bold('Ralph Loop')} - 严格的 TDD 执行循环

流程:
  1. 🔴 红灯 - 生成必定失败的测试
  2. 🔍 静态检查 - 语法/类型检查
  3. 🟢 绿灯 - 编写最简实现
  4. 🧪 伪变异审查 - 检测骗绿灯断言
  5. 🔵 重构 - 优化代码结构

防跑偏机制:
  • 连续失败 3 次自动回滚
  • 伪变异审查防止断言欺骗
  • 微任务隔离防止上下文迷失

命令:
  /stdd-execute - 启动 TDD 循环
  /stdd-revert  - 手动回滚
`
    },
    turbo: {
      title: '快速模式',
      content: `
${chalk.bold('/stdd-turbo <需求>')} - 一键通扫模式

功能:
  • 跳过人工确认环节
  • 自动完成全流程
  • 适合简单需求或有把握的场景

流程:
  init → propose → clarify → spec → plan → execute → commit

示例:
  /stdd-turbo 实现一个将字符串反转的工具函数
`
    },
    skill: {
      title: 'Skill Graph 系统',
      content: `
${chalk.bold('Skill Graph')} - 动态 AI 插件编排

支持的 AI 代理:
  • Claude Code (claude-code)
  • Qwen Code (qwen-code)
  • OpenClaw (openclaw)
  • 其他遵循 SKILL.md 规范的代理

注册方式:
  1. 在 .agents/skills/ 下创建目录
  2. 添加 SKILL.md 文件
  3. 运行 /stdd-init 自动注册

注册表位置:
  • .stdd/memory/registry.json (机器可读)
  • .stdd/memory/registry.md (人类可读)
`
    }
  };

  if (topic && helpTopics[topic.toLowerCase()]) {
    const help = helpTopics[topic.toLowerCase()];
    console.log(LOGO);
    console.log(help.content);
  } else {
    console.log(LOGO);
    console.log(chalk.bold('\n📚 STDD Copilot 帮助\n'));
    console.log(chalk.gray('可用命令:\n'));

    Object.entries(helpTopics).forEach(([key, value]) => {
      console.log(`  ${chalk.yellow(`/stdd-help ${key}`.padEnd(25))} ${value.title}`);
    });

    console.log(chalk.gray('\n快速开始:'));
    console.log(chalk.white('  /stdd-init                    初始化工作区'));
    console.log(chalk.white('  /stdd-propose <需求>          捕获需求'));
    console.log(chalk.white('  /stdd-turbo <需求>            一键通扫'));
  }
}

program
  .name('stdd')
  .description('STDD Copilot - Spec-First + TDD Framework')
  .version('1.0.0')
  .option('--status', '显示项目状态')
  .option('--help-topic <topic>', '获取特定主题帮助');

// 处理斜杠命令
program.on('command:0', (cmd) => {
  // 兼容 /stdd-xxx 格式
});

program.parse(process.argv);

const options = program.opts();

// 显示状态
if (options.status) {
  displayStatus();
  process.exit(0);
}

// 显示帮助主题
if (options.helpTopic) {
  getHelp(options.helpTopic);
  process.exit(0);
}

// 无参数时显示欢迎界面
if (process.argv.length <= 2) {
  console.log(LOGO);
  console.log(chalk.bold('用法:\n'));
  console.log(chalk.white('  stdd --status              显示项目状态'));
  console.log(chalk.white('  stdd --help-topic <topic>  获取主题帮助'));
  console.log(chalk.white('  stdd /stdd-init            初始化工作区'));
  console.log(chalk.white('  stdd /stdd-propose <需求>  捕获需求'));
  console.log(chalk.white('  stdd /stdd-turbo <需求>    一键通扫'));
  console.log(chalk.gray('\n提示: 在 AI 代理中直接使用 /stdd-xxx 命令'));
  process.exit(0);
}

// 解析斜杠命令
const args = process.argv.slice(2).join(' ');
if (args.startsWith('/stdd-') || args.startsWith('stdd-')) {
  const command = args.replace(/^\//, '').replace(/^stdd-/, '');
  console.log(LOGO);
  console.log(chalk.cyan(`\n🚀 执行命令: ${args}\n`));
  console.log(chalk.gray('提示: 此命令将在 AI 代理上下文中执行'));
  console.log(chalk.gray(`工作流文件: .agents/workflows/${args.replace('/', '')}.md`));
}
