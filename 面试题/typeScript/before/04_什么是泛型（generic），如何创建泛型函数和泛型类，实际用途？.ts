/**
 * 什么是泛型（generic），如何创建泛型函数和泛型类，实际用途？
 * 泛型（Generic）是指在定义函数、类或接口时，不预先指定具体的类型，而是在使用时再指定类型的一种特性。泛型使得代码更加灵活和可重用，可以适应不同的数据类型。
 * 创建泛型函数：泛型函数使用 <T> 来定义泛型参数，T 可以是任意字母，表示任意类型。</T>
 * function identity<T>(arg: T): T {
 *   return arg;
 * }
 * 创建泛型类：泛型类同样使用 <T> 来定义泛型参数。</T>
 * class GenericNumber<T> {
 *  zeroValue: T;
 *  add: (x: T, y: T) => T;
 * }
 * 实际用途：泛型使得代码更加灵活和可重用，可以适应不同的数据类型。例如，泛型函数可以处理不同类型的数组，泛型类可以创建适用于多种数据类型的集合类。
 * 总结：泛型是一种强大的工具，可以提高代码的灵活性和可重用性，适用于需要处理多种数据类型的场景。
 */
function identity<T>(arg: T): T {
  return arg;
}
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
function printAge(age: number) {
  console.log(`Age: ${age}`);
}
printAge(myGenericNumber.add(myGenericNumber.zeroValue, 10));