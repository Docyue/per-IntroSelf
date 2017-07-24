// ----------ECMAScript 6通过添加更多的功能，如新的创建方法，几种有用的方便方法以及创建类型化数组的能力，继续改进阵列
// 在ECMAScript 6之前，创建数组有两种主要方法：Array构造函数和数组文字语法。
// 这两种方法都需要单独列出数组项目，否则相当有限。将类似数组的对象（即具有数字索引和length属性的对象）转换为数组的选项也受到限制，通常需要额外的代码。
// 为了使JavaScript阵列更容易创建，ECMAScript 6添加Array.of()和Array.from()方法。


let items = new Array(2);
console.log(items.length);          // 2
console.log(items[0]);              // undefined
console.log(items[1]);              // undefined
items = new Array("2");
console.log(items.length);          // 1
console.log(items[0]);              // "2"
items = new Array(1, 2);
console.log(items.length);          // 2
console.log(items[0]);              // 1
console.log(items[1]);              // 2
items = new Array(3, "2");
console.log(items.length);          // 2
console.log(items[0]);              // 3
console.log(items[1]);              // "2"


// ------Array.of()方法与Array构造函数类似，但对于单个数值没有特殊情况
// Array.of()方法始终创建一个包含其参数的数组，而不管参数或参数类型的数量
let items = Array.of(1, 2);
console.log(items.length);          // 2
console.log(items[0]);              // 1
console.log(items[1]);              // 2
items = Array.of(2);
console.log(items.length);          // 1
console.log(items[0]);              // 2
items = Array.of("2");
console.log(items.length);          // 1
console.log(items[0]);              // "2"


// ------Array.from（）
// 将非数组对象转换为实际的数组在JavaScript中一直很麻烦
// 数组的对象转换为ECMAScript 5中的数组，您将编写一个类似于此示例中的函数
function makeArray(arrayLike) {
    var result = [];

    for (var i = 0, len = arrayLike.length; i < len; i++) {
        result.push(arrayLike[i]);
    }

    return result;
}
function doSomething() {
    var args = makeArray(arguments);

    // use args
}

// 通过调用slice()数组类对象上的数组的本地方法
function makeArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
}
function doSomething() {
    var args = makeArray(arguments);

    // use args
}


// ECMAScript 6将该Array.from()方法作为一种明显而又干净的方式将对象转换为数组
// array.from()方法还用于this确定要返回的数组的类型。
function doSomething() {
    var args = Array.from(arguments);

    // use args
}



// ------映射转换
// 如果要进一步进行数组转换，则可以提供Array.from()映射函数作为第二个参数
// 该函数对数组类对象的每个值进行操作，并将其转换为最终形式，然后将结果存储在最终数组中的适当索引处
function translate() {
    return Array.from(arguments, (value) => value + 1);
}
let numbers = translate(1, 2, 3);
console.log(numbers);               // 2,3,4

// 如果映射函数在对象上，您还可以选择将第三个参数传递给Array.from()表示this映射函数的值
let helper = {
    diff: 1,

    add(value) {
        return value + this.diff;
    }
};
function translate() {
    return Array.from(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers);               // 2,3,4


// ------使用Iterables
// Array.from()方法适用于类似数组的对象和迭代
// 意味着该方法可以将具有Symbol.iterator属性的任何对象转换为数组
let numbers = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
};

let numbers2 = Array.from(numbers, (value) => value + 1);

console.log(numbers2);              // 2,3,4


















