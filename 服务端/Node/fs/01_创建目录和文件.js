const fs = require('fs');

// 异步创建目录
fs.mkdir(__dirname + '/异步目录', (err,data) => {
  if (err && err.code === 'EEXIST') return console.log('目录已存在');
  if (err) return console.log('创建目录失败：' + err);
  console.log('创建目录成功：' + data);
})

// 同步创建目录
// fs.mkdirSync(__dirname + '/同步目录');

// 异步创建和写入文件
fs.writeFile(__dirname + '/异步目录/file01.txt', '创建和写入文件', (err, data) => {
  if (err) return console.error('文件写入失败：', err);
  console.log('文件写入成功：' + data);
})

fs.writeFile(__dirname + '/异步目录/file02.txt', '创建和写入文件', (err, data) => {
  if (err) return console.error('文件写入失败：', err);
  console.log('文件写入成功：' + data);
})

fs.writeFile(__dirname + '/异步目录/file03.txt', '创建和写入文件', (err, data) => {
  if (err) return console.error('文件写入失败：', err);
  console.log('文件写入成功：' + data);
})

// 同步创建和写入文件
// fs.writeFileSync(__dirname + '/同步目录/file.txt', '创建和写入文件', { flag: 'w+' })
