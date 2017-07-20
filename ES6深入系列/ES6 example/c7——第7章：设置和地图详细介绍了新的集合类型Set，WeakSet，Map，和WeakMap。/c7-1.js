// ----------在ECMAScript 5中设置和映射
// ECMAScript 5中，开发人员通过使用对象属性来模拟集合和映射
let set = Object.create(null);
set.foo = true;
// checking for existence
if (set.foo) {
    // do something
}

// 在ECMAScript 6中设置
// ECMAScript 6添加一个Set类型，它是没有重复项的值的有序列表。集允许快速访问它们包含的数据，添加更有效的跟踪离散值的方式
// 创建集合和添加项目
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);    // 2

// 唯一的例外是-0和+0被认为是相同的，向集合添加多个对象，并且这些对象将保持不变
let set = new Set(),
    key1 = {},
    key2 = {};

set.add(key1);
set.add(key2);
console.log(set.size);    // 2

// add()方法多次调用相同的值，则第一个调用之后的所有调用都将被有效地忽略
let set = new Set();
set.add(5);
set.add("5");
set.add(5);     // duplicate - this is ignored
console.log(set.size);    // 2


// 使用具有重复值的数组来初始化该集合
let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set.size);    // 5

// 使用has()方法测试集合中的哪些值
let set = new Set();
set.add(5);
set.add("5");
console.log(set.has(5));    // true
console.log(set.has(6));    // false


// 也可以从集合中删除值。您可以使用该delete()方法删除单个值，也可以通过调用该clear()方法从集合中删除所有值。