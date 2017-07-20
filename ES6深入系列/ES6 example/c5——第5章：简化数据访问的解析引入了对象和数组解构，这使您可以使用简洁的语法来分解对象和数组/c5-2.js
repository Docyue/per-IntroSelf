// ----------阵列解构
// 数组解构语法非常类似于对象解构; 它只是使用数组文字语法而不是对象文字语法。解构在数组中的位置上运行，而不是在对象中可用的命名属性。
let colors = [ "red", "green", "blue" ];
let [ firstColor, secondColor ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"

// 该代码中的解构赋值与最后一个数组解构示例类似
let colors = [ "red", "green", "blue" ],
    firstColor = "black",
    secondColor = "purple";
[ firstColor, secondColor ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
// ------数组解构赋值具有非常独特的用例，可以更容易地交换两个变量的值
// es5 中间变量tmp是必要的，以便交换的值a和b
// Swapping variables in ECMAScript 5
let a = 1,
    b = 2,
    tmp;
tmp = a;
a = b;
b = tmp;
console.log(a);     // 2
console.log(b);     // 1
// es6中交换变量的方法
let a = 1,
    b = 2;
[ a, b ] = [ b, a ];
console.log(a);     // 2
console.log(b);     // 1
// ------嵌套解构
let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
let [ firstColor, [ secondColor ] ] = colors;

console.log(firstColor);        // "red"
console.log(secondColor);       // "green"

// ------函数的休息参数，数组解构有一个类似的概念，称为休息项。休息项目使用...语法将数组中的其余项目分配给特定变量
let colors = [ "red", "green", "blue" ];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor);        // "red"
console.log(restColors.length); // 2
console.log(restColors[0]);     // "green"
console.log(restColors[1]);     // "blue"

// ------轻松创建一个克隆
// cloning an array in ECMAScript 5
var colors = [ "red", "green", "blue" ];
var clonedColors = colors.concat();
console.log(clonedColors);      //"[red,green,blue]"
// cloning an array in ECMAScript 6
let colors = [ "red", "green", "blue" ];
let [ ...clonedColors ] = colors;
console.log(clonedColors);      //"[red,green,blue]"

// 
// 
// 
// 
// 
// 
// 