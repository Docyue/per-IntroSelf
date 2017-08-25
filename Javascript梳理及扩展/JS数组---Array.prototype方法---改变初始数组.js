// ==============================Array.prototype方法
// 改变初始数组方法: pop/push/shift/unshift/reverse/splice/sort／copyWithin
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
// splice---删除数组元素-----修改初始数组，返回操作的元素
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
console.log("原:");		console.log(arr6) // [ 'Apple', 'Banana', 'Mango', 'Orange' ]
console.log("返回:");	console.log(newArr6) // [ 'Apple', 'Banana', 'Mango', 'Orange' ]

console.log("---------------------copyWithin-----------------------");
// copyWithin---复制数组元素----修改初始数组，返回新数组
// arr.copyWithin(target)／arr.copyWithin(target, start)／arr.copyWithin(target, start, end)
let copyWithinArr = ["alpha", "beta", "copy", "delta"]
let newcopyWithinArr = copyWithinArr.copyWithin(1, 2, 3);
console.log("原:");		console.log(copyWithinArr);
console.log("返回:");	console.log(newcopyWithinArr);


console.log("---------------------fill-----------------------");
// fill---填充数组---用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
// arr.fill(value)／arr.fill(value, start)／arr.fill(value, start, end)
var numbers = [1, 2, 3]
let newNum = numbers.fill(1);
console.log(numbers); // [1, 1, 1]
console.log(newNum); // [1, 1, 1]















