/**
 * Node.js 中的 Streams、Buffer 和二进制数据处理
 *
 * 本文件演示了以下几个核心概念：
 * 1. Buffer 的基本使用
 * 2. Stream 的不同类型和使用场景
 * 3. 二进制数据处理的实际应用
 */

const fs = require("fs");
const { Readable, Writable, Transform, pipeline } = require("stream");
const { promisify } = require("util");

// 将 pipeline 转换为 Promise 形式以便使用 async/await
const pipelineAsync = promisify(pipeline);

console.log("=== Node.js Streams、Buffer 和二进制处理演示 ===\n");

// 1. Buffer 基础操作
console.log("1. Buffer 基础操作:");
console.log("-------------------");

// 创建 Buffer 的不同方式
const buffer1 = Buffer.from("Hello, World!", "utf8");
const buffer2 = Buffer.alloc(10); // 分配一个长度为10的空Buffer
const buffer3 = Buffer.allocUnsafe(5); // 分配一个不安全的Buffer（可能包含旧数据）

console.log("buffer1 (from string):", buffer1);
console.log("buffer1.toString():", buffer1.toString());
console.log("buffer1.toJSON():", buffer1.toJSON());
console.log("buffer2 (allocated):", buffer2);
console.log("buffer3 (unsafe):", buffer3);

// Buffer 拼接
const combinedBuffer = Buffer.concat([buffer1, Buffer.from(" - Welcome!")]);
console.log("combinedBuffer:", combinedBuffer.toString());

// Buffer 比较
const bufA = Buffer.from("ABC");
const bufB = Buffer.from("ABD");
console.log("bufA compared to bufB:", bufA.compare(bufB));

console.log("\n");

// 2. Readable Stream（可读流）
console.log("2. Readable Stream 示例:");
console.log("------------------------");

// 创建一个自定义的可读流
class NumberStream extends Readable {
  constructor(options) {
    super(options);
    this.current = 0;
    this.max = 10;
  }

  _read() {
    if (this.current < this.max) {
      const number = this.current++;
      // push 数据到流中
      this.push(number.toString());
      this.push(",");
    } else {
      // 结束流
      this.push(null);
    }
  }
}

const numberStream = new NumberStream();
let readableOutput = "";

numberStream.on("data", (chunk) => {
  readableOutput += chunk;
  console.log("读取到数据块:", chunk.toString());
});

numberStream.on("end", () => {
  console.log("可读流结束，完整数据:", readableOutput.slice(0, -1)); // 移除最后一个逗号
});

console.log("\n");

// 3. Writable Stream（可写流）
console.log("3. Writable Stream 示例:");
console.log("-------------------------");

// 创建一个自定义的可写流
class CustomWritable extends Writable {
  constructor(options) {
    super(options);
    this.data = [];
  }

  _write(chunk, encoding, callback) {
    this.data.push(chunk);
    // 模拟异步操作
    setTimeout(callback, 10);
  }

  getData() {
    return Buffer.concat(this.data).toString();
  }
}

const writableStream = new CustomWritable();

// 写入数据到流
writableStream.write("第一行数据\n");
writableStream.write("第二行数据\n");
writableStream.end("最后一行数据\n");

writableStream.on("finish", () => {
  console.log(writableStream.getData());
});

console.log("\n");

// 4. Transform Stream（转换流）
console.log("4. Transform Stream 示例:");
console.log("--------------------------");

// 创建一个转换流，将输入转换为大写
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    // 将数据块转换为大写并推送出去
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const upperCaseTransform = new UpperCaseTransform();

upperCaseTransform.on("data", (chunk) => {
  console.log("转换后的数据:", chunk.toString());
});

upperCaseTransform.write("hello ");
upperCaseTransform.write("world!");
upperCaseTransform.end();

console.log("\n");

// 5. Pipeline（管道）的使用
console.log("5. Pipeline 示例:");
console.log("------------------");

