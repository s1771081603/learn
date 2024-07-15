const fs = require("fs");
let fd;
// // 创建目录
// fs.mkdir("./text", (err) => {
//   if (err && err.code === 'EEXIST') return console.log('目标已存在');
//   if(err) return console.log(err);
// })

// // 重命名目录
// fs.rename("./text", "./text", (err) => {
//   if (err && err.code === 'ENOENT') return console.log('目录不存在');
//   if(err) return console.log(err);
// })

// // 删除目录
// fs.rmdir("./text", err => {
//   if (err && err.code === 'ENOENT') return console.log('目录不存在');
//   if (err) return console.log(err);
// })

// // 读取目录
// fs.readdir("./text", (err, data) => {
//   if (!err) return console.log(data);
//   console.log(err);
// })

// // 查看目录下文件的具体信息
// fs.stat("./text", (err, data) => {
//   console.log(data);
//   //是否是目录
//   // console.log(data.isDirectory());
//   //是否是文件
//   // console.log(data.isFile());
// })

// // 同步删除
// fs.readdir("./text", (err, data) => {
//   data.forEach(item => {
//     // 使用同步方法进行删除，以为嫩文件删除完才能删除目录
//     fs.unlinkSync(`./text/${item}`);
//   })
//   fs.rmdir("./text",(err)=>{console.log(err)});
// })

// 异步删除——基于Promise
// fs.readdir("./text", async (err, data) => {
//   console.log(data);
//   if (data) {
//     const arr = []
//     data.forEach(item => {
//       console.log(item);
//       // arr.at.push(fs.unlink(`./text/${item}`));
//     });
//     console.log(arr);
//     // await Promise.all(arr)
//     // await fs.rmdir("./text")
//   }
// })

//读取文件
// fs.readFile("./text/01_test.txt", (err, data) => {
//   console.log(data)
// })

// // 打开文件
// fd = fs.openSync('./text/01_test.txt', 'w');
// console.log(fd);

// // 异步打开文件
// fd = fs.open('./text/01_test.txt', 'w',(err,fd) => {
//   if (!err) {
//     console.log("open done");
//   } else {
//     console.log(err);
//   }
// });

// 向文件内部写入内容
// fd = fs.openSync('./text/01_test.txt', 'w')
// fs.writeSync(fd,"天气真不错");

// // 用来异步向文件内部写入内容
// fd = fs.open('./text/01_test.txt', 'w', (err,fd) => {
//   if (!err) {
//     fs.write(fd, "这是异步写入的内容", (err) => {
//       if (!err) return console.log("写入成功");
//     });
//   } else {
//     console.log(err);
//   }
// });

// 简单文件写入
// fs.writeFileSync(file, data[, options])
fs.writeFileSync("./text/01_test.txt", "简单写入1", { flag: "w" });
// fs.writeFile("./text/01_test.txt", "简单写入2", (err) => {
//   if (!err) console.log("写入成功")
// })


// 关闭文件
// fs.closeSync(fd)
// fs.close(fd)

console.log("程序执行结束!");
