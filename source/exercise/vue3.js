// Proxy 可以拦截所有操作，不需要$set，支持全部数据格式，Map，懒收集，浏览器自带能力

// 1.双向存储，方便查找优化
function reactive() {}
// ------- 特殊的effect：基于effect实现的
function computed() {}
// ------- 依赖函数：如果有数据变化，先触发effect，再触发computed
function effect() {}

// ------- 构造固定格式的effect
function createReactiveEffect() {}

// -------- 执行effect
function run() {}

let effectStack = {}; // 存储effect
let targetMap = new WeakMap(); //
// ------- 收集依赖函数：
function track() {}
// ------- 数据变化后，通知更新，执行effect
function trigger() {}
