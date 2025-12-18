/**
 * 为什么 JavaScript 可以在浏览器中被执行
 * 1. JavaScript 引擎的存在
 *  - 每个主流浏览器都内置了一个 JavaScript 引擎，专门负责解析和执行 JavaScript 代码：
 *    - Chrome：使用 V8 引擎
 *    - Firefox：使用 SpiderMonkey 引擎
 *    - Safari：使用 JavaScriptCore 引擎
 *    - 旧版 IE：使用 Chakra 引擎
 *    - 这些引擎是专门设计用来解释和执行 JavaScript 代码的程序。
 *
 * 2. 浏览器的解析和执行机制
 *  - 当浏览器加载网页时，会按照以下步骤处理 JavaScript：
 *    - HTML 解析：浏览器首先解析 HTML 文档，构建 DOM 树
 *    - 遇到 script 标签：当解析到 <script> 标签时，浏览器会暂停 HTML 解析
 *    - JavaScript 执行：JavaScript 引擎开始执行 JavaScript 代码
 *    - 继续解析：执行完成后，浏览器继续解析剩余的 HTML
 *
 * 3. DOM API 的支持
 *  - 浏览器不仅提供 JavaScript 引擎，还提供丰富的 DOM（文档对象模型）API，让 JavaScript 能够：
 *    - 操作网页内容和结构
 *    - 修改样式和布局
 *    - 处理用户事件（点击、键盘输入等）
 *    - 发送网络请求
 *
 * * 4. 事件驱动模型
 *  - 浏览器实现了事件驱动的编程模型，使得 JavaScript 能够响应各种交互：
 *    - 用户交互事件（点击、滚动、按键等）
 *    - 网络事件（如 Ajax 请求完成）
 *    - 定时器事件（如 setTimeout、setInterval）
 *    - 页面生命周期事件（如加载完成、卸载等）
 *
 *  5. 事件循环机制
 *  - JavaScript 是单线程的，但浏览器通过事件循环机制来处理异步操作：
 *    - 当 JavaScript 执行时，如果遇到异步操作（如网络请求、定时器等），它会将这些操作放入任务队列中。
 *    - 当当前执行栈清空后，浏览器会从任务队列中取出下一个任务执行。
 *    - 这种机制允许 JavaScript 在处理用户交互和其他事件时保持响应性。
 *
 * 6. JavaScript 的设计目标
 *  - JavaScript 作为一种脚本语言，设计之初就考虑了在浏览器环境中运行：
 *    - 轻量级：JavaScript 代码通常较小，适合快速加载和执行
 *    - 动态性：JavaScript 支持动态类型和动态修改对象，适合处理网页内容的变化
 *    - 事件驱动：JavaScript 的事件驱动模型使得它非常适合处理用户交互
 *
 * 7. 总结
 *  - 总的来说，JavaScript 能在浏览器中运行是因为：
 *    - 浏览器内置了专门的 JavaScript 引擎来解析和执行代码
 *    - 浏览器提供了完整的 DOM API 供 JavaScript 调用
 *    - 浏览器实现了事件循环机制来处理异步操作
 *    - JavaScript 语言本身被设计为轻量级的脚本语言，适合在浏览器环境中运行
 */

/**
 * JavaScript 运行在浏览器中的流程
 * 1. 浏览器加载网页
 * 2. 解析 HTML 文档，构建 DOM 树
 * 3. 遇到 script 标签，暂停 HTML 解析，开始执行 JavaScript 代码
 * 4. JavaScript 引擎开始执行 JavaScript 代码
 * 5. 遇到异步操作（如网络请求、定时器等），将这些操作放入任务队列中
 * 6. 当当前执行栈清空后，浏览器会从任务队列中取出下一个任务执行
 * 7. JavaScript 引擎执行完成后，继续解析剩余的 HTML
 * 8. 浏览器继续解析剩余的 HTML
 * 9. 浏览器将 DOM 树中的内容渲染到页面中
 * 10. 浏览器将 JavaScript 引擎中的结果渲染到页面中
 * 11. 浏览器完成页面的渲染
 * 12. 浏览器将页面内容返回给用户
 * 13. 用户与页面进行交互，JavaScript 引擎会响应用户事件并执行相应的代码
 */

/**
 * 初识Node.js
 * 1. Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。
 * 2. Node.js 运行在服务端的 JavaScript 运行环境，因此可以创建基于 JavaScript 的服务器。
 */

