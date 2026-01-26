/**
 * ypeScript中的可选参数和默认参数是什么？
 *
 * 可选参数和默认参数是TypeScript中函数参数的两种特殊类型，用于增强函数的灵活性和可读性。
 * 可选参数（Optional Parameters）：
 * 可选参数是在函数定义中通过在参数名后添加问号（?）来表示的。这意味着调用函数时可以选择性地传递该参数，如果不传递，则该参数的值为undefined。
 * 例如：
 * function greet(name: string, age?: number) {
 *    if (age !== undefined) {
 *      console.log(`Hello, ${name}. You are ${age} years old.`);
 *    } else {
 *      console.log(`Hello, ${name}.`);
 *    }
 * }
 * greet("Alice"); // 输出: Hello, Alice.
 * greet("Bob", 30); // 输出: Hello, Bob. You are 30 years old.
 */