// -----------所有数组的新方法
// -----find（）和findIndex（）方法
// ECMAScript 5添加了indexOf()和lastIndexOf()方法，最终允许开发人员搜索数组中的特定值。
// 这两种方法有很大的改进，但是它们仍然相当有限，因为您只能一次搜索一个值

// 如果您想要找到一系列数字中的第一个偶数
// ECMAScript 6通过介绍find()和findIndex()方法解决了这个问题

// find()返回值，而findIndex()返回找到该值的索引
let numbers = [25, 30, 35, 40, 45];
console.log(numbers.find(n => n > 33));         // 35
console.log(numbers.findIndex(n => n > 33));    // 2

// ------fill()方法使用特定值填充一个或多个数组元素（会改变原属组）
// 如果开始或结束索引都为负数，则将这些值添加到数组的长度以确定最终位置
let numbers1 = [1, 2, 3, 4];
numbers1.fill(1);
console.log(numbers1.toString());    // 1,1,1,1
numbers1.fill(1, 2);// 2指示开始在索引2处填充元素
console.log(numbers1.toString());    // 1,2,1,1
numbers1.fill(0, 1, 3); // 用索引1和2填充数组元素0
console.log(numbers1.toString());    // 1,0,0,1


// ------copyWithin()方法类似于fill()它同时更改多个数组元素。
// 但是，copyWithin()您可以从数组本身复制数组元素值而不是指定单个值来分配给数组元素

// 将数组中前两个元素的值复制到数组中的最后两个项目
let numbers2 = [1, 2, 3, 4];
// paste values into array starting at index 2
// copy values from array starting at index 0
numbers2.copyWithin(2, 0);
console.log(numbers2.toString());    // 1,2,1,2

// 第三个参数，用以限制要覆盖的元素数量
// paste values into array starting at index 2
// copy values from array starting at index 0
// stop copying values when you hit index 1
numbers.copyWithin(2, 0, 1);
console.log(numbers.toString());    // 1,2,1,4


























