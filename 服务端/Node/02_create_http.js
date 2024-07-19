const http = require("http");

// const port = 8888;
// // http.createServer((request, response) => {
// //   response.writeHead(200, { 'Content-type': 'text/plain' });
// //   response.end('Hello World \n Node.js')
// // }).listen(port, hostname);

// // 终端打印如下信息
// // console.log('Server running at http://127.0.0.1:/8888');

// const Server = http.createServer((request,response) => {
//   response.writeHead(200, { 'Content-type': 'text/plain' });
//   response.end("Hello World \n Node.js");
//   console.log(request,response);
// });

// Server.listen(port, () => {
// });

// http
//   .createServer((request, response) => {
//     const { headers, method, url } = request;
//     let body = [];
//     request
//       .on('error', err => {
//         console.error(err);
//       })
//       .on('data', chunk => {
//         body.push(chunk);
//       })
//       .on('end', () => {
//         body = Buffer.concat(body).toString();
//         response.on('error', err => {
//           console.error(err);
//         });

//         response.writeHead(200, {
//           'Content-Type': 'application/json',
//           'X-Powered-By': 'bacon',
//         });
//         response.write('<html>');
//         response.write('<body>');
//         response.write('<h1>Hello, World!</h1>');
//         response.write('</body>');
//         response.write('</html>');
//         response.end();
//       });
//   })
//   .listen(8080);

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        response.on('error', err => {
          console.error(err);
        });

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        const responseBody = { headers, method, url, body };
        response.write(JSON.stringify(responseBody));
        response.end();
      });
  })
  .listen(8081);

