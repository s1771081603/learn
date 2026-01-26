/**
 * 如何处理可空类型（nullable types）和undefined类型，如何正确处理这些类型以避免潜在错误？
 * 在TypeScript中，处理可空类型（nullable types）和undefined类型时，可以采取以下几种方法来避免潜在错误：
 * 1. 使用联合类型（Union Types）：可以将类型与null或undefined结合使用联合类型来明确表示一个变量可以是某种类型或null/undefined。例如：
 * let name: string | null = null; // name 可以是字符串或null 类型
 * let age: number | undefined; // age 可以是数字或undefined 类型
 * 2. 非空断言操作符（Non-null Assertion Operator）：在确定一个变量不为null或undefined时，可以使用非空断言操作符（!）来告诉编译器该变量是非空的。例如：
 * let name: string | null = "Alice";
 * console.log(name!.length); // 使用非空断言操作符，告诉编译器 name 不是 null
 * 3. 可选链操作符（Optional Chaining Operator）：在访问可能为null或undefined的对象属性时，可以使用可选链操作符（?.）来安全地访问属性。例如：
 * let person: { name?: string } = {};
 * console.log(person.name?.length); // 使用可选链操作符，避免访问未定义的属性
 * 4. 默认值（Default Values）：在函数参数或变量赋值时，可以使用默认值来确保变量不会是undefined。例如：
 * function greet(name: string = "Guest") { // name 默认为 "Guest"
 *   console.log(`Hello, ${name}`);
 * }
 * 5. 类型保护（Type Guards）：使用类型保护来检查变量的类型，从而安全地处理不同类型的值。例如：
 * function printLength(value: string | null) { // 使用类型保护
 *    if (value !== null) {  // 检查 value 是否不为 null
 *      console.log(value.length); // 现在可以安全地访问 length 属性
 *    } else {
 *      console.log("Value is null");
 *    }
 * }
 * 6. 严格的null检查（Strict Null Checks）：在tsconfig.json中启用"strictNullChecks"选项，可以强制TypeScript在编译时检查null和undefined，从而减少潜在错误。
 * 总结：通过使用联合类型、非空断言操作符、可选链操作符、默认值、类型保护以及启用严格的null检查，可以有效地处理可空类型和undefined类型，避免潜在的运行时错误。
 */
function printLength(value: string | null) { // 使用类型保护
  if (value !== null) {  // 检查 value 是否不为 null
    console.log(value.length); // 现在可以安全地访问 length 属性
  } else {
    console.log("Value is null");
  }
}
