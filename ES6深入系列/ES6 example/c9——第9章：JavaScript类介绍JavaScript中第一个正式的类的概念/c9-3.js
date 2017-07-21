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















