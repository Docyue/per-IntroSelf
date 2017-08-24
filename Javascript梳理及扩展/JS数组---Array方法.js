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







 


