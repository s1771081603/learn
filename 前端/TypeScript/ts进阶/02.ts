// 面向对象编程思想
// 传统方法中，JavaScript通过构造函数实现类的概念，通过原型链实现继承。而在ES6中，我们终于迎来了class。
// TypeScript除了实现了所有ES6中的类的功能以外，还添加了一些新的用法。

/*
* 类的概念
* 虽然JavaScript中有类的概念，但是大多数JavaScript程序员并不是非常熟悉类
* 类（Class）：定义了一些事物的抽象特点，包含它的属性方法。
* 对象（Object）：类的实例，通过new生成。
* 面向对象（OOP）的三大特点：封装、继承、多态。
* 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。
*   外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证外部无法任意更改内部对象的数据。
* 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性。
* 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。
* 存取器（getter && setter）：可以用来改变属性的读取和赋值行为。
* 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或者类型的性质。比如public表示公有属性或方法。
* 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中实现。
* 接口（Interfaces）：不同类之间公有属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口。
* */
class Person01 {
    constructor(name: string, age: number = 18) {
        this.name = name;
        this.age = age;
    }
    name: string;
    age: number;
    say() {
        console.log("姓名：" + this.name + "，年龄：" + this.age);
    }
}
const a1 = new Person01('宋利生',26);
const a2 = new Person01('蔡露');
a1.say();
a2.say();

/*
* ES6 中类的用法
* 属性和方法
*   使用class定义类，使用constructor定义构造函数。
*   通过new生成新的实例的时候，会自动调用构造函数。
* 类的继承
*   使用 extend 关键字来实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。
* 存取器
*   使用 getter 和 setter 可以改变属性的赋值和读取行为
* 静态方法
*   用 static 修饰符修饰的方法称为静态方法，他们不需要实例化，而是直接通过类来调用。
* 实例属性
*   ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义。
* 静态属性
*   ES7 提案中可以使用 static 定义一个静态属性。
* */
class Student extends Person01 {
    constructor(name: string, age: number, school: string) {
        super(name, age);
        this.school = school;
    }
    school: string;
    study() {
        console.log('我叫' + this.name + '，今年' + this.age + '岁。从' + this.school + '毕业！');
    }
}
const a3 = new Student('宋利生',26,'黄冈职业技术学院');
a3.study();

class Teacher extends Student {
    constructor(name: string, age: number, school: string, price: number) {
        super(name, age, school);
        this.price = price;
    }
    price: number;
    study() {
        console.log('我是' + this.name + '，今年' + this.age + '岁。在' + this.school + '授业，月薪' + this.price + '。');
    }
}
const a4 = new Teacher('老师',32,'黄冈职业技术学院', 4500);
a4.study();



class Person02 {
    constructor(name: string, age: number = 18, sex: string = 'male') {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    name: string;
    protected age: number; // 受保护的
    private sex: string; // 私有的
    say() {
        this.age = 18;
        this.sex = 'female';
        console.log("姓名：" + this.name + "，年龄：" + this.age + "，性别：" + this.sex);
    }
}
const a5 = new Person02('宋利生',26);
console.log(a5.name);
// console.log(a5.age); // 只能在类的内部或者子类中访问
// console.log(a5.sex); // 只能在累的内部访问
a5.say();

class Student02 extends Person02{
    constructor(name: string, age: number, sex: string, school: string, abc: string) {
        super(name, age, sex);
        this.school = school;
        this.abc = abc;
    }
    protected school: string; // 受保护的
    readonly abc: string; // 只读属性
    study() {
        console.log("姓名：" + this.name + "，年龄：" + this.age);
    }
}
const a6 = new Student02('宋利生',26,'male','黄职','123');
a6.study();
console.log(a6.abc);

// 存储器 set get
class Person03 {
    constructor(name: string, age: number) {
        this.name = name;
        this._age = age;
    }
    name: string;
    private _age: number; // 私有的

    set age(age: number){
        this._age = age;
    }
    get age(){
        return this._age;
    }
    setAge(age: number){
        if (age > 0 && age < 120) {
            this._age = age;
        } else {
            console.log("您的年龄不符合要求~")
        }
    }
    getAge(){
        return this._age;
    }
    public run(){
        this.left();
        this.right();
        this.go();
    }
    private left() {
        console.log("迈左腿");
    }
    private right(){
        console.log("迈右腿");
    }
    private go(){
        console.log("前进一步");
    }
}
const a7 = new Person03('宋利生',26);
a7.run();
a7.setAge(125);
console.log(a7.getAge());
a7.age = 50;
console.log(a7.age);

// static 静态方法不能访问非静态成员
class Student03{
    constructor(name: string){
        this.name = name
    }
    static school: string = '黄职';
    name: string;
    static study(){
        console.log("@@@@@@");
        console.log(this.school,this.prototype,this);
    }
    say(){
        console.log(this.name+"######");
    }
}
const a8 = new Student03('宋利生');
a8.say();
console.log(Student03.school);
Student03.study();


/**
 * 抽象类 abstract class
 * 抽象类是供其他继承类的基类，抽象类不予许被实例化。抽象类的抽象方法必须在子类中被实现。
 * abstract
 * 如果一个类中有一个方法是抽象方法，那这个类就是抽象类，也要用 abstract 来修饰。
 * 抽象类是不能够被实例化
 */
 abstract class person04 {
    name: string = 'songlisheng';
    say(){
        console.log("**********");
    }
    /**
    * 抽象方法
    * 一个没有方法体的方法就是抽象方法
    * 抽象方法前要用一个 abstract 修饰
     * 抽象方法是用来约束子类，必须要有抽象方法的实现。
    * */
    abstract run():void;
}
/**
 *
 * */
class demo01 extends person04 {
    // 重写抽象方法
    run() {
        console.log('*** 重写 abstract 方法 ***');
    }
}

const a9 = new demo01();
a9.run();

/**
 * 接口 要用 interface 修饰
 * 接口又是一个特殊的抽象类
 * 接口里面所有的方法都是抽象方法
 * 接口里的成员必须是公有的
 * */
interface Interface01 {
    name: string;
    fun():void;
}
interface Interface02 {
    age:number;
    foo():void;
}
/**
 * 接口继承可以实现多个继承
 * 可以用类继承接口，也可以用接口继承接口
 * */
interface Interface03 extends Interface01,Interface02{
    far():void;
}
/**
 * 接口也不能被实例化，必须要在子类里面实现。
 * 用 implements 修饰
 * */
class person05 extends person04 implements Interface03{
    constructor(name:string,age:number) {
        super();
        this.name = name;
        this.age = age;
    }
    name:string;
    age:number;
    fun(){
        console.log(this.name + "：" + this.age)
    }
    foo(){
        console.log("****** foo ******")
    }
    far(){
        console.log("****** far ******")
    }
    run(){
        console.log("****** run ******")
    }
}
const a10 = new person05('宋利生',26);
a10.fun();a10.foo();a10.far();a10.run();a10.say();

/**
 * 多态  PolyInorphism
 * 由继承而产生的了相关的不同的类，对同一个方法可以有不同的响应。
 * */