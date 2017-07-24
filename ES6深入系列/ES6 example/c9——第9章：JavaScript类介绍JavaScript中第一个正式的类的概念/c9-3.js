// -----------类的继承
// 使用自定义类型实现继承是一个广泛的过程
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
function Square(length) {
    Rectangle.call(this, length, length);
}
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        value:Square,
        enumerable: true,
        writable: true,
        configurable: true
    }
});
var square = new Square(3);
console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true


// ------类通过使用熟悉的extends关键字来指定类应该继承的函数
// 原型将自动调整，您可以通过调用该super()
// 方法访问基类构造函数。
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
}
class Square extends Rectangle {
    constructor(length) {
        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}
var square = new Square(3);

console.log(square.getArea());              // 9
console.log(square instanceof Square);      // true
console.log(square instanceof Rectangle);   // true


// -------从其他类继承的类称为  派生类
// 派生类要求您在super()指定构造函数时使用; 
// 如果没有，则会发生错误。
class Square extends Rectangle {
    // no constructor
}

// Is equivalent to

class Square extends Rectangle {
    constructor(...args) {
        super(...args);
    }
}
// 使用时请注意以下几点super()：
// 您只能super()在派生类中使用。如果您尝试在非派生类（不使用的类extends）或函数中使用它，则会抛出错误。
// 您必须super()在访问this构造函数之前调用它。由于super()负责初始化this，尝试this在调用super()结果之前访问错误。
// 避免调用的唯一方法super()是从类构造函数返回一个对象。


// ------派生类上的方法总是在基类上使用相同名称的阴影方法
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }

    // override and shadow Rectangle.prototype.getArea()
    getArea() {
        return this.length * this.length;
    }
}


// ------继承基类的静态成员
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }

    getArea() {
        return this.length * this.width;
    }

    static create(length, width) {
        return new Rectangle(length, width);
    }
}
class Square extends Rectangle {
    constructor(length) {

        // same as Rectangle.call(this, length, length)
        super(length, length);
    }
}
var rect = Square.create(3, 4);
console.log(rect instanceof Rectangle);     // true
console.log(rect.getArea());                // 12
console.log(rect instanceof Square);        // false

// -----表达式派生类
// ECMAScript 6中派生类最强大的方面是从表达式派生类的能力
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}

var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x instanceof Rectangle);    // true


// 动态确定要继承的内容
// 例子在功能上等同于前一个例子
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}
Rectangle.prototype.getArea = function() {
    return this.length * this.width;
};
function getBase() {
    return Rectangle;
}
class Square extends getBase() {
    constructor(length) {
        super(length, length);
    }
}
var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x instanceof Rectangle);    // true


// 可以动态确定基类，可以创建不同的继承方法
let SerializableMixin = {
    serialize() {
        return JSON.stringify(this);
    }
};

let AreaMixin = {
    getArea() {
        return this.length * this.width;
    }
};

function mixin(...mixins) {
    var base = function() {};
    Object.assign(base.prototype, ...mixins);
    return base;
}

class Square extends mixin(AreaMixin, SerializableMixin) {
    constructor(length) {
        super();
        this.length = length;
        this.width = length;
    }
}

var x = new Square(3);
console.log(x.getArea());               // 9
console.log(x.serialize());             // "{"length":3,"width":3}



// -----------任何表达式都可以使用extends，但不是所有表达式都会生成一个有效的类。具体来说，以下表达式类型会导致错误：
// null
// 发电机功能（见第8章） 在这种情况下，尝试创建一个新的类的实例会抛出一个错误，因为没有[[Construct]]调用。



// ----------在Class构造函数中使用new.target
// 简单的情况下，new.target等于类的构造函数
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

// new.target is Rectangle
var obj = new Rectangle(3, 4);      // outputs true



// 类构造函数无法调用new，因此new.target属性始终在类构造函数中定义
class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length)
    }
}

// new.target is Square
var obj = new Square(3);      // outputs false


// 通过使用创建一个抽象基类（一个不能被直接实例）new.target
// abstract base class
class Shape {
    constructor() {
        if (new.target === Shape) {
            throw new Error("This class cannot be instantiated directly.")
        }
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
}
var x = new Shape();                // throws error
var y = new Rectangle(3, 4);        // no error
console.log(y instanceof Shape);    // true



// ---------------概要
// ECMAScript 6类使得JavaScript中的继承更易于使用，因此您不需要摒弃任何现有的对其他语言可能拥有的继承的理解。ECMAScript 6课程开始为ECMAScript 5的经典继承模式的语法糖，但增加了很多功能来减少错误。

// ECMAScript 6类通过在类原型上定义非静态方法来处理原型继承，静态方法最终在构造函数本身。所有方法都是不可枚举的，这个功能可以更好地匹配内置对象的行为，默认情况下，方法通常不能枚举。另外，不能调用类构造函数new，确保不能意外地将类调用为函数。

// 基于类的继承允许您从另一个类，函数或表达式派生一个类。此功能意味着您可以调用函数来确定要继承的正确基数，从而允许您使用mixins和其他不同的合成模式来创建新类。继承工作的方式是继承自内置对象，如Array现在可以并按预期工作。

// 您可以new.target在类构造函数中使用不同的行为，具体取决于类的调用方式。最常见的用法是创建一个抽象基类，直接实例化时会抛出错误，但仍允许通过其他类继承。

// 总体而言，课程是JavaScript的重要补充。它们以安全，一致的方式提供更简洁的语法和更好的功能来定义自定义对象类型。














