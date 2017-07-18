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
// Symbol.iterator - 返回迭代器的方法。（迭代器在第7章中介绍）
// Symbol.match- 用于String.prototype.match()比较字符串的方法。
// Symbol.replace- 用于String.prototype.replace()替换子串的方法。
// Symbol.search- 用于String.prototype.search()定位子串的方法。
// Symbol.species - 用于制作派生对象的构造函数。（派生对象在第8章中介绍）
// Symbol.split- 用于String.prototype.split()分割字符串的方法。
// Symbol.toPrimitive - 返回对象的原始值表示的方法。
// Symbol.toStringTag- 用于Object.prototype.toString()创建对象描述的字符串。
// Symbol.unscopables- 一个对象，其属性是不应包含在with语句中的对象属性的名称

// Symbol.hasInstance
obj instanceof Array;
// 相当于
Array[Symbol.hasInstance](obj);


// 
// 
// 
// 