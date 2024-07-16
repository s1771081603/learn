const fs = require("fs");
let file;
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
// file = fs.openSync('./text/01_test.txt', 'w');
// console.log(file);

// // 异步打开文件
// file = fs.open('./text/01_test.txt', 'w',(err,file) => {
//   if (!err) {
//     console.log("open done");
//   } else {
//     console.log(err);
//   }
// });

// 向文件内部写入内容
// file = fs.openSync('./text/01_test.txt', 'w')
// fs.writeSync(file,"天气真不错");

// // 用来异步向文件内部写入内容
// file = fs.open('./text/01_test.txt', 'w', (err,file) => {
//   if (!err) {
//     fs.write(file, "这是异步写入的内容", (err) => {
//       if (!err) return console.log("写入成功");
//     });
//   } else {
//     console.log(err);
//   }
// });

// 简单文件写入
// fs.writeFileSync(file, data[, options])
// fs.writeFileSync("./text/01_test.txt", "简单写入1", { flag: "w" });
// fs.writeFile("./text/01_test.txt", "简单写入2", (err) => {
//   if (!err) console.log("写入成功")
// })

/**
 * 文件写入的特点
 * 即 w 模式的特点：打开文件用于写操作，如果不存在则创建，如果存在则覆盖文件原本内容
 */

/**
 * 文件的打开状态
 * 
 * r        读取文件，文件不存在则出现异常
 * r+       读写文件，文件不存在则出现异常
 * rs       在同步模式下打开文件用于读取
 * rs+      在同步模式下打开文件用于读取
 * w        打开文件用于写操作，如果不存在则创建，如果存在则截断
 * wx       打开文件用于写操作,如果存在则打开失败
 * w+       打开文件用于读写,如果不存在则创建,如果存在则截断
 * wx+      打开文件用于读写,如果存在则打开失败
 * a        打开文件用于追加,如果不存在则创建
 * ax       打开文件用于追加,如果路径存在则失败
 * a+       打开文件进行读取和追加,如果不存在则创建该文件
 * ax+      打开文件进行读取和追加,如果路径存在则失败
 */

/**
 * 流式文件写入
 */
file = fs.createWriteStream("./text/01_test.txt")
// 写内容
file.write("可写流写入\n")
file.write("不会被覆盖")
// 关闭流
file.end()
// 不能用file.close()


/**
 * 监听流的open和close时间来监听流的打开和关闭
 * on是绑定长期有限的事件，once是绑定一次性事件
 */
// file.once("open", () => {
//    console.log("流打开了")
// })
// file.on("close", () => {
//    console.log("流关闭了")
// })


/**
 * 文件的读取
 */
// 同步文件读取
// fs.readSync
// file = fs.readFileSync('./text/01_test.txt', [{
//   flag: 'w'
// }]);
// console.log(file);

// 异步文件读取
// fs.read
// fs.readFile("./text/01_test.txt", (err,data) => {
//   if (!err) console.log(data.toString());
// })

// 流式文件读取
// file = fs.createReadStream("./text/01_test.txt")
// // 如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕，它会自动开始读取数据
// file.on("data", (data) => {
//    console.log(data)
// })
// file.once("open", () => {
//    console.log("流打开了")
// })
// file.on("close", () => {
//    console.log("流关闭了")
// })

// var rs = fs.createReadStream("./text/01_test.txt")
// var ws = fs.createWriteStream("./text/02_test.txt")
// // 如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕，它会自动开始读取数据
// rs.on("data", (data) => {
//   ws.write(data)
// })
// rs.once("open",function (){
//    console.log("可读流打开了")
// })
// rs.on("close",function (){
//     console.log("可读流关闭了")
//     // 挂壁
//     ws.end()
// })
// ws.once("open",function (){
//    console.log("可写流打开了")
// })
// ws.on("close",function (){
//    console.log("可写流关闭了")
// })
// // 简单写法
// var rs = fs.createReadStream("./text/01_test.txt")
// var ws = fs.createWriteStream("./text/02_test.txt")
// rs.pipe(ws)

// 删除文件
// fs.unlink("./text/02_test.txt", err => {
//   console.log(err)
// })

/**
 * 其他操作
 */
// 1、验证路径是否存在
// fs.exists('./text/01_test.txt', (data) => {
//   console.log(data);
// })
// console.log(fs.existsSync('./text/01_test.txt'));
// 2、获取文件信息：
// console.log(fs.statSync("./text/01_test.txt"));
// fs.stat("./text/01_test.txt", (err,stat) => {
//   console.log(stat)
// })
// 3、删除文件
// fs.unlink("./text/02_test.txt", err => {
//   console.log(err);
// })
// console.log(fs.unlinkSync("./text/02_test.txt"));
// 4、列出文件
// fs.readdir(path[, options], callback)
// fs.readdir('./text', {flag: 'w'}, (err, files) => {
//   if (!err) return console.log(files);
//   console.log(err);
// })
// console.log(fs.readdirSync('./text', { flag: 'w' }));
// 5、截断文件
// fs.truncate(path, len, callback)
// fs.truncateSync(path, len)
// fs.truncate("./text/02_test.txt", 5, (err, data) => {
//   if (!err) {
//     return console.log(data);
//   }
//   console.log(err);
// })
// console.log(fs.truncateSync("./text/02_test.txt", 8));
// 6、建立目录
// fs.mkdir(path[, mode], callback)
// fs.mkdirSync(path[, mode])
// 7、删除目录
// fs.rmdir(path, callback)
// fs.rmdirSync(path)
// 8、重命名文件和目录
// fs.rename(oldPath, newPath, callback)
// fs.renameSync(oldPath, newPath)
// 9、监视文件更改写入
// fs.watchFile(filename[, options], listener)
// fs.watchFile("./text/02_test.txt",function (prev,curr){
//     console.log("修改前文件的大小：" + prev.size)
//     console.log("修改后文件的大小："+curr.size)
// })

// 关闭文件
// fs.closeSync(file);
// fs.close(file);

console.log("程序执行结束!");
