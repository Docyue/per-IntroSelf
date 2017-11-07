// -----------迭代器和生成器
// 迭代器只是具有为迭代设计的特定接口的对象
// 迭代器使数据集合更容易，ECMAScript 6将JavaScript添加到迭代器中。当添加新的数组方法和新类型的集合（如集合和映射）时，迭代器是高效数据处理的关键，您将在语言的许多部分找到它们。
// for-of与迭代器一起使用的新循环，spread（...）运算符使用迭代器，迭代器甚至使异步编程更容易
// 所有迭代器对象都有一个next()返回结果对象的方法。结果对象有两个属性：value它是下一个值，并且done是一个布尔值，true当没有更多的值返回时
// 迭代器保留内部指针到值集合中的位置，并且每次调用该next()方法时，它返回下一个适当的值。

// ------使用ECMAScript 5创建迭代器
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            return {
                done: done,
                value: value
            };

        }
    };
}
var iterator = createIterator([1, 2, 3]);
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"
// for all further calls
console.log(iterator.next());           // "{ value: undefined, done: true }"

// ----------生成器 ECMAScript 6还提供了生成器，这使得创建迭代器对象更简单
// generator
function *createIterator() {
    yield 1;
    yield 2;
    yield 3;
}

// generators are called like regular functions but return an iterator1
let iterator1 = createIterator();

console.log(iterator1.next().value);     // 1
console.log(iterator1.next().value);     // 2
console.log(iterator1.next().value);     // 3
console.log(iterator1.next().value);     // undefined


// yield关键字可以与任何值或表达式一起使用，因此您可以编写生成器函数，将项目添加到迭代器，而不必逐个列出项目
function *createIterator1(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
}
let iterator2 = createIterator1([1, 2, 3]);
console.log(iterator2.next());           // "{ value: 1, done: false }"
console.log(iterator2.next());           // "{ value: 2, done: false }"
console.log(iterator2.next());           // "{ value: 3, done: false }"
console.log(iterator2.next());           // "{ value: undefined, done: true }"
// for all further calls
console.log(iterator2.next());           // "{ value: undefined, done: true }"

// ------用函数表达式创建生成器
// 创建生成器的函数不能是箭头函数
let createIterator2 = function *(items) {
    for (let i = 0; i < items.length; i++) {
        yield items[i];
    }
};
let iterator3 = createIterator2([1, 2, 3]);
console.log(iterator3.next());           // "{ value: 1, done: false }"
console.log(iterator3.next());           // "{ value: 2, done: false }"
console.log(iterator3.next());           // "{ value: 3, done: false }"
console.log(iterator3.next());           // "{ value: undefined, done: true }"
// for all further calls
console.log(iterator3.next());           // "{ value: undefined, done: true }"

// ------对象方法
// 使用函数表达式在ECMAScript 5样式的对象文字中创建一个生成器
var o = {
    createIterator3: function *(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
};
let iterator = o.createIterator3([1, 2, 3]);
// 使用ECMAScript 6方法的简写
var o = {
    *createIterator4(items) {
        for (let i = 0; i < items.length; i++) {
            yield items[i];
        }
    }
};
let iterator = o.createIterator4([1, 2, 3]);




// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 