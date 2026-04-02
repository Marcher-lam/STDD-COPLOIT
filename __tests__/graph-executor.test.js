const GraphExecutor = require('../src/utils/graph-executor');

describe('GraphExecutor (反向图级自愈引擎)', () => {
  it('应该在线性执行中对下游节点的异常实施反向追踪，退回上一节点回炉，并最终自愈完成全链路', async () => {
    const executor = new GraphExecutor('feature', 'test-executor-1');
    
    // 注入：让 stdd-apply 节点故意发生业务级崩溃
    const initialInputs = {
      scope: 'payment-gateway',
      shouldFailOn: 'stdd-apply'
    };

    const finalState = await executor.runUntil('stdd-verify', initialInputs);

    // 成功自愈通过，没有阻断抛出
    expect(finalState.success).toBe(true);
    // 预期它必然会在发生错误后，收到了反向退回证据并清除了引发失败的变量，自愈到了最终态
    expect(finalState.generator).toBe('stdd-apply');
    expect(finalState.rollbackEvidence).toBeDefined();
    expect(finalState.rollbackEvidence.previousFailedNode).toBe('stdd-apply');
  });

  it('超过容错阈值的无法自愈错误应彻底熔断系统', async () => {
    const executor = new GraphExecutor('feature', 'test-executor-2');
    executor.maxRollbacks = 2; // 将熔断降低
    
    // 注入一个顽固级故障，即使回退也无法通过
    const initialInputs = { _persistentFailure: true };
    executor._executeNode = async (nodeName) => {
      if (nodeName === 'stdd-apply') throw new Error('Persistent compile error');
      return { success: true, nodeName };
    }

    await expect(executor.runUntil('stdd-verify', initialInputs)).rejects.toThrow(/System exhausted max rollbacks/);
  });
});
