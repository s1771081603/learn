/**
 * 什么是联合类型和交叉类型？
 * 联合类型（Union Types）和交叉类型（Intersection Types）是TypeScript中用于组合类型的两种方式。
 *
 * 联合类型允许一个变量可以是几种类型之一，使用竖线（|）分隔。例如：
 * let value: string | number; // value 可以是字符串或数字类型
 * value = "Hello"; // 赋值为字符串
 * value = 42; // 赋值为数字
 * 
 * 交叉类型允许将多个类型合并为一个类型，使用和号（&）分隔。例如：
 * interface A { a: string; }
 * interface B { b: number; }
 * let ab: A & B; // ab 必须同时具有 A 和 B 的属性
 * ab = { a: "Hello", b: 42 }; // 正确，包含 A 和 B 的属性
 * 
 * 总结：联合类型用于表示变量可以是多种类型之一，而交叉类型用于表示变量必须同时满足多种类型的要求。
 */
let value: string | number; // value 可以是字符串或数字类型
value = "Hello"; // 赋值为字符串
value = 42; // 赋值为数字

interface A { a: string; }
interface B { b: number; }
let ab: A & B; // ab 必须同时具有 A 和 B 的属性
ab = { a: "Hello", b: 42 }; // 正确，包含 A 和 B 的属性