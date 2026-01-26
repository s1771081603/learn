/**
 * 枚举（enum）是什么，它的优势，应用案例。枚举和常量枚举的区别？
 * 枚举（enum）是 TypeScript 中的一种数据类型，用于定义一组命名的常量。它允许开发者为一组相关的值赋予有意义的名称，从而提高代码的可读性和可维护性。
 * 优势：枚举提供了一种更安全的方式来处理常量，它可以在编译时进行类型检查，并确保值只能是定义的几种值之一。
 * 应用案例：枚举常用于表示状态、选项或类别等。例如，定义一个表示方向的枚举：
 * enum Direction { Up, Down, Left, Right }
 * let dir: Direction = Direction.Up;
 * 常量枚举（const enum）是枚举的一种特殊形式，它在编译时会被内联为具体的值，从而减少运行时的开销。使用常量枚举时，编译器会将枚举成员直接替换为其对应的值，而不会生成额外的代码。
 * 区别：枚举和常量枚举的区别是：枚举成员会被编译为常量，而常量枚举成员会被内联为具体的值。
 * 总结：枚举是 TypeScript 中用于定义一组命名常量的工具，提供了类型安全和可读性。常量枚举通过内联值减少运行时开销，适用于性能敏感的场景。
 */
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log(c); // 输出 1，因为 Green 是枚举成员的第二个值，默认从 0 开始计数

const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
let dir: Direction = Direction.Up;
console.log(dir); // 输出 0，因为 Up 是常量枚举成员的第一个