/**
 * Node.js 的主要特点
 * 1. 非阻塞式 I/O：Node.js 使用事件驱动的非阻塞式 I/O，因此可以处理大量的并发连接，而不会因为 I/O 阻塞而影响性能。
 * 2. 模块化：Node.js 的模块化机制使得代码更加organized，并且可以复用。
 * 3. 跨平台：Node.js 支持多个平台，如 Windows、Linux、Mac 等，因此可以在不同平台下运行。
 * 4. 高性能：Node.js 的性能搞笑，因为 Node.js 使用了 V8 引擎，这是 JavaScript 运行时引擎，因此 Node.js 的性能搞笑。
 * 5. 社区活跃：Node.js 社区非常活跃，有很多优秀的模块和库，可以满足各种需求。
 */

/**
 * 理解 Node.js 的作用场景与安装配置
 * 1. Node.js 的作用场景：
 *  - Node.js 可以用于构建服务器应用程序，如 Web 服务器、API 服务器、聊天室、游戏服务器等。
 *  - Node.js 可以用于构建命令行工具，如 CLI 应用程序、文件管理器、文本编辑器等。
 *  - Node.js 可以用于构建桌面应用程序，如electron、nw.js等。
 *
 * 2. Node.js 的安装配置：
 *  - Node.js 可以从官网下载安装包，并安装到本地。
 *  - 安装完成后，可以在命令行中输入 node -v 来查看 Node.js 的版本。
 *  - Node.js 的安装目录中，有一个 bin 目录，里面有 node.exe 文件，可以通过这个文件来运行 Node.js 的脚本。
 *  - Node.js 的安装目录中，还有一个 npm 目录，里面有 npm.cmd 文件，可以通过这个文件来安装和运行 Node.js 的模块。
 *
 * 3. Node.js 的使用方法：
 *  - Node.js 的使用方法与 JavaScript 的使用方法一样，通过创建 JavaScript 文件并运行它们来使用 Node.js。
 */

/**
 * 熟悉 npm/yarn、package.json、常用脚本
 * 1. npm/yarn：npm 是 Node.js 的包管理工具，yarn 是 npm 的替代品。
 * 2. package.json：package.json 是 Node.js 项目的配置文件，里面包含项目的依赖包、脚本等信息。
 * 3. 常用脚本：
 *  - npm init：创建 package.json 文件。
 *  - npm install：安装项目依赖包。
 *  - npm start：启动项目。
 *  - npm test：运行项目测试。
 * 4. package.json 的作用：
 *  - package.json 可以记录项目的依赖包、脚本等信息，方便项目管理。
 *  - package.json 可以通过 npm install 命令安装依赖包。
 * 5. 脚本的作用：
 *  - 脚本可以定义项目的启动、测试、打包等信息。
 *  - 脚本可以通过 npm start 命令启动项目。
 * 6. 脚本的编写方法：
 *  - 脚本可以定义在 package.json 文件的 scripts 字段中。
 *  - 脚本的格式为："脚本名": "命令"
 * 7. 脚本的运行方法：
 *  - 脚本可以通过 npm run 命令运行。
 * 8. 脚本的示例：
 *  - "start": "node app.js"
 * 9. 脚本的运行方法：
 *  - npm run start
 * 10. 脚本的运行结果：
 *  - 项目启动
 */

/**
 * 能用 `node` 运行脚本，理解 REPL
 * 1. `node` 运行脚本：
 *  - `node` 命令可以运行 JavaScript 脚本。
 *
 * 2. REPL：
 *  - REPL 是 Read-Eval-Print Loop 的缩写，即读、执行、打印、循环。
 *  - REPL 是 Node.js 的交互式环境，可以在其中输入 JavaScript 命令并执行。
 *  - REPL 可以用来测试 JavaScript 命令，并查看结果。
 *  - REPL 可以用来调试 JavaScript 代码。
 *
 * 3. REPL 的作用：
 *  - REPL 可以用来测试 JavaScript 命令，并查看结果。
 *
 * 4. REPL 的使用方法：
 *  - 在命令行中输入 node，进入 REPL 环境。
 *
 * 5. REPL 的运行方法：
 *  - node
 *
 * 6. REPL 的运行结果：
 *  - 进入 REPL 环境
 *
 * 7. REPL 的退出方法：
 *  - Ctrl + C
 *  - .exit
 *  - Ctrl + D
 *
 * 8. REPL 的退出结果：
 *  - 退出 REPL 环境
 */
