// ---------类型化的数组允许存储和操作八种不同的数字类型
// 签名的8位整数（int8）
// 无符号8位整数（uint8）
// 有符号的16位整数（int16）
// 无符号16位整数（uint16）
// 签名的32位整数（int32）
// 无符号32位整数（uint32）
// 32位浮点数（float32）
// 64位浮点数（float64）
// ------操纵数组缓冲区与视图
// 数组缓冲区表示内存位置，视图是用于操作该内存的接口
let buffer = new ArrayBuffer(10),
    view = new DataView(buffer);
let view3 = new DataView(buffer, 5, 2);  
let view1 = new DataView(buffer),           // cover all bytes
    view2 = new DataView(buffer, 5, 2);     // cover bytes 5 and 6

console.log(view1.buffer === buffer);       // true
console.log(view2.buffer === buffer);       // true
console.log(view1.byteOffset);              // 0
console.log(view2.byteOffset);              // 5
console.log(view1.byteLength);              // 10
console.log(view2.byteLength);              // 2

// ---------常用方法
// 类型化数组还包括大量与功能上等同于常规数组方法的方法。您可以对类型数组使用以下数组方法：

// copyWithin()
// entries()
// fill()
// filter()
// find()
// findIndex()
// forEach()
// indexOf()
// join()
// keys()
// lastIndexOf()
// map()
// reduce()
// reduceRight()
// reverse()
// slice()
// some()
// sort()
// values()
// 
// 尽管这些方法与其对应方式Array.prototype相同，但它们并不完全相同
// 类型化数组方法对数字类型的安全性进行了额外的检查，当返回数组时，将返回一个类型化的数组而不是常规数组（由于Symbol.species）

let ints = new Int16Array([25, 50]),
    mapped = ints.map(v => v * 2);
console.log(mapped.length);        // 2
console.log(mapped[0]);            // 50
console.log(mapped[1]);            // 100
console.log(mapped instanceof Int16Array);  // true

// 类型化数组与常规数组具有相同的三个迭代器
// entries()方法，keys()方法和values()方法
// 这意味着您可以使用扩展运算符并for-of循环使用类型化的数组，就像使用常规数组一样
let ints = new Int16Array([25, 50]),
    intsArray = [...ints];
console.log(intsArray instanceof Array);    // true
console.log(intsArray[0]);                  // 25
console.log(intsArray[1]);                  // 50

// of（）和from（）方法
// 所有类型的阵列具有静态of()和from()的作用就像方法Array.of()和Array.from()方法
// 不同之处在于类型化数组的方法返回一个类型化的数组，而不是常规数组
let ints = Int16Array.of(25, 50),
    floats = Float32Array.from([1.5, 2.5]);
console.log(ints instanceof Int16Array);        // true
console.log(floats instanceof Float32Array);    // true
console.log(ints.length);       // 2
console.log(ints[0]);           // 25
console.log(ints[1]);           // 50
console.log(floats.length);     // 2
console.log(floats[0]);         // 1.5
console.log(floats[1]);         // 2.5

// 类型化数组和常规数组之间最重要的区别是类型化的数组不是常规数组
// 类型化数组在传递类型化数组时不会继承Array并Array.isArray()返回false
let ints = new Int16Array([25, 50]);
console.log(ints instanceof Array);     // false
console.log(Array.isArray(ints));       // false

// 行为差异
// 虽然常规数组可以随着它们的交互而增长和缩小，但类型化的数组总是保持相同的大小
let ints = new Int16Array([25, 50]);
console.log(ints.length);          // 2
console.log(ints[0]);              // 25
console.log(ints[1]);              // 50
ints[2] = 5;
console.log(ints.length);          // 2
console.log(ints[2]);              // undefined

// 在类型化数组中修改值的所有方法都会执行相同的限制
// 如果传递的函数map()为类型化的数组返回一个无效值，则0改为使用
let ints = new Int16Array([25, 50]),
    mapped = ints.map(v => "hi");
console.log(mapped.length);        // 2
console.log(mapped[0]);            // 0
console.log(mapped[1]);            // 0
console.log(mapped instanceof Int16Array);  // true
console.log(mapped instanceof Array);       // false


// -----------缺少方法
// 键入的数组确实有许多与常规数组相同的方法，但它们也缺少几种数组方法
// concat()
// pop()
// push()
// shift()
// splice()
// unshift()
// 除了concat()方法，此列表中的方法可以更改数组的大小。
// 类型化的数组不能改变大小，这就是为什么这些数组不适用于类型数组
// ------附加方法
// 型化数组方法有两种方法不存在于常规数组：the set()和subarray()
// set()将另一个数组复制到现有类型数组中的对立面
// subarray()将现有类型数组的一部分提取为新的类型化数组

// 该set()方法接受一个数组（打字或常规）和可插入数据的可选偏移量;
// 如果没有传递，则offset将默认为零。
// 数组参数中的数据被复制到目标类型数组中，同时确保仅使用有效的数据类型
let ints = new Int16Array(4);
ints.set([25, 50]);
ints.set([75, 100], 2);
console.log(ints.toString());   // 25,50,75,100

// subarray()方法接受可选的起始和结束索引（结束索引是独占的，如slice()方法中所示），并返回一个新的类型化数组
// 您也可以省略两个参数来创建类型化数组的克隆
let ints = new Int16Array([25, 50, 75, 100]),
    subints1 = ints.subarray(),
    subints2 = ints.subarray(2),
    subints3 = ints.subarray(1, 3);
console.log(subints1.toString());   // 25,50,75,100
console.log(subints2.toString());   // 75,100
console.log(subints3.toString());   // 50,75




// --------------------概要
// ECMAScript 6通过使数组更有用，继续ECMAScript 5的工作。还有两种方法来创建数组：the Array.of()和Array.from()methods。该Array.from()方法还可以将迭代和类似数组的对象转换为数组。这两种方法都由派生数组类继承，并使用该Symbol.species属性来确定应该返回哪种类型的值（其他继承的方法Symbol.species在返回数组时也会使用）。

// 数组上还有几种新的方法。该fill()和copyWithin()方法允许你改变就地数组元素。该find()和findIndex()方法对于查找符合某些条件的数组中的第一个元素很有用。前者返回符合条件的第一个元素，后者返回元素的索引。

// 类型化的数组不是技术上的数组，因为它们不会继承Array，但它们的外观和行为很像数组。类型化数组包含八种不同的数字数据类型之一，并且构建在ArrayBuffer表示数字或一系列数字的基本位的对象上。类型化数组是进行按位运算的更有效的方法，因为这些值不是在格式之间来回转换，如JavaScript编号类型所示。














