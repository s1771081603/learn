/**
 * TypeScript 接口（Interfaces）学习示例
 * 
 * 接口用于定义对象的结构，描述类的公共部分，是TypeScript中重要的类型检查工具。
 */

// 1. 基本接口定义
interface Person {
  name: string; 
  age: number;
  sayHello(): string;
}

function greet(person: Person): string {
  return `Hello, ${person.name}, you are ${person.age} years old.`;
}

const user: Person = {
  name: "Alice",
  age: 30,
};
console.log(greet(user)); 

// 2. 可选属性（使用 ? 标记）
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// 3. 只读属性（readonly）
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };
// p1.x = 5; // 错误！不能修改只读属性

// 4. 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = function (src, sub) {
  return src.includes(sub);
};

// 5. 类实现接口
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// 6. 接口继承
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const square: Square = { color: "blue", sideLength: 10 };