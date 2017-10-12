// Javascript---undefined vs. null
// ================================================================================
// 一、相似性
// 在JavaScript中，将一个变量赋值为undefined或null，老实说，几乎没区别。
var a = undefined;
var a = null;

// 上面代码中，a变量分别被赋值为undefined和null，这两种写法几乎等价;
// undefined和null在if语句中，都会被自动转为false，相等运算符甚至直接报告两者相等;
if (!undefined)
    console.log('undefined is false');
// undefined is false

if (!null)
    console.log('null is false');
// null is false
undefined == null
// true
// --------------------------------------------------------------------------------
// 二、历史原因
// 最近，我在读新书《Speaking JavaScript》时，意外发现了这个问题的答案！
// 原来，这与JavaScript的历史有关。1995年JavaScript诞生时，最初像Java一样，只设置了null作为表示"无"的值；
// 根据C语言的传统，null被设计成可以自动转为0；

Number(null)
// 0
5 + null
// 5
// 首先，null像在Java里一样，被当成一个对象。但是，JavaScript的数据类型分成原始类型（primitive）和合成类型（complex）两大类，Brendan Eich觉得表示"无"的值最好不是对象；
// 其次，JavaScript的最初版本没有包括错误处理机制，发生数据类型不匹配时，往往是自动转换类型或者默默地失败。Brendan Eich觉得，如果null自动转为0，很不容易发现错误；
// 因此，Brendan Eich又设计了一个undefined；

// --------------------------------------------------------------------------------
// 三、最初设计
// JavaScript的最初版本是这样区分的：null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。

Number(undefined)
// NaN
5 + undefined
// NaN

四、目前的用法
// 目前，null和undefined基本是同义的，只有一些细微的差别。

// null表示"没有对象"，即该处不应该有值。典型用法是：
// （1） 作为函数的参数，表示该函数的参数不是对象。
// （2） 作为对象原型链的终点。
Object.getPrototypeOf(Object.prototype)
// null
// --------------------------------------------------------------------------------
// undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：
// （1）变量被声明了，但没有赋值时，就等于undefined。
// （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。
// （3）对象没有赋值的属性，该属性的值为undefined。
// （4）函数没有返回值时，默认返回undefined。

// 声明没赋值
var i;
i // undefined
// 函数没提供参数
function f(x){console.log(x)}
f() // undefined
// 对象属性没赋值
var  o = new Object();
o.p // undefined
// 函数没有返回值
var x = f();
x // undefined
