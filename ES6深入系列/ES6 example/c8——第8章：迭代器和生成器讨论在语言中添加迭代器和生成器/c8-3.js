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
    yield *createRepeatingIterator(result);
}

var iterator = createCombinedIterator();

console.log(iterator.next());           // "{ value: 1, done: false }"
console.log(iterator.next());           // "{ value: 2, done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: "repeat", done: false }"
console.log(iterator.next());           // "{ value: undefined, done: true }"














