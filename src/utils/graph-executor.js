const GraphCacheManager = require('./graph-cache');
const DynamicGraphRouter = require('./dynamic-router');

class GraphExecutor {
  constructor(intent = 'feature', projectId = 'default') {
    this.router = new DynamicGraphRouter();
    this.graph = this.router.compile(intent);
    this.cache = new GraphCacheManager(projectId);
    this.maxRollbacks = this.graph.config.retry_count || 3;
  }

  /**
   * 模拟节点执行的打桩函数
   * @param {string} nodeName 
   * @param {object} inputs 
   */
  async _executeNode(nodeName, inputs) {
    // 真实场景下这会调用大模型或底层 Bash，此处通过预置标志位处理
    if (inputs.shouldFailOn === nodeName) {
      throw new Error(`Execution failed at ${nodeName}: Target environment restriction.`);
    }
    return { success: true, timestamp: Date.now(), generator: nodeName };
  }

  /**
   * 反向倒退自愈引擎：向上传导回炉
   */
  async _handleRollback(failedNode, errorInfo, context) {
    const nodeDef = this.graph.skills[failedNode];
    if (!nodeDef || !nodeDef.depends_on || nodeDef.depends_on.length === 0) {
      throw new Error(`Fatal: Cannot heal automatically. Root node ${failedNode} failed.`);
    }

    const predecessor = nodeDef.depends_on[0];
    
    // 清理失败节点和前置节点的缓存（强制重新规划）
    this.cache.clear();

    const rollbackEvidence = {
      previousFailedNode: failedNode,
      errorMessage: errorInfo.message,
      instruction: `Please revise your strategy. Prior execution at ${failedNode} failed with: ${errorInfo.message}`
    };

    return { predecessor, rollbackEvidence };
  }

  /**
   * 运行整个生命周期
   */
  async runUntil(targetNode, initialInputs = {}) {
    let currentInputs = { ...initialInputs };
    let rollbacks = 0;
    
    // 我们用一个扁平化执行队列模拟 DAG
    // 在真实 DAG 中需要拓扑排序，但这里的路由已做了线性简化
    const nodes = Object.keys(this.graph.skills);
    let i = 0;

    while (i < nodes.length) {
      const nodeName = nodes[i];
      if (nodeName === targetNode) break;

      // 如果有缓存且没有携带自愈强制刷新指令
      if (this.cache.has(nodeName, currentInputs) && !currentInputs.rollbackEvidence) {
        currentInputs = this.cache.get(nodeName, currentInputs).outputs;
        i++;
        continue;
      }

      try {
        const outputs = await this._executeNode(nodeName, currentInputs);
        this.cache.set(nodeName, currentInputs, outputs);
        currentInputs = { ...currentInputs, ...outputs };
        i++;
      } catch (err) {
        if (rollbacks >= this.maxRollbacks) {
          throw new Error(`System exhausted max rollbacks (${this.maxRollbacks}). Last fail at ${nodeName}`);
        }

        rollbacks++;
        const healingData = await this._handleRollback(nodeName, err, currentInputs);
        
        // 寻找退回到的节点索引
        const prevIndex = nodes.indexOf(healingData.predecessor);
        if (prevIndex === -1) throw err;

        // 回滚游标并注入反击证据
        i = prevIndex;
        currentInputs = { ...initialInputs, rollbackEvidence: healingData.rollbackEvidence };
        
        // 针对刚才失败的点移除故障触发锚，模拟上一层给出了正确的新方案
        delete currentInputs.shouldFailOn;
      }
    }

    return currentInputs;
  }
}

module.exports = GraphExecutor;
