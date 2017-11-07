// 类允许您定义原型上的访问器属性
// 要创建一个getter，使用关键字get后跟一个空格，后跟一个标识符;
//  创建一个setter，使用关键字做同样的事情set

class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }

    get html() {
        return this.element.innerHTML;
    }

    set html(value) {
        this.element.innerHTML = value;
    }
}

var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html");
console.log("get" in descriptor);   // true
console.log("set" in descriptor);   // true
console.log(descriptor.enumerable); // false


// html单独访问属性定义是等价类声明的大小差不多
// direct equivalent to previous example
let CustomHTMLElement1 = (function() {
   "use strict";
    const CustomHTMLElement1 = function(element) {
        // make sure the function was called with new
        if (typeof new.target === "undefined") {
            throw new Error("Constructor must be called with new.");
        }
        this.element = element;
    }
    Object.defineProperty(CustomHTMLElement1.prototype, "html", {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.element.innerHTML;
        },
        set: function(value) {
            this.element.innerHTML = value;
        }
    });
    return CustomHTMLElement1;
}());


// ------方法名称
let methodName = "sayName";
class PersonClass {
    constructor(name) {
        this.name = name;
    }
    [methodName]() {
        console.log(this.name);
    }
}
let me = new PersonClass("Nicholas");
me.sayName();           // "Nicholas"



// 访问属性可以以相同的方式使用计方法名称
// html使用propertyName变量设置getter和setter 
let propertyName = "html";
class CustomHTMLElement {
    constructor(element) {
        this.element = element;
    }
    get [propertyName]() {
        return this.element.innerHTML;
    }
    set [propertyName](value) {
        this.element.innerHTML = value;
    }
}

// ------生成器方法
// 该方法返回一个迭代器，其值被硬编码到生成器中。
// 当您有一个表示值集合的对象并且想要轻松迭代这些值时，生成器方法很有用
class MyClass {
    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }

}

let instance = new MyClass();
let iterator = instance.createIterator();

// 通过使用Symbol.iterator定义生成器方法来定义类的默认迭代器
class Collection {

    constructor() {
        this.items = [];
    }

    *[Symbol.iterator]() {
        yield *this.items.values();
    }
}

var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for (let x of collection) {
    console.log(x);
}

// Output:
// 1
// 2
// 3


// ------直接添加到构造函数上以模拟静态成员
function PersonType(name) {
    this.name = name;
}
// static method
PersonType.create = function(name) {
    return new PersonType(name);
};
// instance method
PersonType.prototype.sayName = function() {
    console.log(this.name);
};
var person = PersonType.create("Nicholas");

// -----ECMAScript 6类通过static在方法或访问器属性名称之前使用正式注释来简化静态成员的创建。
class PersonClass {
    // equivalent of the PersonType constructor
    constructor(name) {
        this.name = name;
    }

    // equivalent of PersonType.prototype.sayName
    sayName() {
        console.log(this.name);
    }

    // equivalent of PersonType.create
    static create(name) {
        return new PersonClass(name);
    }
}

let person = PersonClass.create("Nicholas");






















