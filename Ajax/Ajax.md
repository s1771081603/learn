# AJAX 课程
## 第一章：原生AJAX
### 1.1 AJAX 简介
```
AJAX 全称 Asynchronous（艾森亏乃思） JavaScript And XML，就是异步的 JavaScript 和 XML。
通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。
AJAX 不是编程语言，而是一种将现有的标准组合在一起的新方式。
```

### 1.2 XML 简介
```
XML 可扩展标记语言。
XML 被设计用来传输和存储数据。
XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，全部都是自定义标签，用来表示一些数据。
```

### 1.3 AJAX 的特点
#### 1.3.1 AJAX 的优点
```
1）可以无需刷新页面从而与服务器进行通信。
2）允许你根据用户事件来更新部分内容。
```

#### 1.3.2 AJAX 的缺点
```
1）没有历史浏览，不能回退。
2）存在跨域问题（浏览器的同源策略）。
3）SEO 不友好。
```

## 第二章 HTTP 协议
```
HTTP （hypertext transport protocol） 协议【超文本传输协议】，协议详情规定了浏览器和万维网服务器之间的相互通信的规则。
```

### 请求报文
重点是格式和参数
```
行        GET、POST... ，/url ，HTTP/1.1 
头        Host: atguigu.com
          Cookie: name = guigu
          Content-type: application/x-www-form-urlencoded
          User-Agent: chrome 83
空行
体
```
### 响应报文
```
行        HTTP/1.1 ,200 ,OK
头        Content-Type: text/html;charset=utf-8
          Content-length: 2048
          Content-encoding: gzip
空行
体
```

