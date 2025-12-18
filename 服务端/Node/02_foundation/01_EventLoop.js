/*
 * JavaScript Event Loop 和异步模型详解
 *
 * JavaScript 是单线程语言，但通过 Event Loop 实现了异步非阻塞 I/O 操作。
 * 理解 Event Loop 对于编写高效、无阻塞的 JavaScript 代码至关重要。
 */

// 1. 同步代码示例
console.log("=== 1. 同步代码执行 ===");
console.log("第一步：同步代码");
console.log("第二步：同步代码");

// 2. 异步回调示例
console.log("\n=== 2. 异步回调示例 ===");
setTimeout(() => {
  console.log("第三步：异步回调 - setTimeout");
}, 0);

console.log("第四步：同步代码继续执行");

// 3. Promise 示例
console.log("\n=== 3. Promise 示例 ===");
Promise.resolve().then(() => {
  console.log("第五步：微任务 - Promise");
});

console.log("第六步：同步代码继续执行");

// 4. 多个异步操作的执行顺序
console.log("\n=== 4. 多个异步操作的执行顺序 ===");

// 宏任务
setTimeout(() => {
  console.log("第七步：宏任务 - setTimeout 1");
}, 0);

// 微任务
Promise.resolve().then(() => {
  console.log("第八步：微任务 - Promise 1");
});

// 另一个微任务
Promise.resolve().then(() => {
  console.log("第九步：微任务 - Promise 2");
});

// 另一个宏任务
setTimeout(() => {
  console.log("第十步：宏任务 - setTimeout 2");
}, 0);

console.log("第十一步：同步代码结束");

// 5. 更复杂的示例：嵌套的异步操作
console.log("\n=== 5. 嵌套的异步操作 ===");

setTimeout(() => {
  console.log("第十二步：外部 setTimeout");

  Promise.resolve().then(() => {
    console.log("第十三步：在 setTimeout 中的 Promise");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("第十四步：外部 Promise");

  setTimeout(() => {
    console.log("第十五步：在 Promise 中的 setTimeout");
  }, 0);
});

// 6. async/await 示例
console.log("\n=== 6. async/await 示例 ===");

async function asyncFunction() {
  console.log("第十六步：进入 async 函数");

  await Promise.resolve().then(() => {
    console.log("第十七步：await 中的微任务");
  });

  console.log("第十八步：async 函数中的后续代码");
}

asyncFunction();
console.log("第十九步：同步代码继续执行");

// 7. 阻塞示例（请谨慎运行）
console.log("\n=== 7. 阻塞示例对比 ===");
console.log("接下来会有一个阻塞操作演示，请等待几秒...");

// 模拟一个阻塞操作
const startTime = Date.now();
while (Date.now() - startTime < 3000) {
  // 空循环，阻塞大约3秒钟
}

console.log("第二十步：阻塞操作完成，继续执行");

// 8. 实际应用示例：并发请求处理
console.log("\n=== 8. 实际应用：模拟并发请求处理 ===");

function fakeAPIRequest(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`响应来自 ${name}`);
    }, delay);
  });
}

async function handleRequests() {
  console.log("第二十一步：开始处理请求");

  // 并行处理多个请求
  const request1 = fakeAPIRequest("API 1", 0);
  const request2 = fakeAPIRequest("API 2", 0);
  const request3 = fakeAPIRequest("API 3", 0);
  console.log("第二十二步：所有请求完成", request1, request2, request3);

  // 等待所有请求完成
  const results = await Promise.all([request1, request2, request3]);
  console.log("第二十三步：所有请求完成", results);
}

handleRequests();

Promise.resolve().then(() => {
  console.log("第二十四步：同步代码继续执行");
  setTimeout(() => {
    console.log("第二十五步：宏任务中的同步代码");
    Promise.resolve().then(() => {
      console.log("第二十六步：微任务中的同步代码");
    });
    setTimeout(() => {
      console.log("第二十七步：宏任务中的宏任务");
    }, 0);
  }, 0);
  Promise.resolve().then(() => {
    console.log("第二十八步：微任务中的同步代码");
    setTimeout(() => {
      console.log("第二十九步：微任务中的宏任务");
    }, 0);
    Promise.resolve().then(() => {
      console.log("第三十步：微任务中的微任务");
    });
  });
});

/*
 * Event Loop 执行规则总结：
 *
 * 1. Call Stack（调用栈）
 *    - 存放同步代码执行的地方
 *    - 遵循 LIFO（后进先出）原则
 *
 * 2. Callback Queue（回调队列）
 *    - 存放宏任务回调函数的地方
 *    - 包括：setTimeout, setInterval, DOM 事件等
 *    - 遵循 FIFO（先进先出）原则
 *
 * 3. Microtask Queue（微任务队列）
 *    - 存放微任务回调函数的地方
 *    - 包括：Promise.then/catch/finally, queueMicrotask, MutationObserver 等
 *    - 优先级高于宏任务
 *
 * 4. Event Loop 运行机制
 *    - 执行调用栈中的所有同步代码
 *    - 检查微任务队列，执行所有微任务
 *    - 执行一个宏任务（如果有的话）
 *    - 重复上述过程
 *
 * 执行顺序：
 * 1. 同步代码
 * 2. 微任务（Microtasks）
 * 3. 宏任务（Macrotasks）
 *
 * 常见误区：
 * - 以为 setTimeout(fn, 0) 会立即执行
 * - 不理解微任务优先于宏任务执行
 * - 在循环中频繁操作 DOM 导致性能问题
 */
