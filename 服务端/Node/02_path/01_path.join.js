const fs = require('fs')
const path = require('path');

// 路径拼接
console.log(path.join('/a', '/b/c', '../')); // /a/b/
console.log(path.join('/a', '/b/c', '../../')); // /a/
console.log(path.join('/a', '/b/c', '../../', '/d', '/e')); // /a/d/e
console.log(path.join('/a', '/b/c', '../../', '/d', '/e', '../')); // /a/d/

fs.readFile(path.join(__dirname, '../fs/异步目录/file01.txt'), 'utf-8', (err, data) => {
  if (err) { 
    return console.log(err.message);
  }
  console.log(data);
})