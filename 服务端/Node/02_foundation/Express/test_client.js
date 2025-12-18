const http = require('http');

// 测试服务器的各种 body 处理功能

const hostname = 'localhost';
const port = 3000;

// 1. 测试 JSON 格式
function testJSON() {
  const postData = JSON.stringify({
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  });

  const options = {
    hostname: hostname,
    port: port,
    path: '/test/123',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('=== JSON 格式测试 ===');
      console.log('状态码:', res.statusCode);
      console.log('响应数据:', data);
      console.log('');
    });
  });

  req.on('error', (e) => {
    console.error('请求遇到问题:', e.message);
  });

  req.write(postData);
  req.end();
}

// 2. 测试表单格式
function testForm() {
  const postData = 'field1=value1&field2=value2';

  const options = {
    hostname: hostname,
    port: port,
    path: '/test/456',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('=== 表单格式测试 ===');
      console.log('状态码:', res.statusCode);
      console.log('响应数据:', data);
      console.log('');
    });
  });

  req.on('error', (e) => {
    console.error('请求遇到问题:', e.message);
  });

  req.write(postData);
  req.end();
}

// 3. 测试文本格式
function testText() {
  const postData = '这是一段测试文本数据';

  const options = {
    hostname: hostname,
    port: port,
    path: '/test/789',
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('=== 文本格式测试 ===');
      console.log('状态码:', res.statusCode);
      console.log('响应数据:', data);
      console.log('');
    });
  });

  req.on('error', (e) => {
    console.error('请求遇到问题:', e.message);
  });

  req.write(postData);
  req.end();
}

// 4. 测试二进制数据格式
function testBinary() {
  const postData = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // Hello

  const options = {
    hostname: hostname,
    port: port,
    path: '/test/101',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': postData.length
    }
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('=== 二进制格式测试 ===');
      console.log('状态码:', res.statusCode);
      console.log('响应数据:', data);
      console.log('');
    });
  });

  req.on('error', (e) => {
    console.error('请求遇到问题:', e.message);
  });

  req.write(postData);
  req.end();
}

// 运行所有测试
setTimeout(testJSON, 1000);      // 等待服务器启动
setTimeout(testForm, 2000);
setTimeout(testText, 3000);
setTimeout(testBinary, 4000);