const http = require('http')
// import http from "node:http";

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.end('Hello World \n Node.js')
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
