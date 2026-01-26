/**
 * 什么是命名空间（Namespace）和模块（Module）？
 *
 * 命名空间（Namespace）和模块（Module）都是用于组织和管理代码的方式，但它们有不同的用途和实现方式。
 * 命名空间主要用于在全局范围内组织代码，而模块则用于在文件级别上组织代码。
 *
 * 命名空间（Namespace）：
 * 命名空间是一种在全局范围内组织代码的方式。它通过将相关的代码封装在一个命名空间中，避免了全局变量的冲突。
 * 在TypeScript中，可以使用`namespace`关键字来定义命名空间。
 * 例如：
 * namespace MyNamespace {
 *   export function myFunction() {
 *     console.log("Hello from MyNamespace");
 *   }
 * }
 * MyNamespace.myFunction(); // 调用命名空间中的函数
 *
 * 模块（Module）：
 * 模块是一种在文件级别上组织代码的方式。每个文件都被视为一个独立的模块，可以导出和导入变量、函数、类等。
 * 在TypeScript中，可以使用`export`和`import`关键字来定义和使用模块。
 * 例如：
 * // math.ts - 定义模块
 * export function add(a: number, b: number): number {
 *   return a + b;
 * }
 *
 * // app.ts - 使用模块
 * import { add } from './math';
 * console.log(add(2, 3)); // 输出 5
 */
namespace MyNamespace {
  export function myFunction() {
    console.log("Hello from MyNamespace");
  }
}
MyNamespace.myFunction(); // 调用命名空间中的函数

export function add(a: number, b: number): number {
  return a + b;
}
console.log(add(2, 3)); // 输出 5