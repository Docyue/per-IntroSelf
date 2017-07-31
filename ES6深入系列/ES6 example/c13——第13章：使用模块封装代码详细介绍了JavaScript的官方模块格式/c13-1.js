// --------------封装代码与模块
// ----模块代码在严格模式下自动运行，无法选择退出严格模式。
// ----在模块顶层创建的变量不会自动添加到共享的全局作用域中。它们仅存在于模块的顶层范围内。
// ----this模块顶层的值是undefined。
// ----模块不允许代码中的HTML样式注释（JavaScript早期浏览器日期的剩余功能）。
// ----模块必须将任何应该可用于代码的东西导出到模块之外。
// ----模块可以导入其他模块的绑定。

// ------基本出口
// export关键字将已发布代码的部分公开到其他模块
// 不能使用此语法导出匿名函数或类，除非您使用default关键字

// export data
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// export function
export function sum(num1, num2) {
    return num1 + num1;
}

// export class
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// this function is private to the module
function subtract(num1, num2) {
    return num1 - num2;
}

// define a function...
function multiply(num1, num2) {
    return num1 * num2;
}

// ...and then export it later
export { multiply };


// ------import语句的两个部分是您要导入的标识符以及要导入这些标识符的模块
// ------导入单个绑定
// import just one
import { sum } from "./example.js";
console.log(sum(1, 2));     // 3
sum = 1;        // error

// ------导入多个绑定
// import multiple
import { sum, multiply, magicNumber } from "./example.js";
console.log(sum(1, magicNumber));   // 8
console.log(multiply(1, 2));        // 2

// ------导入所有模块
// import everything
import * as example from "./example.js";
console.log(example.sum(1,
        example.magicNumber));          // 8
console.log(example.multiply(1, 2));    // 2

// -----会报错的情况
if (flag) {
    export flag;    // syntax error
}
function tryImport() {
    import flag from "./example.js";    // syntax error
}



// ECMAScript 6的import语句为变量，函数和类创建只读绑定，而不是简单地引用原始绑定
// 如常规变量。即使导入绑定的模块不能更改其值，导出该标识符的模块也可以。
export var name = "Nicholas";
export function setName(newName) {
    name = newName;
}
// 引入
import { name, setName } from "./example.js";
console.log(name);       // "Nicholas"
setName("Greg");
console.log(name);       // "Greg"

name = "Nicholas";       // error


// ------重命名出口和进口
function sum(num1, num2) {
    return num1 + num2;
}
export { sum as add };
// 引入
import { add } from "./example.js";
// 如果导入功能的模块想要使用不同的名称，它也可以使用as
import { add as sum } from "./example.js";
console.log(typeof add);            // "undefined"
console.log(sum(1, 2));             // 3

// ------ 导出 模块中的默认值
// 方法 1
export default function(num1, num2) {
    return num1 + num2;
}
// 方法 2
function sum(num1, num2) {
    return num1 + num2;
}
export default sum;
// 方法 3
function sum(num1, num2) {
    return num1 + num2;
}
export { sum as default };

// -----导入默认值
// import the default
import sum from "./example.js";
console.log(sum(1, 2));     // 3


// -----导出非默认模块
// 对于导出默认和一个或多个非默认绑定的模块，您可以使用一个语句导入所有导出的绑定
export let color = "red";
export default function(num1, num2) {
    return num1 + num2;
}
// 导入模块
import sum, { color } from "./example.js";
console.log(sum(1, 2));     // 3
console.log(color);         // "red"
// equivalent to previous example
import { default as sum, color } from "example";
console.log(sum(1, 2));     // 3
console.log(color);         // "red"

// -----如果您想从其他模块导出所有内容
export * from "./example.js";






































