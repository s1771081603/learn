// 1. 引入 express 
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规则
//  request 是对请求报文的封装，response是对响应报文的封装
app.get('/server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send("HELLO AJAX GET");
})
app.post('/server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send("HELLO AJAX POST");
})

// json
app.all('/json-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 相应数据
  let data = {
    name: 'songlisheng'
  };
  // 设置响应体
  response.send(JSON.stringify(data));
})

// ie
app.get('/ie-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send('HELLO AJAX IE');
})

// delay
app.get('/delay-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  setTimeout(() => {
    response.send('HELLO AJAX DELAY');
  }, 3000);
  // response.send('HELLO AJAX DELAY');
})

// delay
app.get('/delay-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  setTimeout(() => {
    response.send('HELLO AJAX DELAY');
  }, 3000);
  // response.send('HELLO AJAX DELAY');
})

// axios
app.get('/axios-get-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send('HELLO AJAX AXIOS GET');
})
app.post('/axios-post-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send(JSON.stringify({
    name: 'HELLO AJAX AXIOS POST',
    lastName: 'songlisheng'
  }));
})
app.all('/axios-all-server',(request,response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  // 设置响应体
  response.send('HELLO AJAX AXIOS ALL');
})


// 4. 监听端口启动服务
app.listen(8000,() => {
  console.log("服务已启动，8000 端口监听中...");
})