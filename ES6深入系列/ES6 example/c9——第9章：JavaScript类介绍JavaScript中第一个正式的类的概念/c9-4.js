// ------------内置继承
// 在ECMAScript 5经典继承中，值this首先由派生类型（例如MyArray）创建，然后Array.apply()调用基类型构造函数（如方法）。
// 这意味着this以一个实例开始MyArray，然后用其他属性装饰Array。
// built-in array behavior
var colors = [];
colors[0] = "red";
console.log(colors.length);         // 1
colors.length = 0;
console.log(colors[0]);             // undefined
// trying to inherit from array in ES5
function MyArray() {
    Array.apply(this, arguments);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true,
        enumerable: true
    }
});
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length);         // 0
colors.length = 0;
console.log(colors[0]);             // "red"

// 在ECMAScript 6基于类的继承中，值this首先由base（Array）创建，然后由派生类constructor（MyArray）修改。
// 结果是this从基础的所有内置功能开始，并正确接收与其相关的所有功能
class MyArray extends Array {
    // empty
}
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length);         // 1
colors.length = 0;
console.log(colors[0]);             // undefined

class MyArray extends Array {
    // empty
}
let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);
console.log(items instanceof MyArray);      // true
console.log(subitems instanceof MyArray);   // true

// -----------符号属性
// 该Symbol.species公知的符号被用于定义返回的功能的静态存取器属性。
// 该函数是一个构造函数，用于在实例方法（而不是使用构造函数）内部创建类的实例时使用。
// 以下内置类型已Symbol.species定义：

// Array
// ArrayBuffer 
// Map
// Promise
// RegExp
// Set
// 类型数组
// several builtin types use species similar to this
class MyClass {
    static get [Symbol.species]() {
        return this;
    }

    constructor(value) {
        this.value = value;
    }
    clone() {
        return new this.constructor[Symbol.species](this.value);
    }
}
class MyDerivedClass1 extends MyClass {
    // empty
}
class MyDerivedClass2 extends MyClass {
    static get [Symbol.species]() {
        return MyClass;
    }
}
let instance1 = new MyDerivedClass1("foo"),
    clone1 = instance1.clone(),
    instance2 = new MyDerivedClass2("bar"),
    clone2 = instance2.clone();
console.log(clone1 instanceof MyClass);             // true
console.log(clone1 instanceof MyDerivedClass1);     // true
console.log(clone2 instanceof MyClass);             // true
console.log(clone2 instanceof MyDerivedClass2);     // false



// 在派生的类中Array，可以确定从继承的方法返回的对象的类型
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}

let items = new MyArray(1, 2, 3, 4),
    subitems = items.slice(1, 3);

console.log(items instanceof MyArray);      // true
console.log(subitems instanceof Array);     // true
console.log(subitems instanceof MyArray);   // false


// ----------在Class构造函数中使用new.target











































