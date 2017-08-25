// ==============================Array.prototype方法
// 不改变初始数组：slice/concat/join/toString/valueof/foreach/entries/keys/filter/find/findindex/includes／indexOf／lastIndexOf／map／reduce／reduceRight
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

console.log("---------------------forEach-----------------------");
// forEach---遍历数组
let foreachArr = ["Cecilie", "Lone"];
foreachArr.forEach(function (item, index, array) {
    console.log(item, index);
    // Apple 0
		// Banana 1
    console.log(array); // ["Cecilie", "Lone"];
});

console.log("---------------------entries-----------------------");
// entries---转换数组---不修改初始数组，返回一个新的 Array 迭代器对象，包含每个索引的键和值
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator); // Array Iterator {}
for (let e of iterator) {
    console.log(e);
    // [0, "a"] 
		// [1, "b"] 
		// [2, "c"]
}

console.log("---------------------keys-----------------------");
// keys---转换数组---不修改初始数组，返回一个新的 Array 迭代器对象,包含每个索引的键
var keysArr = ["a", "b", "c"];
var keysiterator = keysArr.keys();
console.log(keysiterator); // Array keysIterator {}
for (let e of keysiterator) {
    console.log(e);
    // [0] 
		// [1] 
		// [2]
}

console.log("---------------------every-----------------------");
// every---测试数组---不修改初始数组，返回测试结果
// arr.every(callback[, thisArg])
// callback 被调用时传入三个参数：元素值，元素的索引，原数组
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
console.log(passed);
passed = [12, 54, 18, 130, 44].every(isBigEnough);
console.log(passed);

console.log("---------------------filter-----------------------");
// filter---测试数组---不修改初始数组，返回测试成功的数组
// 用来测试数组的每个元素的函数。
// 调用时使用参数 (element, index, array)。返回true表示保留该元素（通过测试），false则不保留
function isBiggerEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBiggerEnough);
console.log(filtered); // [12, 130, 44]
// ES6 way
const isBiggestEnough = value => value >= 10;
let [...spraed]= [12, 5, 8, 130, 44];
let filteresult = spraed.filter(isBiggestEnough);
console.log(filteresult); // [12, 130, 44]


console.log("---------------------find-----------------------");
// find---测试数组---不修改初始数组，返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined。
function isbigaEnough(element) {
  return element >= 15;
}
let findresult = [12, 5, 8, 130, 44].find(isbigaEnough); 
console.log(findresult); // 130

console.log("---------------------findIndex-----------------------");
// findIndex---测试数组---不修改初始数组，返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。
function isbigaEnough(element) {
  return element >= 15;
}
let findIndexresult = [12, 5, 8, 130, 44].findIndex(isbigaEnough); 
console.log(findresult); // 3

console.log("---------------------includes-----------------------");
// includes---测试数组---不修改初始数组，判断一个数组是否包含一个指定的值，返回 true或 false。
let includesArr = [1, 2, 3];
console.log( includesArr.includes(2)); // true 
console.log( includesArr.includes(4)); // false

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

console.log("---------------------map-----------------------");
// map---遍历数组---不修改初始数组，返回每个元素都调用一个提供的函数后返回的结果
let numbers = [1, 5, 10, 15];
let doubles = numbers.map((x) => {
   return x * 2;
});
console.log(numbers);
console.log(doubles);
let number2 = [1, 4, 9];
let roots = number2.map(Math.sqrt);
console.log(number2);
console.log(roots);

console.log("---------------------reduce-----------------------");
// reduce---遍历数组---不修改初始数组，返回每个元素都调用一个提供的函数后返回的结果
// 数组求和
var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value;
}, 0);
console.log(total); // 6 
// 将二维数组转化为一维
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b); 
}, []);
console.log(flattened); // [0, 1, 2, 3, 4, 5]

console.log("---------------------reduceRight-----------------------");
// reduceRight---遍历数组---不修改初始数组，返回一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值
let flatteneda = [
    [0, 1], 
    [2, 3], 
    [4, 5]
].reduceRight((a, b) => {
    return a.concat(b);
}, []);
console.log(flatteneda); // [4, 5, 2, 3, 0, 1]












