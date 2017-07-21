// -----------Iterables和for-of
// 与迭代器紧密相关的一个迭代是一个具有Symbol.iterator属性的对象。
// Symbol.iterator符号指定一个返回给定对象的迭代器的函数。所有集合对象（数组，集合和映射）和字符串都是ECMAScript 6中的迭代，因此它们具有指定的默认迭代器
// Symbol.iterator默认情况下，生成器分配属性


// for循环中跟踪索引的问题。迭代器是解决这个问题的第一部分。
// for-of环路是第二部分：它不再需要完全追踪指数到一个集合，让你自由地专注于与集合的内容合作
let values = [1, 2, 3];
for (let num of values) {
    console.log(num);
}
// 1
// 2
// 3
// -----访问默认迭代器
// 该代码获取默认的迭代器，values并使用它迭代数组中的项目
let values1 = [1, 2, 3];
let iterator = values1[Symbol.iterator]();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// Symbol.iterator指定了默认迭代器，因此可以使用它来检测对象是否可迭代
function isIterable(object) {
    return typeof object[Symbol.iterator] === "function";
}
console.log(isIterable([1, 2, 3]));     // true
console.log(isIterable("Hello"));       // true
console.log(isIterable(new Map()));     // true
console.log(isIterable(new Set()));     // true
console.log(isIterable(new WeakMap())); // false
console.log(isIterable(new WeakSet())); // false

// ------创建Iterables
// 默认情况下，开发人员定义的对象不可迭代，但您可以通过创建Symbol.iterator包含生成器的属性来使其可迭代
let collection = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }

};
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);
for (let x of collection) {
    console.log(x);
}
// 1 
// 2 
// 3

// -----集合迭代器
// ECMAScript 6有三种类型的集合对象：数组，映射和集合。所有这三个都有以下内置的迭代器来帮助您浏览其内容：
// entries() - 返回值为键/值对的迭代器
// values() - 返回一个迭代器，其值是集合的值
// keys() - 返回一个迭代器，其值是集合中包含的键

let colors = [ "red", "green", "blue" ];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();
data.set("title", "Understanding ECMAScript 6");
data.set("format", "ebook");
// ---entries()
for (let entry of colors.entries()) {
    console.log(entry);
}
for (let entry of tracking.entries()) {
    console.log(entry);
}
for (let entry of data.entries()) {
    console.log(entry);
}
// ---values()   
// values()方法是数组和集合的默认迭代器
// nodejs环境运行有问题
// for (let value of colors.values()) {
//     console.log(value);
// }
// for (let value of tracking.values()) {
//     console.log(value);
// }
// for (let value of data.values()) {
//     console.log(value);
// }

// ---keys()
for (let key of colors.keys()) {
    console.log(key);
}
for (let key of tracking.keys()) {
    console.log(key);
}
for (let key of data.keys()) {
    console.log(key);
}

// 默认迭代器
for (let value of colors) {
    console.log(value);
}
for (let num of tracking) {
    console.log(num);
}
for (let entry of data) {
    console.log(entry);
}

// -----对于映射的默认迭代器的行为在用于for-of具有解构的循环中也是有帮助的
let data1 = new Map();
data1.set("title", "Understanding ECMAScript 6");
data1.set("format", "ebook");
// same as using data1.entries()
for (let [key, value] of data1) {
    console.log(key + "=" + value);
}
// ------字符串迭代器
// ECMAScript 6旨在完全支持Unicode（参见第2章），默认字符串迭代器是尝试解决字符串迭代问题
var message = "A ð ®· B";
for (let c of message) {
    console.log(c);
}

// ------NodeList迭代器
// 通过在ECMAScript 6中添加默认迭代器，NodeList（包括在HTML规范中而不是ECMAScript 6本身）中的DOM定义包括与数组默认迭代器相同的默认迭代器。
// 这意味着您可以NodeList在for-of循环或使用对象的默认迭代器的任何其他位置使用
// var divs = document.getElementsByTagName("div");
// for (let div of divs) {
//     console.log(div.id);
// }










