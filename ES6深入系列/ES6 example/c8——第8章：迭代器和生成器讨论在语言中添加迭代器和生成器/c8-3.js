// ----------扩展运算符和非阵列条件
// 扩展运算符（...）可以用于将集合转换为数组
// 扩展运算符对所有的迭代器运行，并使用默认的迭代器来确定要包含的值
// 所有值都从迭代器中读取，并按照从迭代器返回值的顺序插入到数组中
let set = new Set([1, 2, 3, 3, 3, 4, 5]),
    array = [...set];
console.log(array);             // [1,2,3,4,5]
//-------扩展运算符转换map成数组的数组
let map = new Map([ ["name", "Nicholas"], ["age", 25]]),
    array1 = [...map];
console.log(array1);         // [ ["name", "Nicholas"], ["age", 25]]

// ------可以使用数组文字中的扩展运算符多次，您可以使用它，无论您想从迭代中插入多个项目;
// 这些项目只会在展开操作符位置的新阵列中顺序出现;
let smallNumbers = [1, 2, 3],
    bigNumbers = [100, 101, 102],
    allNumbers = [0, ...smallNumbers, ...bigNumbers];

console.log(allNumbers.length);     // 7
console.log(allNumbers);    // [0, 1, 2, 3, 100, 101, 102]



// -----------高级迭代器功能
// 通过next()方法将参数传递给迭代器,该参数将成为yield生成器内的语句的值

function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;       // 4 + 2
    yield second + 3;                   // 5 + 3
}
let iterator = createIterator();
console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next(4));          // "{ value: 6, done: false }"
console.log(iterator.next(5));          // "{ value: 8, done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// ------可以使用try-catch块来捕获发生器内的这些错误
function *createIterator1() {
    let first = yield 1;
    let second;
    try {
        second = yield first + 2;       // yield 4 + 2, then throw
    } catch (ex) {
        second = 6;                     // on error, assign a different value
    }
    yield second + 3;
}

let iterator1 = createIterator1();

console.log(iterator1.next());                   // "{ value: 1, done: false }"
console.log(iterator1.next(4));                  // "{ value: 6, done: false }"
console.log(iterator1.throw(new Error("Boom"))); // "{ value: 9, done: false }"
console.log(iterator1.next());                   // "{ value: undefined, done:true }"



// 生成器委托还允许您进一步使用生成器返回值。
// 这是访问这些返回值的最简单方法，可以在执行复杂任务时非常有用
function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}

function *createRepeatingIterator(count) {
    for (let i=0; i < count; i++) {
        yield "repeat";
    }
}

function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield result;
    yield *createRepeatingIterator(result);
}

var iterator = createCombinedIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: 3, done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"

// ------------异步任务运行
// JavaScript中的异步编程是一把双刃剑：简单的任务很容易做异步，而复杂的任务成为代码组织中的一个差异。
// 由于生成器允许您在执行过程中有效地暂停代码，因此它们打开了与异步处理相关的许多可能性

// 传统的执行异步操作的方法是调用回调函数,
// 从Node.js中的磁盘读取文件
let fs = require("fs");
fs.readFile("config.json", function(err, contents) {
    if (err) {
        throw err;
    }
    doSomethingWith(contents);
    console.log("Done");
});


// 因为yield停止执行并等待next()方法再次启动，您可以实现异步调用而不管理回调
function run(taskDef) {
    // create the iterator, make available elsewhere
    let task = taskDef();
    // start the task
    let result = task.next();
    // recursive function to keep calling next()
    function step() {

        // if there's more to do
        if (!result.done) {
            result = task.next();
            step();
        }
    }
    // start the process
    step();
}
// 参数result.value传递给next()它，可以在yield调用之间传递数据
run(function*() {
    let value = yield 1;
    console.log(value);         // 1

    value = yield value + 3;
    console.log(value);         // 4
});

// result.value是函数（用===运算符检查），它被调用一个回调函数。
// 该回调函数遵循Node.js约定，它将任何可能的错误作为第一个参数（err）传递，结果作为第二个参数
function run(taskDef) {

    // create the iterator, make available elsewhere
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to keep calling next()
    function step() {

        // if there's more to do
        if (!result.done) {
            if (typeof result.value === "function") {
                result.value(function(err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }

        }
    }

    // start the process
    step();
}




let fs = require("fs");

function readFile(filename) {
    return function(callback) {
        fs.readFile(filename, callback);
    };
}

run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});




// ----------概要
// 迭代器是ECMAScript 6的重要组成部分，是几个关键语言元素的根源。表面上，迭代器提供了一种使用简单API返回值序列的简单方法。然而，在ECMAScript 6中使用迭代器有更复杂的方法。

// 该Symbol.iterator符号用于定义对象的默认迭代器。内置对象和开发人员定义的对象都可以使用此符号来提供返回迭代器的方法。当Symbol.iterator对象被提供时，该对象被认为是可迭代的。

// for-of循环使用iterables 在循环中返回一系列值。使用for-of比使用传统for循环更容易，因为您不再需要跟踪值并在循环结束时进行控制。该for-of循环自动从迭代器，直到有没有更多的读取所有的值，然后退出。

// 为了for-of更容易使用，ECMAScript 6中的许多值具有默认迭代器。所有的集合类型，即数组，映射和集合 - 都具有旨在使其内容易于访问的迭代器。字符串也有一个默认的迭代器，它使得迭代字符串的字符（而不是代码单元）变得容易。

// 扩展运算符可以使用任何可迭代的方法，并将易于将迭代转换为数组也很容易。该转换通过从迭代器读取值并将它们单独插入到数组中起作用。

// 一个生成器是一个特殊的函数，在调用时自动创建一个迭代器。发生器定义由star（*）字符表示，并且使用yield关键字来指示为每次连续调用该next()方法返回哪个值。

// 生成器委托通过让新的生成器重用现有的生成器来鼓励迭代器行为的良好封装。您可以通过调用yield *而不是使用另一个生成器中的现有生成器yield。此过程允许您创建一个从多个迭代器返回值的迭代器。

// 也许生成器和迭代器最有趣和令人兴奋的方面是创建更干净的异步代码的可能性。而不需要在任何地方使用回调，您可以设置看起来同步的代码，但实际上用于yield等待异步操作完成。



















