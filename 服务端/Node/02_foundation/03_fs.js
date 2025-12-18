const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

/**
 * 03_fs.js
 * 学习 Node.js 的 fs 模块：同步、回调、Promise/async、streams、watch 等示例
 *
 * 使用: node 03_fs.js
 */

const BASE = path.join(__dirname, "fs_demo"); // 示例目录

// 辅助：打印分隔
function sep(title, remarks) {
  console.log("\n===", title, "------", remarks, "===\n");
}

const syncExample = () => {
  sep("同步 API 示例（阻塞）");

  if (!fs.existsSync(BASE)) {
    sep(BASE, "创建目录");
    fs.mkdirSync(BASE);
  }
  const file = path.join(BASE, "sync.txt");
  // 写入（会覆盖）
  fs.writeFileSync(file, "Hello sync\n");
  // 追加
  fs.appendFileSync(file, "追加一行（sync）\n");
  fs.appendFileSync(file, "追加一行（sync）\n");
  // 读取
  const content = fs.readFileSync(file, "utf8");
  sep("sync.txt 内容:\n" + content, file);
};

const callbackExample = (done) => {
  sep("回调式异步 API 示例");
  const file = path.join(BASE, "callback.txt");
  fsp
    .mkdir(BASE, { recursive: true })
    .then(() => {
      fs.writeFile(file, "Hello callback\n", (err) => {
        if (err) return done(err);
        fs.appendFile(file, "追加一行（callback）\n", (err) => {
          if (err) return done(err);
          fs.readFile(file, "utf8", (err, data) => {
            if (err) return done(err);
            sep(data, "callback.text 内容");
            done();
          });
        });
      });
    })
    .catch(done);
};

const promiseExample = async () => {
  sep("Promise / async-await 示例");
  const dir = path.join(BASE, "promise");
  const file = path.join(dir, "promise.text");
  await fsp.mkdir(dir, { recursive: true });
  await fsp.writeFile(file, "Promise / async-await 示例\n");
  await fsp.appendFile(file, "追加一行（promise）\n");

  const data = await fsp.readFile(file, "utf-8");
  sep(data, "promise.text内容");

  const items = await fsp.readdir(BASE);
  console.log("BASE 目录下文件/文件夹:", items);
  const promise = await fsp.stat(file);
  console.log(
    "promise.txt 大小:",
    promise.size,
    "bytes",
    "是否文件:",
    promise.isFile()
  );
};

const streamsExample = async () => {
  sep("\n=== Streams 示例（pipe） ===\n");
  const src = path.join(BASE, "big_source.txt");
  const dest = path.join(BASE, "big_dest.txt");

  const lines = new Array(1000).fill("这是流写入的一行").join("\n") + "\n";

  await fsp.writeFile(src, lines.repeat(100), "utf8");
  const readStream = fs.createReadStream(src, { encoding: "utf8" });
  const writeStream = fs.createWriteStream(dest, { encoding: "utf8" });

  await new Promise((resolve, reject) => {
    readStream.pipe(writeStream);
    writeStream.on("finish", () => {
      console.log("pipe 完成: ", dest);
      resolve();
    });
    writeStream.on("error", reject);
    readStream.on("error", reject);
  });
};

const watchExample = () => {
  sep("watch 示例（按 Ctrl+C 结束监听）");
  const dir = path.join(BASE, "watch_dir");
  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) return console.error(err);
    const watcher = fs.watch(dir, (eventType, filename) => {
      console.log(`watch 事件: ${eventType}`, filename);
    });
    console.log("已开始监听:", dir);
    // 为示例写入一个文件触发事件（异步）
    setTimeout(() => {
      const file = path.join(dir, "note.txt");
      fs.writeFile(file, "触发 watch\n", (err) => {
        if (err) console.error(err);
      });
    }, 500);
    // 自动停止监听（示例）5秒后关闭
    setTimeout(() => {
      watcher.close();
      console.log("已停止监听");
    }, 1000);
  });
};

const removeAndRenameExample = async () => {
  sep("删除与重命名 示例");
  const src = path.join(BASE, "to_rename.txt");
  const renamed = path.join(BASE, "renamed.txt");

  await fsp.writeFile(src, "将被重命名\n");
  await fsp.rename(src, renamed);
  console.log("重命名完成:", renamed);

  await fsp.unlink(renamed);
  console.log("已删除:", renamed);
};

const cleanup = async () => {
  sep("清理 示例文件夹");
  // 递归删除 demo 目录
  await fsp.rm(BASE, { recursive: true, force: true });
  console.log("已移除目录:", BASE);
};

// 主流程
async function main() {
  try {
    syncExample();
    await new Promise((res, rej) =>
      callbackExample((err) => (err ? rej(err) : res()))
    );
    await promiseExample();
    await streamsExample();
    watchExample(); // 非阻塞：会在后台监听一段时间
    await removeAndRenameExample();
    // 最后可选清理：注释掉以保留示例文件
    // await cleanup();
    console.log("\n所有示例已完成");
  } catch (err) {
    console.error("示例发生错误:", err);
  }
}

main();
