// 注意不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态， 因为这些方法都是在原数组的基础上修改，
// concat、slice、filter会返回一个新的数组

console.log("---------------------pop-----------------------");
// pop---删除数组最后一个元素-----修改初始数组组，返回删除的元素
var arr = ["Banana", "Orange", "Apple", "Mango"];
let newArr = arr.pop(); 
console.log("原:");		console.log(arr); // [ 'Banana', 'Orange', 'Apple' ]
console.log("返回:");	console.log(newArr); // Mango

console.log("---------------------push-----------------------");
// push---从数组最后插入一个元素-----修改初始数组，返回新数组长度
var arr1 = ["Banana", "Orange", "Apple", "Mango"];
let newArr1 = arr1.push("Kiwi")
console.log("原:"); 		console.log(arr1); // [ 'Banana', 'Orange', 'Apple', 'Mango', 'Kiwi' ]
console.log("返回:");	console.log(newArr1); // 5

console.log("---------------------shift-----------------------");
// shift---删除数组第一个元素-----修改初始数组组，返回删除的元素
var arr2 = ["Banana", "Orange", "Apple", "Mango"];
var newArr2 = arr2.shift();
console.log("原:"); 		console.log(arr2);	// [ 'Orange', 'Apple', 'Mango' ]
console.log("返回:"); 	console.log(newArr2);	// Banana

console.log("---------------------unshift-----------------------");
// unshift---从数组前面插入一个元素-----修改初始数组组，返回新数组长度
var arr3 = ["Banana", "Orange", "Apple", "Mango"];
var newArr3 = arr3.unshift("Lemon","Pineapple");
console.log("原:"); 		console.log(arr3);	// [ 'Lemon', 'Pineapple', 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log("返回:"); 	console.log(newArr3);	// 6

console.log("---------------------reverse-----------------------");
// reverse---反转数组-----修改初始数组，返回新数组
var arr4 = ["Banana", "Orange", "Apple", "Mango"];
let newArr4 = arr4.reverse();
console.log("原:"); 		console.log(arr4); // [ 'Mango', 'Apple', 'Orange', 'Banana' ]
console.log("返回:"); 	console.log(newArr4); // [ 'Mango', 'Apple', 'Orange', 'Banana' ]

console.log("---------------------splice-----------------------");
// splice---反转数组-----修改初始数组，返回操作的元素
var arr5 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var newArr5 = arr5.splice(1,3);
console.log("原:"); 		console.log(arr5); // [ 'Banana', 'Mango' ]
console.log("返回:"); 	console.log(newArr5); // [ 'Orange', 'Lemon', 'Apple' ]
// 反方向删除元素，第二个参数可选，第三个参数可选-----修改初始数组,返回操作的元素
var newArr5a = arr5.splice(-1);
console.log("原:"); 		console.log(arr5); // [ 'Banana' ]
console.log("返回:"); 	console.log(newArr5a); // [ 'Mango' ]
// 插入元素，第二个参数可为“ ”,可插入多个元素-----修改初始数组,返回空[]
var newArr5b = arr5.splice(1,"",'gogo',"hahha");
console.log("原:"); 		console.log(arr5); // [ 'Banana', 'gogo', 'hahha' ]
console.log("返回:"); 	console.log(newArr5b); // []

console.log("---------------------sort-----------------------");
// sort---数组排序----修改初始数组，返回新数组
var arr6 = ["Banana", "Orange", "Apple", "Mango"];
let newArr6 = arr6.sort();
console.log("原:");		console.log(arr6)
console.log("返回:");	console.log(newArr6)


console.log("---------------------slice-----------------------");
// slice---反转数组-----不修改初始数组，返回操作的元素
var arr7 = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var newArr7 = arr7.slice(1,3);
// 反方向操作元素数量，第二个参数可选
var newArr7a = arr7.slice(-3);
console.log("原:"); 		console.log(arr7);
console.log("返回:"); 	console.log(newArr7);
console.log("返回:"); 	console.log(newArr7a);

console.log("---------------------concat-----------------------");
// concat---合并3个数组-----不修改初始数组，返回新数组
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var kai = ["Robin"];
var children = hege.concat(stale,kai);
console.log("原:"); 		console.log(hege);
console.log("返回:"); 	console.log(children); // [ 'Cecilie', 'Lone', 'Emil', 'Tobias', 'Linus', 'Robin' ]

console.log("---------------------join-----------------------");
// join---join参数组成字符串------不修改初始数组，返回字符串
var fruits = ["Banana", "Orange", "Apple", "Mango"];
let newFruits =fruits.join("-");
console.log("原:"); 		console.log(fruits);
console.log("返回:"); 	console.log(newFruits); // Banana-Orange-Apple-Mango

console.log("---------------------toString-----------------------");
// toString---数组转成字符串-----不修改初始数组，返回字符串
var fresh = ["Banana", "Orange", "Apple", "Mango"];
var str = fresh.toString();
console.log("原:");		console.log(fresh);
console.log("返回:");	console.log(str);





