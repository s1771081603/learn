const path = require("path");

/**
 * 04_path.js
 * Node.js path 模块学习演示
 *
 * 运行: node 04_path.js
 */
("use strict");

// 示例路径（包含中文和 Windows 风格分隔符）
const winPath = "D:\\学习\\learn\\服务端\\Node\\02_foundation\\04_path.js";
const posixPath = "/home/user/project/src/index.js";

// 常量
console.log("path.sep:", path.sep); // 平台相关的路径分隔符
console.log("path.delimiter:", path.delimiter); // 环境变量分隔符 (PATH 中的分隔符)
console.log("---");

// 基本操作：basename, dirname, extname
console.log("basename(winPath):", path.basename(winPath));
console.log("basename(winPath, .js):", path.basename(winPath, ".js"));
console.log("dirname(winPath):", path.dirname(winPath));
console.log("extname(winPath):", path.extname(winPath));
console.log("---");

// parse / format（将路径解析为对象，或由对象格式化回路径）
const parsed = path.parse(winPath);
console.log("parse(winPath):", parsed);
const formatted = path.format(parsed);
console.log("format(parsed):", formatted);
console.log("---");

// join / normalize（拼接并规范化路径）
console.log(
  "join('foo', 'bar', '..', 'baz'):",
  path.join("foo", "bar", "..", "baz")
);
console.log(
  "normalize('foo//bar\\baz/../qux'):",
  path.normalize("foo//bar\\baz/../qux")
);
console.log("---");

// resolve（生成绝对路径）和 isAbsolute
console.log("resolve('foo', '/tmp/file'):", path.resolve("foo", "/tmp/file"));
console.log("isAbsolute(winPath):", path.isAbsolute(winPath));
console.log("isAbsolute(posixPath):", path.isAbsolute(posixPath));
console.log("---");

// relative（计算相对路径）
console.log(
  "relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'):",
  path.relative("/data/orandea/test/aaa", "/data/orandea/impl/bbb")
);
console.log("---");

// 平台无关 API：posix / win32
console.log('posix.join("/foo", "bar"):', path.posix.join("/foo", "bar"));
console.log(
  'win32.join("C:\\\\foo", "bar"):',
  path.win32.join("C:\\foo", "bar")
);
console.log("---");

// 实用小函数：确保目录路径末尾带分隔符
function ensureTrailingSep(p) {
  if (!p.endsWith(path.sep)) return p + path.sep;
  return p;
}
console.log(
  "ensureTrailingSep(dirname):",
  ensureTrailingSep(path.dirname(winPath))
);
