const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

/**
 * request 对象
 *   - params：路由参数（如 /user/:id 中的 id）
 *   - query：查询字符串（如 /search?keyword=test）
 *   - body：POST 请求体（需 express.json() 或 body-parser 解析）
 *   - headers：请求头信息（如 req.headers['content-type']）
 *   - method：请求方法（GET/POST 等）
 *   - url：请求路径。
 *
 * response 响应对象
 *   - send()：发送任意类型响应（自动设置 Content-Type）
 *   - json()：发送 JSON 响应（常用作 API 响应）
 *   - status(code)：设置 HTTP 状态码
 *   - redirect(url)：重定向
 *   - render(view, data)：渲染模板引擎页面
 *   - sendFile(path)：发送文件
 *   - download(path, filename, options)：发送文件下载
 */

// 处理 JSON 格式请求体
app.use(express.json());

// 处理 URL 编码的请求体（表单数据）
app.use(express.urlencoded({ extended: true }));

// 处理纯文本格式请求体
app.use(express.text());

// 处理原始缓冲区数据
app.use(express.raw());

// 配置存储：指定文件保存目录（自动创建，需确保权限）
const upload = multer({ dest: "uploads/" }); // 临时存储（文件名将被哈希）

// 处理 POST 请求：上传一个名为 "avatar" 的文件 + 文本字段 "username"
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    success: true,
    body: req.body,
    file: req.file,
  });
});
app.post("/download", (req, res) => {
  const { filename, originalname, mimetype } = req.query;
  // res.download(__dirname + "/uploads/" + filename, originalname);

  res.setHeader("Content-Disposition", "attachment; filename=" + originalname);
  res.sendFile(
    __dirname + "/uploads/" + filename,
    { filename: originalname },
    (err) => {
      if (err) {
        res.status(err.status || 500).send("文件发送失败：" + err.message);
      }
    }
  );
});

// 统一路由处理各种格式的请求体
app.all("/test/:id", (req, res) => {
  const { body, headers } = req;
  const contentType = headers["content-type"];

  // 根据 Content-Type 判断 body 类型并处理
  let processedBody;
  if (contentType && contentType.includes("application/json")) {
    // JSON 格式
    processedBody = body;
  } else if (
    contentType &&
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    // 表单格式
    processedBody = body;
  } else if (contentType && contentType.includes("text/")) {
    // 文本格式
    processedBody = { text: body };
  } else {
    // 其他格式（如 raw 二进制数据）
    processedBody = {
      message: "Received binary data or unknown format",
    };
  }

  res.json({
    code: 200,
    message: "请求处理成功",
    contentType: contentType,
    receivedBody: processedBody,
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`Server listening at http://172.19.15.102:${port}`);
  console.log(`测试各种格式的 body 处理:`);
  console.log(`  POST /test/:id         - 通用 body 处理`);
  console.log(`  POST /upload           - 文件上传`);
  console.log(`  POST /wodnload         - 文件下载`);
});
