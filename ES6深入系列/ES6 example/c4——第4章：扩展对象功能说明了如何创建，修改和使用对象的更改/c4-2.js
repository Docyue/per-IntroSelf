// ---------新方法
// ------Object.is（）方法
// 在许多情况下，Object.is()作品与作者相同===。唯一的区别是+0和-0被认为是不相等的，NaN被认为是等价的NaN。但是没有必要停止使用平等运算符
console.log(+0 == -0);              // true
console.log(+0 === -0);             // true
console.log(Object.is(+0, -0));     // false

console.log(NaN == NaN);            // false
console.log(NaN === NaN);           // false
console.log(Object.is(NaN, NaN));   // true

console.log(5 == 5);                // true
console.log(5 == "5");              // true
console.log(5 === 5);               // true
console.log(5 === "5");             // false
console.log(Object.is(5, 5));       // true


// ------Object.assign（）方法
// ECMAScript 6添加了Object.assign()方法，其行为方式相同，接受接收者和任何数量的供应商，然后返回接收者
// Mixins是JavaScript中最受欢迎的对象组合模式
// mixin()函数遍历自己的属性supplier并将其复制到receiver（当一个浅层拷贝，当对象引用在属性值为对象时被共享）
function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function(key) {
        receiver[key] = supplier[key];
    });

    return receiver;
}


// myObject从EventTarget.prototype对象接收行为。这myObject可以分别使用emit()和on()方法发布事件并订阅它们
function EventTarget() { /*...*/ }
EventTarget.prototype = {
    constructor: EventTarget,
    emit: function() { /*...*/ },
    on: function() { /*...*/ }
};

var myObject = {};
// es5
mixin(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");
// es6
Object.assign(myObject, EventTarget.prototype);
myObject.emit("somethingChanged");

// 使用访问器属性
var receiver = {},
    supplier = {
        get name() {
            return "file.js"
        }
    };
Object.assign(receiver, supplier);

var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");

console.log(descriptor.value);      // "file.js"
console.log(descriptor.get);        // undefined





























