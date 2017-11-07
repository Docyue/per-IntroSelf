// ----------ES5未命名参数
console.log("// ----------ES5未命名参数");
function pick(object) {
    let result = Object.create(null);

    // start at the second parameter
    for (let i = 1, len = arguments.length; i < len; i++) {
        result[arguments[i]] = object[arguments[i]];
    }
    console.log(result);
    return result;
}

let book = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};

let bookData = pick(book,"author", "year");

console.log(bookData.author);   // "Nicholas C. Zakas"
console.log(bookData.year);     // 2015

// ----------ES6 REST参数
console.log("// ----------ES6 REST参数");
function picka(object, ...keys) {
    let result = Object.create(null);

    for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = object[keys[i]];
    }

    return result;
}
let booka = {
    title: "Understanding ECMAScript 6",
    author: "Nicholas C. Zakas",
    year: 2015
};
let bookDataa = picka(booka,"author", "year");
console.log(bookDataa.author);   // "Nicholas C. Zakas"
console.log(bookDataa.year);     // 2015


// 第一个限制只能有一个 rest参数,必须为最后一个
// Syntax error: Can't have a named parameter after rest parameters
// function pickb(object, ...keys, last) {
//     let result = Object.create(null);

//     for (let i = 0, len = keys.length; i < len; i++) {
//         result[keys[i]] = object[keys[i]];
//     }

//     return result;
// }
// 第二个限制是在对象文字设置器中不能使用其余的参数：存在此限制，因为对象字面值设置器仅限于单个参数。根据定义，Rest参数是无数个参数，所以在这个上下文中它们是不允许的。
// let object = {

//     // Syntax error: Can't use rest param in setter
//     set name(...value) {
//         // do something
//     }
// };


// ----------Rest参数如何影响参数Object
console.log("// ----------Rest参数如何影响参数Object");
function checkArgs(...args) {
    console.log(args.length);
    console.log(arguments.length);
    console.log(args[0], arguments[0]);
    console.log(args[1], arguments[1]);
}

checkArgs("a", "b");

// ----------Rest参数 扩展运算符
// Math.max() 两个值
let value1 = 25,
    value2 = 50;

console.log(Math.max(value1, value2));      // 50
//  Math.max() 多个值
let values = [25, 50, 75, 100]
console.log(Math.max.apply(Math, values));  // 100

















