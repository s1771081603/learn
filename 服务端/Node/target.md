# Node 学习目标

## 总体目标

掌握 Node.js 核心概念与常用生态，能独立开发、测试、部署后端服务，并具备性能优化与安全防护能力。

## 阶段性目标

- 入门（1-2 周）

  - 理解 Node.js 的作用场景与安装配置
  - 熟悉 npm/yarn、package.json、常用脚本
  - 能用 `node` 运行脚本，理解 REPL

- 基础（2-4 周）

  - 理解事件循环（Event Loop）与异步模型
  - 掌握回调、Promise、async/await 用法与错误处理
  - 使用 fs、path、http 模块进行文件与基本网络操作
  - 能用 Express/Koa 搭建简单 REST API

- 进阶（1-3 个月）

  - 理解流（Streams）、Buffer 与二进制处理
  - 熟悉模块系统（CommonJS 与 ES Modules）
  - 熟练使用中间件、路由、验证、日志（winston/pino）
  - 使用数据库（MongoDB/Postgres）并实现连接池与事务
  - 学习测试（Jest/Mocha）、Mock 与集成测试

- 部署与运维（并行学习）

  - 掌握进程管理（pm2）、容器化（Docker）、‌Kubernetes（K8S）、CI/CD 基础
  - 学会基本安全性措施（输入验证、速率限制、CORS、Helmet）
  - 能进行简单的性能诊断（profiling、PM2/Clinic）

- 深入与最佳实践（长期）
  - 类型安全：TypeScript 在 Node 中的应用
  - 微服务、消息队列（RabbitMQ/Kafka）架构实践
  - 性能优化（事件循环阻塞检测、内存泄漏排查）
  - 可观测性：日志/指标/追踪（ELK、Prometheus、Jaeger）

## 可衡量的成果

- 能独立完成一个包含认证、持久化、日志与测试的 RESTful 服务
- 在代码库中覆盖关键逻辑的单元/集成测试，CI 能自动通过
- 能将服务容器化并部署到云环境，能定位并修复常见性能问题

## 学习资源建议

- 官方文档、Node.js 入门教程、Express/Koa 官方文档
- 在线课程、实战项目与开源代码阅读

## 评估方法

- 完成 1-2 个小型后端项目并部署
- 写出 10+ 个单元测试并达到预期覆盖率
- 能口头或书面解释事件循环、Promise 与流的工作原理
- 独立调试并解决至少一个性能或安全问题