// 创建一个可读流，读取字符串
const readable = new Readable({
  read() {
    this.push("这是一个用于演示pipeline的示例文本。\n");
    this.push(null); // 结束流
  },
});

// 创建一个转换流，添加前缀
const prefixTransform = new Transform({
  transform(chunk, encoding, callback) {
    const prefixedChunk = `[PREFIX] ${chunk}`;
    callback(null, prefixedChunk);
  },
});

// 创建一个可写流，输出到控制台
const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log("Pipeline 输出:", chunk.toString());
    callback();
  },
});

// 使用 pipeline 连接流
pipelineAsync(readable, prefixTransform, writable)
  .then(() => console.log("Pipeline 执行完成"))
  .catch((err) => console.error("Pipeline 错误:", err));

console.log("\n");

// // 6. 文件操作中的 Stream 和 Buffer
// console.log("6. 文件操作中的 Stream 和 Buffer:");
// console.log("-----------------------------------");

// // 创建一个示例文件用于演示
// const sampleData =
//   "这是一个示例文件的内容。\n它包含多行文本。\n用于演示文件流操作。";
// fs.writeFileSync("sample.txt", sampleData, "utf8");

// // 使用流读取文件
// const fileReadStream = fs.createReadStream("sample.txt", { encoding: "utf8" });

// fileReadStream.on("data", (chunk) => {
//   console.log("读取文件数据块:");
//   console.log(chunk);
// });

// fileReadStream.on("end", () => {
//   console.log("文件读取完成\n");
// });

// // 使用流写入文件
// const fileWriteStream = fs.createWriteStream("output.txt");

// fileWriteStream.write("第一行输出\n");
// fileWriteStream.write("第二行输出\n");
// fileWriteStream.end("最后一行输出\n");

// fileWriteStream.on("finish", () => {
//   console.log("文件写入完成，内容已保存到 output.txt\n");
// });

// // 7. 二进制数据处理
// console.log("7. 二进制数据处理:");
// console.log("-------------------");

// // 创建一个包含二进制数据的 Buffer
// const binaryBuffer = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello" 的 ASCII 码
// console.log("二进制 Buffer:", binaryBuffer);
// console.log("转换为字符串:", binaryBuffer.toString());

// // 读取图片或其他二进制文件示例（如果存在）
// try {
//   // 如果有图片文件可以读取，这里会演示二进制处理
//   // 注意：这只是一个示例，实际环境中需要有相应的文件
//   console.log("二进制文件处理通常用于:");
//   console.log("- 图片处理");
//   console.log("- 音频/视频处理");
//   console.log("- 文件上传下载");
//   console.log("- 加密解密操作");
// } catch (err) {
//   console.log("没有找到图片文件进行二进制处理演示");
// }

// console.log("\n");

// // 8. 流的背压（Backpressure）处理
// console.log("8. 流的背压处理:");
// console.log("-----------------");

// // 创建一个快速的可读流和一个慢速的可写流来演示背压
// const fastReadable = new Readable({
//   read() {
//     // 快速产生数据
//     for (let i = 0; i < 100; i++) {
//       this.push(`数据项 ${i}\n`);
//     }
//     this.push(null); // 结束
//   },
// });

// const slowWritable = new Writable({
//   write(chunk, encoding, callback) {
//     // 模拟慢速写入操作
//     setTimeout(() => {
//       console.log("写入:", chunk.toString().trim());
//       callback();
//     }, 50); // 故意设置较慢的速度
//   },
// });

// // 使用 pipeline 自动处理背压
// pipelineAsync(fastReadable, slowWritable)
//   .then(() => console.log("背压处理演示完成"))
//   .catch((err) => console.error("背压处理错误:", err));

// console.log("\n=== 演示结束 ===");

// // 清理创建的临时文件
// setTimeout(() => {
//   try {
//     fs.unlinkSync("sample.txt");
//     fs.unlinkSync("output.txt");
//     console.log("\n临时文件已清理");
//   } catch (err) {
//     // 忽略删除错误
//   }
// }, 2000);
