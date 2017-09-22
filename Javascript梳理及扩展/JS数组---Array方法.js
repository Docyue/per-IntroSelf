================================================================================
// Array类型
// 无论什么语言，数组与字符串的操作都是十分常见的，我们这里就来理一理我们javascript中的数组。

// 定义数组
// 定义数组的方式多种多样，我一般会用到其中两种，确切的说，我会用其中一种,数组字面量是我们所亲睐的做法。
// var arr = [];
// var arr = new Array();
// var arr = [1, 2, 3];
// var arr = new Array(1, 2, 3);
// javascript中数组的长度是不定的，数组各个项目的类型也是可以变的，所以用起来非常灵活。

// 检测数组
// 我们经常需要判断一个对象是不是数组（数组也是对象，其Array实一个构造函数哦），于是我们会用到以下方法：
// var a = arr.constructor == Array;//true
// var b = arr instanceof Array; //true
// var c = Array.isArray(arr); //true，ECMAScript5新增
// 本来instanceof足够满足条件了，但是有这么一个情况就是我们页面中存在几个框架，每个框架都有其window全局环境，所以就可能出现2个Array构造函数。


// ==============================Array方法
console.log("---------------------from-----------------------");
// from---创建数组-----从一个类似数组或可迭代的对象中创建一个新的数组实例
const fromarr = ["a", "b", "c"];
let newFromarr = Array.from(fromarr);
console.log(newFromarr);

console.log("---------------------isArray-----------------------");
// isArray---判断数组-----确定传递的值是否是一个 Array
console.log( Array.isArray([1, 2, 3]));  	// true
console.log( Array.isArray(Array.prototype));  	// true
console.log( Array.isArray({foo: 123}));  	// false
console.log( Array.isArray("foobar"));    // false
console.log( Array.isArray(undefined));  // false

console.log("---------------------of-----------------------");
// of---创建数组------创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
// Array.of() 和 Array 构造函数之间的区别在于处理整数参数：
// Array.of(7) 创建一个具有单个元素 7 的数组；
// Array(7) 创建一个包含 7 个 undefined 元素的数组；
console.log( Array.of(7));      // [7]
console.log( Array.of(1, 2, 3));// [1, 2, 3]
console.log( Array(7));         // [ , , , , , , ]
console.log( Array(1, 2, 3));   // [1, 2, 3]
