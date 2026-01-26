/**
 * 什么是TypeScript中的声明文件（Declaration Files）？
 * TypeScript中的声明文件（Declaration Files）是以.d.ts为扩展名的文件，用于描述JavaScript代码的类型信息。它们提供了类型定义，使得TypeScript编译器能够理解和检查JavaScript库或模块的类型，从而实现类型安全和代码补全等功能。
 * 声明文件的作用：
 * 1. 类型定义：声明文件定义了JavaScript库或模块的类型，包括函数、类、接口、变量等的类型信息。
 * 2. 类型检查：通过声明文件，TypeScript编译器可以在编译时检查代码的类型，捕获潜在的类型错误。
 * 3. 代码补全：声明文件提供了类型信息，使得IDE能够提供更好的代码补全和导航功能。
 * 4. 兼容性：声明文件使得TypeScript能够与现有的JavaScript代码库无缝集成，提升代码的可维护性。
 * 使用场景：
 * 1. 使用第三方JavaScript库：当使用没有内置类型定义的第三方JavaScript库时，可以通过安装相应的声明文件（通常通过@types/库名）来获得类型支持。
 * 2. 编写自己的库：当编写自己的JavaScript库时，可以提供相应的声明文件，以便其他TypeScript用户能够正确使用该库。
 * 3. 迁移现有JavaScript项目：在将现有的JavaScript项目迁移到TypeScript时，可以使用声明文件来逐步引入类型检查。
 * 获取声明文件：可以从npm或GitHub上获取声明文件，也可以自行编写。
 * 总结：TypeScript中的声明文件是连接JavaScript和TypeScript的重要桥梁，通过提供类型定义，提升了代码的类型安全性和开发体验。
 */
declare function require(moduleName: string): any;