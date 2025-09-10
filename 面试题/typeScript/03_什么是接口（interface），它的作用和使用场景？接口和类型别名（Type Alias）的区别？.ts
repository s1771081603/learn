/**
 * 什么是接口（interface），它的作用和使用场景？
 * 接口（interface）是 TypeScript 中用于定义对象结构和类型的工具。它允许开发者描述对象的形状，包括属性和方法的类型，从而实现类型检查和代码的可维护性。
 * 作用：
 * 1. 类型检查：接口可以确保对象符合特定的结构，防止类型错误。
 * 2. 代码可读性：通过接口定义，可以清晰地表达对象的预期结构。
 * 3. 代码复用：接口可以被多个类或对象实现，促进代码复用。
 * 使用场景：
 * 1. 定义对象类型：当需要定义复杂对象的结构时，可以使用接口。
 * 2. 类的实现：类可以实现接口，从而确保类具有接口定义的属性和方法。
 * 3. 函数类型：接口可以用来定义函数的参数和返回值类型。
 * 4. 第三方库：在使用第三方库时，可以通过接口定义库的类型，提升类型安全性。
 * 总结：接口是 TypeScript 中强大的类型工具，广泛应用于对象结构定义、类实现和函数类型定义等场景，提升代码的类型安全性和可维护性。
 */
interface Person {
  name: string;
  age: number;
  sayHello(): void;
}
function printPerson(person: Person) {
  console.log(`Name: ${person.name}, Age: ${person.age}`);
  person.sayHello();
}

/**
 * 接口和类型别名（Type Alias）的区别？
 * 接口（interface）和类型别名（Type Alias）都是 TypeScript 中用于定义类型的工具，但它们有一些关键区别：
 * 1. 语法和定义方式：
 *    - 接口使用 `interface` 关键字定义，适用于描述对象的结构。
 *    - 类型别名使用 `type` 关键字定义，可以描述更广泛的类型，包括基本类型、联合类型、交叉类型等。
 * 2. 扩展性：
 *    - 接口支持扩展（extends）和实现（implements），可以通过继承或实现其他接口来扩展或实现新的接口。
 *    - 类型别名不支持扩展或实现，但可以通过交叉类型（&）来组合多个类型。
 * 3. 重复定义：
 *    - 接口允许重复定义，后定义的接口会与前面的接口合并。
 *    - 类型别名不允许重复定义，重复定义会导致编译错误。
 * 4. 使用场景：
 *    - 接口更适合用于定义对象的结构和类的实现。
 *    - 类型别名更适合用于定义复杂类型、联合类型和交叉类型
 * 5. 类型检查：  
 *    - 接口在类型检查时更严格，适用于需要明确对象结构的场景。
 *    - 类型别名在某些情况下可能更宽松，适用于需要灵活定义类型的场景。
 * 6. 兼容性：
 *    - 接口在与类和对象交互时具有更好的兼容性，特别是在面向对象编程中。
 *    - 类型别名在处理复杂类型时可能更具优势，但在与类和对象交互时可能不如接口直观。
 * 7. 可读性和维护性：
 *    - 接口通常被认为在描述对象结构时更具可读性，特别是在大型代码库中。
 *    - 类型别名在处理复杂类型时可能更简洁，但在描述对象结构时可能不如接口清晰。
 * 总结：接口和类型别名各有优缺点，选择使用哪一个取决于具体的使用场景和需求。接口更适合面向对象编程，而类型别名更灵活，适用于更广泛的类型定义。
 */
type Employee = {
  name: string;
  age: number;
  sayHello(): void;
};
function printEmployee(employee: Employee) {
  console.log(`Name: ${employee.name}, Age: ${employee.age}`);
  employee.sayHello();
}
// 示例对象
const person: Person = {
  name: 'John',
  age: 30,
  sayHello() {
    console.log('Hello!');
  }
};
const employee: Employee = {
  name: 'Jane',
  age: 28,
  sayHello() {
    console.log('Hi there!');
  }
};
printPerson(person);
printEmployee(employee);
