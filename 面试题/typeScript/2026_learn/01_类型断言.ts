// 演示 TypeScript 中常见的类型断言用法（as、<>、非空断言、两步断言等）

// 1) 基本的 unknown -> 具体类型（推荐使用 as）
let someValue: unknown = "这是一个字符串";
let len1: number = (someValue as string).length; // 使用 as
let len2: number = (<string>someValue).length;   // 使用角括号（在 .tsx 中不可用）

// 2) DOM 元素断言（常见场景：从 DOM API 获取元素并断言为具体类型）
const maybeInput = document.getElementById("myInput"); // HTMLElement | null
// 断言为更具体的 HTMLInputElement；注意运行时仍可能为 null，需要处理或者使用非空断言
const inputEl = maybeInput as HTMLInputElement | null;
if (inputEl) {
    inputEl.value = "hello";
}
// 或者在你确定不会为 null 时（不推荐滥用）：
(inputEl as HTMLInputElement).focus();
// 也可配合非空断言：
maybeInput!.id; // 告诉编译器这个值不是 null / undefined（运行时若为 null 会抛错）

// 3) 两步断言（绕过不兼容类型的直接断言）
// 当直接从 A 断言为 B 被拒绝时，可以先断为 unknown 或 any
interface Foo { a: number }
interface Bar { b: string }

const f: Foo = { a: 1 };
// 下面这句直接断言会报错（假设严格类型检查），可用两步断言：
const forcedBar = f as unknown as Bar; // 小心使用：这是强制告诉编译器“信任我”
// 但请尽量避免滥用，两步断言常掩盖设计问题

// 4) 通用的断言辅助函数
function cast<T>(v: unknown): T {
    return v as T;
}
const data = cast<{ id: number; name: string }>({ id: 1, name: "张三" });

// 5) 断言只是编译时的工具，不会改变运行时行为
const numLike: unknown = "123";
const num = (numLike as unknown) as number; // 编译器以为 num 是 number，但运行时它仍然是字符串
// 使用时仍需谨慎：
if (typeof num === "number") {
    // 真正安全的做法是进行运行时校验
}

// 小结：
// - 优先使用 as 语法；角括号语法在 .tsx 中不可用。
// - 断言不会执行类型转换，仅改变编译器的视角。
// - 尽量通过类型收窄或运行时检查替代不安全的断言。