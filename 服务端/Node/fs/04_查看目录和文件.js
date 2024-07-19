const fs = require('fs');

//  读取目录
// fs.readdir(__dirname + '/异步目录', (err,data) => {
//   if (err) return console.log(err);
//   console.log(data);
// })

 // 查看目录下文件的具体信息
// fs.stat(__dirname + "/异步目录/file01.txt", (err, data) => {
//   console.log(data);
//   //是否是目录
//   console.log(data.isDirectory());
//   //是否是文件
//   console.log(data.isFile());
// })

// 异步读取文件
// fs.readFile(__dirname + '/异步目录/file01.txt', 'utf-8', (err, data) => {
//   if (err) return console.log(err);
//   console.log('异步读取文件:' + data);
//   const newStr = data.toString().replace(/=/g, ':').replace(/ /g, '\n')
//   fs.writeFile(__dirname + '/异步目录/file02.txt', newStr, (err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
//   });
// });

// 异步打开文件
// fs.open(__dirname + '/异步目录/file01.txt', 'w+', (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

// 同步打开文件
// fs.openSync(__dirname + '/同步目录/file.txt', 'w+');

// 同步验证路径是否存在
// fs.exists(__dirname + '/异步目录/file01.txt', (data) => {
//   console.log(data);
// })

// 异步验证路径是否存在
// fs.existsSync(__dirname + '/异步目录/file01.txt');

// 监视文件更改写入
// fs.watchFile(filename[, options], listener)
// fs.watchFile(__dirname + '/异步目录/file01.txt', (prev, curr) => {
//     console.log("修改前文件的大小：" + prev.size)
//     console.log("修改后文件的大小：" + curr.size)
// })