#!/usr/bin/env node

console.log("🚀 STDD Copilot CLI 已启动！");
console.log("提示：目前 STDD 主要依赖于当前目录下的 .agents/workflows 脚本系统来调度外部模型，具体命令解析器将会在此扩展。");

const args = process.argv.slice(2);
if (args.length > 0) {
  console.log(`收到指令: ${args.join(' ')}`);
} else {
  console.log("使用方式: stdd /stdd-init, stdd /stdd-propose <需求> 等...");
}
