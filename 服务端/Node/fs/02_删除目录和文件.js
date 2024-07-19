const fs = require('fs');

// 异步删除目录
// fs.rmdir(__dirname + '/异步目录', (err, data) => {
//   if (err) {
//     if (err.code === 'ENOENT') return console.log('目录不存在');
//     return console.log(err);
//   }
//   console.log(data);
// })

// 同步删除目录
// fs.rmdirSync(__dirname + '/同步目录');

// 异步删除文件
// fs.unlink(__dirname + '/异步目录/file01.txt', (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

// 同步删除文件
// fs.unlinkSync(__dirname + '/异步目录/file01.txt');

// 同步关闭文件
// fs.closeSync(file);

// 异步关闭文件
// fs.close(file);

// 删除目录及文件
// fs.readdir(__dirname + '/异步目录', (err, data) => {
//   if (err) return console.log(err);
//   if (data && data.length > 0) {
//     data.forEach(item => {
//       fs.unlinkSync(__dirname + `/异步目录/${item}`);
//     })
//   }
//   fs.rmdir(__dirname + '/异步目录', (err, data) => {
//     if (err) return console.log(err);
//     console.log(data);
//   })
// })

// fs.readdir(__dirname + '/异步目录', async (err, data) => {
//   if (data) {
//     const arr = []
//     data.forEach(item => {
//       const itemUnlinkSync = new Promise((resolve, reject) => {
//         fs.unlink(__dirname + `/异步目录/${item}`, (err, data) => {
//           if (err) {
//             reject();
//             return console.log(err);
//           } else{
//             resolve();
//             console.log(data);
//           }
//         })
//       });
//       arr.push(itemUnlinkSync);
//     });
//     await Promise.all(arr)
//     await fs.rmdir(__dirname + "/异步目录", (err, data) => {
//       if (err) return console.log(err);
//       console.log(data);
//     });
//   }
// })

fs.readdir(__dirname + '/异步目录', async (err, data) => {
  if (err) return console.log(err);
  if (data && data.length > 0) {
    data.forEach(async item => {
      await fs.unlink(__dirname + `/异步目录/${item}`, (err, data) => {
        if (err) return console.log(err);
      })
    });
  }
  await fs.rmdir(__dirname + "/异步目录", (err, data) => {
    if (err) return console.log(err);
  });
})