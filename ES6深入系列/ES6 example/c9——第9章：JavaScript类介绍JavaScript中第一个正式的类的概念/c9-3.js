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








