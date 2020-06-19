// Proxy 可以拦截所有操作，不需要$set，支持全部数据格式，Map，懒收集，浏览器自带能力

const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key);
    // 依赖收集
    track(target, key);
    // 复杂数据类型，递归调用
    return typeof res === "object" ? reactive(res) : res;
  },
  set(target, key, value) {
    //   通知更新
    console.log(
      `${target}中的${key}更新了，从${Reflect.get(target, key)}变成了${value}`
    );
    trigger(target, key, value);
    Reflect.set(target, key, value);
  },
};

// 1.双向存储，方便查找优化
function reactive(target) {
  // Vue3还需要考虑Map这些对象，这里只考虑对象
  const observed = new Proxy(target, baseHandler);
  //   返回proxy代理后的对象
  return observed;
}
// ------- 特殊的effect：基于effect实现的
function computed(fn) {
  // lazy:true,表示首次不执行，只有数据更新才触发执行
  let runner = effect(fn, { computed: true, lazy: true });
  return {
    effect: runner,
    get value() {
      return runner();
    },
  };
}
// ------- 依赖函数：如果有数据变化，先触发effect，再触发computed
function effect(fn, options = {}) {
  let e = createReactiveEffect(fn, options);
  //   首次调用不执行lazy的数据
  if (!options.lazy) {
    e(); // 此时会执行到run中的内容
  }
  return e;
}

// ------- 构造固定格式的effect,返回值为一个配置化了的effect 函数（注意是函数，本质还是函数只不过是被配置化了）
function createReactiveEffect(fn, options) {
  const effect = function effect(...args) {
    return run(effect, fn, args); // 传入的是执行的effect
  };
  effect.deps = [];
  effect.computed = options.computed;
  effect.lazy = options.lazy;
  console.log("createReactiveEffect==中的==effect的值：", effect);
  return effect;
}

// -------- 执行effect
function run(effect, fn, args) {
  // 去依赖函数中取
  if (effectStack.indexOf(effect) === -1) {
    //   ??为什么要try？
    try {
      effectStack.push(effect);
      return fn(...args);
    } finally {
      effectStack.pop();
      console.log("effectStack===", effectStack);
    }
  }
}

let effectStack = []; // 存储依赖函数
// 收集依赖的map
/**
 *结构如下：
 {
     target: {
         key1: [包装后的依赖函数effect1,包装后的依赖函数effect1],
         key2: [包装后的依赖函数effect1,包装后的依赖函数effect1]
     }
 }
 */
let targetMap = new WeakMap();
// ------- 收集依赖函数：
function track(target, key) {
  console.log(key);
  // 先取依赖函数
  let effect = effectStack[effectStack.length - 1]; // ??? 为什么是effectStack.length-1
  if (effect) {
    // 初始化当前依赖项
    let depTarget = targetMap.get(target);
    if (!targetMap.has(target)) {
      depTarget = new Map();
      targetMap.set(target, depTarget);
    }
    let depKey = depTarget.get(key);
    if (!depTarget.has(key)) {
      depKey = new Set();
      depKey.add(key);
    }
    // 开始收集
    if (!depKey.has(effect)) {
      depKey.add(effect);
      // TODO 为什么是effect.deps??
      effect.deps.push(depKey);
    }
    debugger;
  }
}
// ------- 数据变化后，通知更新，执行effect
function trigger(target, key, info) {
  // 1.找到依赖
  const depMap = targetMap.get(target);
  if (!targetMap.has(target)) {
    return;
  }
  // 2.执行所有依赖函数
  let effects = new Set();
  let computedRunners = new Set();
  if (key) {
    let deps = depMap.get(key);
    deps.forEach((effect) => {
      if (effect.computed) {
        computedRunners.add(effect);
      } else {
        effects.add(effect);
      }
    });
    effects.forEach((effect) => effect());
    computedRunners.forEach((computed) => computed());
  }
}
