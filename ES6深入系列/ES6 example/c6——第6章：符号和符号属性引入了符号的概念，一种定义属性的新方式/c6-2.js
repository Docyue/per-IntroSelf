// -----------检索符号属性
// 返回值Object.getOwnPropertySymbols()是自己的属性符号的数组
let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};
let symbols = Object.getOwnPropertySymbols(object);
console.log(symbols.length);        // 1
console.log(symbols[0]);            // "Symbol(uid)"
console.log(object[symbols[0]]);    // "12345"

// -----------Symbol 内部方法 
// Symbol.hasInstance- 用于instanceof确定对象继承的方法。
// Symbol.isConcatSpreadable- 一个布尔值，表示Array.prototype.concat()如果集合作为参数传递，则应展开该集合的元素Array.prototype.concat()。

// ------Symbol.hasInstance
// obj instanceof Array;
// 相当于
// Array[Symbol.hasInstance](obj);

// ------Symbol.isConcatSpreadable 合并数组
// ES5合并数组
let colors1 = [ "red", "green" ],
    colors2 = colors1.concat([ "blue", "black" ]);
console.log(colors2.length);    // 4
console.log(colors2);           // ["red","green","blue","black"]
// ES5合并数组
let colors3 = [ "red", "green" ],
    colors4 = colors3.concat([ "blue", "black" ], "brown");
console.log(colors4.length);    // 5
console.log(colors4);           // ["red","green","blue","black","brown"]
// Symbol.isConcatSpreadable 合并数组
let collection = {
    0: "Hello",
    1: "world",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
let messages = [ "Hi" ].concat(collection);
console.log(messages.length);    // 3
console.log(messages);           // ["Hi","Hello","world"]

// ------Symbol.match，Symbol.replace，Symbol.search和Symbol.split（字符串与正则）
// match(regex) - 确定给定的字符串是否匹配正则表达式
// replace(regex, replacement) - 用a替换正则表达式匹配 replacement
// search(regex) - 在字符串内找到正则表达式匹配
// split(regex) - 将字符串拆分为正则表达式匹配中的数组
// Symbol.match- 接受字符串参数并返回匹配数组的函数，或者null如果没有找到匹配项。
// Symbol.replace - 一个接受字符串参数和替换字符串并返回字符串的函数。
// Symbol.search - 接受字符串参数并返回匹配的数字索引的函数，如果未找到匹配则返回-1。
// Symbol.split - 一个接受字符串参数并返回一个数组的函数，该数组包含匹配字符串的字符串

// effectively equivalent to /^.{10}$/
let hasLengthOf10 = {
    [Symbol.match]: function(value) {
        return value.length === 10 ? [value] : null;
    },
    [Symbol.replace]: function(value, replacement) {
        return value.length === 10 ? replacement : value;
    },
    [Symbol.search]: function(value) {
        return value.length === 10 ? 0 : -1;
    },
    [Symbol.split]: function(value) {
        return value.length === 10 ? ["", ""] : [value];
    }
};
let message1 = "Hello world",   // 11 characters
    message2 = "Hello John";    // 10 characters
let match1 = message1.match(hasLengthOf10),
    match2 = message2.match(hasLengthOf10);
console.log(match1);            // null
console.log(match2);            // ["Hello John"]
let replace1 = message1.replace(hasLengthOf10, "Howdy!"),
    replace2 = message2.replace(hasLengthOf10, "Howdy!");
console.log(replace1);          // "Hello world"
console.log(replace2);          // "Howdy!"
let search1 = message1.search(hasLengthOf10),    
		search2 = message2.search(hasLengthOf10);
console.log(search1);           // -1
console.log(search2);           // 0
let split1 = message1.split(hasLengthOf10),
    split2 = message2.split(hasLengthOf10);
console.log(split1);            // ["Hello world"]
console.log(split2);            // ["", ""]



function Temperature(degrees) {
    this.degrees = degrees;
}
Temperature.prototype[Symbol.toPrimitive] = function(hint) {
    switch (hint) {
        case "string":
            return this.degrees + "\u00b0"; // degrees symbol

        case "number":
            return this.degrees;

        case "default":
            return this.degrees + " degrees";
    }
};
let freezing = new Temperature(32);
console.log(freezing + "!");            // "32 degrees!"
console.log(freezing / 2);              // 16
console.log(String(freezing));          // "32째"


// -----isArray
function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
}
console.log(isArray([]));   // true
// -----isJSON
function supportsNativeJSON() {
    return typeof JSON !== "undefined" &&
        Object.prototype.toString.call(JSON) === "[object JSON]";
}
// -----isPerson
// 突出了一个事实，Object.prototype.toString()即不再是识别对象类型的完全可靠的方式
function Person(name) {
    this.name = name;
}
Person.prototype[Symbol.toStringTag] = "Person";
Person.prototype.toString = function() {
    return this.name;
};
let me = new Person("Nicholas");
console.log(me.toString());                         // "Nicholas"
console.log(Object.prototype.toString.call(me));    // "[object Person]"

// ----------Symbol.unscopables数组的默认属性
// built into ECMAScript 6 by default
Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null), {
    copyWithin: true,
    entries: true,
    fill: true,
    find: true,
    findIndex: true,
    keys: true,
    values: true
});

















