// ==============================Array.prototype方法
// 不改变初始数组：slice/concat/join/toString/toLocaleString/valueof/indexOf/lastIndexOf/includes
console.log("---------------------slice-----------------------");
// slice---操作数组-----不修改初始数组，返回操作的元素
var arr7 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var newArr7 = arr7.slice(1,3);
// 反方向操作元素数量，第二个参数可选
var newArr7a = arr7.slice(-3);
// 复制数组
var newArr7b = arr7.slice();
console.log("原:"); 		console.log(arr7); // [ 'Banana', 'Orange', 'Lemon', 'Apple', 'Mango' ]
console.log("返回:"); 	console.log(newArr7); // [ 'Orange', 'Lemon' ]
console.log("返回:"); 	console.log(newArr7a); // [ 'Lemon', 'Apple', 'Mango' ]
console.log("返回:"); 	console.log(newArr7b); // [ 'Banana', 'Orange', 'Lemon', 'Apple', 'Mango' ]

console.log("---------------------concat-----------------------");
// concat---合并3个数组-----不修改初始数组，返回新数组
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var kai = ["Robin"];
var children = hege.concat(stale,kai);
console.log("原:"); 		console.log(hege); // [ 'Cecilie', 'Lone' ]
console.log("返回:"); 	console.log(children); // [ 'Cecilie', 'Lone', 'Emil', 'Tobias', 'Linus', 'Robin' ]

console.log("---------------------join-----------------------");
// join---join参数组成字符串------不修改初始数组，返回字符串
var fruits = ["Banana", "Orange", "Apple", "Mango"];
let newFruits =fruits.join("-");
console.log("原:"); 		console.log(fruits); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log("返回:"); 	console.log(newFruits); // Banana-Orange-Apple-Mango

console.log("---------------------toString-----------------------");
// toString---数组转成字符串-----不修改初始数组，返回字符串
var fresh = ["Banana", "Orange", "Apple", "Mango"];
var str = fresh.toString();
console.log("原:");		console.log(fresh); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log("返回:");	console.log(str); // Banana,Orange,Apple,Mango

console.log("---------------------toLocaleString-----------------------");
// toLocaleString---数组转成字符串-----不修改初始数组，返回字符串
var freshtoLString = ["Banana", "Orange", "Apple", "Mango"];
var Lstr = freshtoLString.toLocaleString();
console.log("原:");		console.log(freshtoLString); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log("返回:");	console.log(Lstr); // Banana,Orange,Apple,Mango

console.log("---------------------valueOf-----------------------");
// valueOf---数组转成字符串-----不修改初始数组，返回数组对象的原始值
var valueArr = ["Banana", "Orange", "Apple", "Mango"];
var valueStr = valueArr.valueOf();
console.log("原:");		console.log(valueArr); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log("返回:");	console.log(valueStr); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]


console.log("---------------------indexOf-----------------------");
// indexOf---测试数组---不修改初始数组，返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
let indexOfArr = [2, 9, 7, 8, 9];
console.log( indexOfArr.indexOf(2)); // 0
console.log( indexOfArr.indexOf(6)); // -1
console.log( indexOfArr.indexOf(7)); // 2
console.log( indexOfArr.indexOf(8)); // 3
console.log( indexOfArr.indexOf(9)); // 1
// 条件判断，如元素不存在。。。
if (indexOfArr.indexOf(3) === -1) {
  // element doesn't exist in array
}

console.log("---------------------lastIndexOf-----------------------");
// lastIndexOf---测试数组---不修改初始数组，返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
let lastIndexOfArr = [2, 9, 7, 8, 9];
console.log( lastIndexOfArr.lastIndexOf(2)); // 0
console.log( lastIndexOfArr.lastIndexOf(6)); // -1
console.log( lastIndexOfArr.lastIndexOf(7)); // 2
console.log( lastIndexOfArr.lastIndexOf(8)); // 3
console.log( lastIndexOfArr.lastIndexOf(9)); // 1
// 条件判断，如元素不存在。。。
if (lastIndexOfArr.lastIndexOf(3) === -1) {
  // element doesn't exist in array
}

console.log("---------------------includes-----------------------");
// includes---测试数组---不修改初始数组，判断一个数组是否包含一个指定的值，返回 true或 false。
let includesArr = [1, 2, 3];
console.log( includesArr.includes(2)); // true
console.log( includesArr.includes(4)); // false
