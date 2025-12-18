// /d:/学习/learn/服务端/Node/02_foundation/02_callback.js
// 示例：回调、Promise、async/await 的用法与错误处理

// 模拟异步操作（Node 风格的 error-first 回调）
function fetchDataCallback(id, cb) {
  if (id == null) return cb(new Error("id 不能为 null/undefined"));
  if (id === 0) return cb(new Error("未找到资源: id=0"));
  cb(null, { id, name: `Item-${id}` });
}

// 使用回调并做错误处理（传统风格）
fetchDataCallback(1, (err, data) => {
  if (err) {
    console.error("[callback] 错误：", err.message);
    return;
  }
  console.log("[callback] 成功：", data);
});

// 将回调风格封装为 Promise（手动 promisify）
function fetchDataPromise(id) {
  return new Promise((resolve, reject) => {
    fetchDataCallback(id, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

// Promise 链式调用与错误处理
fetchDataPromise(2)
  .then((data) => {
    console.log("[promise.then] 成功：", data);
    // 在 then 中抛出错误会被后面的 catch 捕获
    if (data.id === 2) throw new Error("then 中模拟处理错误");
    return data;
  })
  .catch((err) => {
    console.error("[promise.catch] 捕获到错误：", err.message);
  });

// Promise.all：并行多个请求，任意一个拒绝都会进入 catch
Promise.all([fetchDataPromise(3), fetchDataPromise(0)])
  .then((results) => {
    console.log("[Promise.all] 所有成功：", results);
  })
  .catch((err) => {
    console.error("[Promise.all] 某个请求失败：", err.message);
  });

// 超时示例与 Promise.race：实现简单的超时控制
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("操作超时")), ms);
  });
}

Promise.race([fetchDataPromise(4), timeout(50)])
  .then((res) => console.log("[race] 结果：", res))
  .catch((err) => console.error("[race] 错误：", err.message));

// async/await：更直观的同步风格 + try/catch 捕获错误
async function runAsyncExamples() {
  try {
    const a = await fetchDataPromise(5);
    console.log("[async] 第一个请求：", a);

    // 并行执行并等待所有结果，异常会被捕获
    const ids = [6, 7, 0]; // 故意包含一个会失败的 id
    const promises = ids.map(fetchDataPromise);
    const results = await Promise.all(promises);
    console.log("[async] 并行结果：", results);
  } catch (err) {
    console.error("[async] 捕获到错误：", err.message);
  }

  // 单独处理每个异步任务的错误（不让一个失败影响其他）
  const safeIds = [8, 0, 9];
  const safePromises = safeIds.map((id) =>
    fetchDataPromise(id)
      .then((data) => ({ status: "fulfilled", data }))
      .catch((err) => ({ status: "rejected", reason: err.message }))
  );
  const settled = await Promise.all(safePromises);
  console.log("[async] 单独处理错误的结果：", settled);
}

// 运行 async 示例
runAsyncExamples().catch((err) =>
  console.error("runAsyncExamples 未捕获错误：", err)
);

/*
小结（代码内注释）：
- 回调：简单，但易陷入回调地狱；错误通过第一个参数传递（error-first）。
- Promise：解决回调链式问题，使用 .then/.catch 统一处理错误。
- async/await：基于 Promise，写法接近同步，配合 try/catch 捕获异步错误。
- 并行控制：Promise.all（有任一失败会 reject），Promise.race（先到先得）。
- 错误策略：可选择“快速失败”或“逐个处理并聚合结果”两种方式。
*/
