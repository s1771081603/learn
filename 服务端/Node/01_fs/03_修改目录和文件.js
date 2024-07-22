const fs = require('fs');

// 修改目录名
// fs.rename(__dirname + "/异步目录", __dirname + "/异步目录", (err, data) => {
//   if (err && err.code === 'ENOENT') return console.log('目录不存在');
//   if (err) return console.log(err);
//   console.log(data);
// })

/**
 * 流式文件写入
 */
file = fs.createWriteStream(__dirname + '/异步目录/file01.txt');
// 写内容
file.write("可写流写入\n")
file.write("不会被覆盖")
// 关闭流
file.end()