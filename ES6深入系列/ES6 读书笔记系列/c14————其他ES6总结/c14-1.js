// ECMAScript 6为Math对象添加了几种方法，以提高常用数学计算的速度。
// Math.acosh(x)返回反双曲余弦x。
// Math.asinh(x)返回反双曲正弦x。
// Math.atanh(x) 返回反双曲正切 x
// Math.cbrt(x)返回的立方根x。
// Math.clz32(x)返回32位整数表示中的前导零位数x。
// Math.cosh(x)返回的双曲余弦值x。
// Math.expm1(x) 返回从指数函数中减去1的结果 x
// Math.fround(x)返回最接近的单精度浮点数x。
// Math.hypot(...values) 返回每个参数的平方和的平方根。
// Math.imul(x, y) 返回执行两个参数的真32位乘法运算的结果。
// Math.log1p(x)返回自然对数1 + x。
// Math.log10(x)返回基数10的对数x。
// Math.log2(x)返回的基数2对数x。
// Math.sign(x)如果x为负，则返回-1 ，如果x为+0或-0 则返回0，如果为正，则返回1 x。
// Math.sinh(x)返回的双曲正弦x。
// Math.tanh(x)返回双曲正切x。
// Math.trunc(x) 从浮点数中删除小数位数并返回一个整数。


// -----------__proto__正式化

// ECMAScript规范建议使用Object.getPrototypeOf()和Object.setPrototypeOf()替代，因为__proto__具有以下特征：

// 您只能__proto__在对象文字中指定一次。如果指定两个__proto__属性，则抛出一个错误。这是唯一具有该限制的对象文字属性。

// 计算的表单["__proto__"]像普通属性一样，不设置或返回当前对象的原型。与对象文字属性相关的所有规则以此形式适用，而不是具有异常的非计算形式

// 在ECMAScript 6引擎中，Object.prototype.__proto__被定义为get方法调用的访问器属性

// Object.getPrototypeOf()其set方法调用该Object.setPrototypeOf()方法

let person = {
    getGreeting() {
        return "Hello";
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};
// prototype is person
let friend = {
    __proto__: person
};
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true
console.log(friend.__proto__ === person);               // true
// set prototype to dog
friend.__proto__ = dog;
console.log(friend.getGreeting());                      // "Woof"
console.log(friend.__proto__ === dog);                  // true
console.log(Object.getPrototypeOf(friend) === dog);     // true

// 示例不是调用Object.create()来创建friend对象，而是创建一个标准对象字面值，该字符串将赋值给该__proto__属性。
// 使用该Object.create()方法创建对象时，另一方面，您必须为任何其他对象属性指定完整的属性描述符。
























































