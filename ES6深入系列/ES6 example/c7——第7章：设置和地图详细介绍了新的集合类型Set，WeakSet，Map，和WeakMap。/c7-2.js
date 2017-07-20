// ----------forEach（）方法集合
// forEach()方法传递一个接受三个参数的回调函数：
// 从集合中的下一个位置的值
// 与第一个参数相同的值
// 读取值的集合

// 除了参数的不同之外，forEach()对于一个数组来说，使用基本上是一样的
let set = new Set([1, 2]);
set.forEach(function(value, key, ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set);
});
// 1 1 
// true 
// 2 2 
// true
// forEach()如果你需要this在你的回调函数中使用
let seta = new Set([1, 2]);
let processor = {
    output(value) {
        console.log(value);
    },
    process(dataSet) {
        dataSet.forEach(function(value) {
            this.output(value);
        }, this);
    }
};
processor.process(seta);
// 1 2

let setb = new Set([1, 2]);
let processora = {
    output(value) {
        console.log(value);
    },
    process(dataSeta) {
        dataSeta.forEach((value) => this.output(value));
    }
};
processora.process(setb);
// 1 2

// ----------将集合转换为数组
// 可以使用扩展运算符来处理可迭代对象（如集合），将其转换为数组
// 会删除重复项；
// 不会改变原数组
let act = [1, 2, 3, 3, 3, 4, 5];
let setc = new Set(act),
    array = [...setc];

console.log(act);           //原数组不改变
console.log(array);             // [1,2,3,4,5]

// ----------弱集
// 该Set类型可以替代地称为强集合，因为它存储对象引用的方式
// 只要Set存在对该实例的引用，该对象就不能被垃圾回收以释放内存
// 会内存泄露（如果您的JavaScript代码在网页中运行，想要跟踪可能被另一个脚本删除的DOM元素，则不希望您的代码保持对DOM元素的最后引用）
let setd = new Set(),
    key = {};
setd.add(key);
console.log(setd.size);      // 1
// eliminate original reference
key = null;
console.log(setd.size);      // 1
// get the original reference back
key = [...setd][0];


// -----创建一个弱集
// 使用WeakSet构造函数创建弱集，具有add()方法，has()方法和delete()方法

let sete = new WeakSet(),
    keya = {};
// add the object to the set
sete.add(keya);
console.log(sete.has(keya));      // true
sete.delete(keya);
console.log(sete.has(keya));      // false


// 可以通过向构造函数传递一个可迭代的方式来种子一个弱值集
let key1 = {},
    key2 = {},
    setf = new WeakSet([key1, key2]);

console.log(setf.has(key1));     // true
console.log(setf.has(key2));     // true

// 弱集和常规集之间的最大差异是对对象价值的弱参考
let setg = new WeakSet(),
    key3 = {};

// add the object to the set
setg.add(key3);
console.log(setg.has(key3));      // true
// remove the last strong reference to key3, also removes from weak setg
key3 = null;


// 弱集与常规集有某些特征，但有一些关键的区别
// 1、在一个WeakSet实例中，该add()方法在传递非对象（has()并且delete()始终false为非对象参数返回）时抛出错误。
// 2、弱集合不是迭代，因此不能在for-of循环中使用。
// 3、弱集不会暴露任何迭代器（例如keys()和values()方法），因此无法以编程方式确定弱集的内容。
// 4、弱集没有forEach()方法。
// 5、弱套没有size 方法。
// -----弱集合的看似有限的功能是必要的，以便正确处理内存。一般来说，如果只需要跟踪对象引用，那么应该使用弱集而不是常规集
































