const path = require('path');
// 获取中的文件名
console.log(path.basename(path.join(__dirname, '../fs/异步目录/看的.txt'))); // 看的.txt
console.log(path.basename(path.join(__dirname, '../fs/异步目录/测试.html'))); // 测试.html
console.log(path.basename(path.join(__dirname, '../fs/异步目录/测试.html'), '.html')); // 测试