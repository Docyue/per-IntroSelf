// ---------块级功能
// ECMAScript 6 behavior  ECMAScript 6还允许非限制模式下的块级功能，但行为略有不同。而不是将这些声明提升到块的顶部，它们一直被提升到包含函数或全局环境
if (true) {

    console.log(typeof doSomething);        // "function"

    function doSomething() {
        // ...
    }

    doSomething();
}
console.log(typeof doSomething);            // "function"

// ---------箭头函数
// -1 没有this，super，arguments，和new.target绑定
// -2 不能调用new - 箭头函数没有[[Construct]]方法，因此不能用作构造函数
// -3 没有原型 - 因为你不能使用new箭头函数，所以不需要一个原型
// -4 无法更改this - this功能内部的值不能更改
// -5 没有arguments对象 - 由于箭头函数没有arguments绑定，您必须依赖命名和休息参数来访问函数参数
// -6 没有重复的命名参数 - 箭头函数不能在严格或非限制模式下具有重复的命名参数，而不是仅在严格模式下不能具有重复命名参数的非缩略语函数

// 如果函数没有参数，则必须在声明中包含一组空的括号
var getName = () => "Nicholas";
// effectively equivalent to:
var getName = function() {
    return "Nicholas";
};

// 以下箭头函数需要一个参数
var reflect = value => value;
// effectively equivalent to:
var reflect = function(value) {
    return value;
};


// 如果您传递了多个参数
var sum = (num1, num2) => num1 + num2;
// effectively equivalent to:
var sum = function(num1, num2) {
    return num1 + num2;
};

// 将括号中的对象文字包起来，表示大括号是一个对象文字而不是函数体
var getTempItem = id => ({ id: id, name: "Temp" });
// effectively equivalent to:
var getTempItem = function(id) {
    return {
        id: id,
        name: "Temp"
    };
};

// 创建立即调用的函数表达式
let person = function(name) {
    return {
        getName: function() {
            return name;
        }
    };

}("Nicholas");
console.log(person.getName());      // "Nicholas"
// 使用箭头函数完成相同的事情，只要在括号中包含箭头函数
let person = ((name) => {
    return {
        getName: function() {
            return name;
        }
    };
})("Nicholas");
console.log(person.getName());      // "Nicholas"

// --------箭头函数和数组接受回调功能，如阵列方法sort()，map()以及reduce()可以由较简单的箭头函数的语法
var result = values.sort(function(a, b) {
    return a - b;
});
// es6 arrow function
var result = values.sort((a, b) => a - b);

var sum = (num1, num2) => num1 + num2;
console.log(sum.call(null, 1, 2));      // 3
console.log(sum.apply(null, [1, 2]));   // 3
var boundSum = sum.bind(null, 1, 2);
console.log(boundSum());                // 3













