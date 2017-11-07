// -----------JavaScript类
// ECMAScript5中类似类的结构
function PersonType(name) {
    this.name = name;
}
PersonType.prototype.sayName = function() {
    console.log(this.name);
};
let person = new PersonType("Nicholas");
person.sayName();   // outputs "Nicholas"
console.log(person instanceof PersonType);  // true
console.log(person instanceof Object);      // true

// ECMAScript 6中最简单的类形式是类声明，与其他语言类似
class PersonClass {
    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }
    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }
}
let person2 = new PersonClass("Nicholas");
person2.sayName();   // outputs "Nicholas"
console.log(person2 instanceof PersonClass);     // true
console.log(person2 instanceof Object);          // true
console.log(typeof PersonClass);                    // "function"
console.log(typeof PersonClass.prototype.sayName);  // "function"

// 类和自定义类型之间有相似之处，但是有一些重要的区别要注意：
// 不像函数声明那样，类声明不会被提起来。类声明的作用就像let声明一样存在于时间死区，直到执行到达声明。
// 类声明内的所有代码都以严格模式自动运行。没有办法在课堂内选择退出严格模式。
// 所有方法都是不可枚举的。这是与自定义类型的重大变化，您需要使用它Object.defineProperty()来使方法不可枚举。
// 所有方法都缺少内部[[Construct]]方法，如果您尝试使用它们，则会抛出错误new。
// 调用类构造函数而不会引发错误。
// 尝试覆盖类方法中的类名会引发错误。
// ------上面PersonClass等同于
// direct equivalent of PersonClass
let PersonType2 = (function() {
    "use strict";
    const PersonType2 = function(name) {
        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }

        this.name = name;
    }

    Object.defineProperty(PersonType2.prototype, "sayName", {
        value: function() {

            // make sure the method wasn't called with new
            if (typeof new.target !== "undefined") {
                throw new Error("Method cannot be called with new.");
            }

            console.log(this.name);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });

    return PersonType2;
}());

// ECMAScript 6通过使CLASS这种传统。这允许类以很多不同的方式使用
function createObject(classDef) {
    return new classDef();
}
let obj = createObject(class {

    sayHi() {
        console.log("Hi!");
    }
});
obj.sayHi();        // "Hi!

// 另一个有趣的用法是通过立即调用类构造函数来创建单例
let person = new class {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}("Nicholas");

person.sayName();       // "Nicholas"









