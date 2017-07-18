// ECMAScript 6通过 利用对象和数组的解构这是将数据结构分解成较小部分的过程
// ------对象解构语法
let node = {
        type: "Identifier",
        name: "foo"
    };
let { type, name } = node;
console.log(type);      // "Identifier"
console.log(name);      // "foo"

// ------对象解构，会破坏对象
let node = {
        type: "Identifier",
        name: "foo"
    },
    type = "Literal",
    name = 5;
// assign different values using destructuring
({ type, name } = node);
console.log(type);      // "Identifier"
console.log(name);      // "foo"
// type和name在声明时使用值初始化，然后使用不同的值初始化两个具有相同名称的变量；
// 下一行使用解构赋值通过从node对象读取来更改这些值。请注意，您必须在解构赋值语句周围加上括号。这是因为一个开放的大括号预计是一个块语句，并且块语句不能出现在作业的左侧；
// 括号表示下一个大括号不是块语句，应该被解释为一个表达式，允许赋值完成


// ------当您使用解析赋值语句时，如果您指定一个具有属性名称的对象上不存在的本地变量，则该局部变量将被赋值undefined
let node = {
        type: "Identifier",
        name: "foo"
    };
let { type, name, value } = node;
console.log(type);      // "Identifier"
console.log(name);      // "foo"
console.log(value);     // undefined

// 您可以选择定义指定属性不存在时使用的默认值
let node = {
        type: "Identifier",
        name: "foo"
    };
let { type, name, value = true } = node;
console.log(type);      // "Identifier"
console.log(name);      // "foo"
console.log(value);     // true

// 分配到不同的局部变量名称
// ECMAScript 6具有扩展语法，允许您使用不同的名称分配给本地变量，并且该语法看起来像对象文字非标准属性初始化程序语法
let node = {
        type: "Identifier",
        name: "foo"
    };
let { type: localType, name: localName } = node;
console.log(localType);     // "Identifier"
console.log(localName);     // "foo"

// ------嵌套对象破坏
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        }
    };
let { loc: { start }} = node;
console.log(start.line);        // 1
console.log(start.column);      // 1
// 每当有一个冒号在一个破坏模式，它意味着冒号前面的标识符给一个位置进行检查，而右侧分配一个值。当冒号后面有一个大括号时，表示目标被嵌套到该对象中的另一个级别。

// 为本地变量使用不同的名称
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        }
    };
// extract node.loc.start
let { loc: { start: localStart }} = node;
console.log(localStart.line);   // 1
console.log(localStart.column); // 1
// node.loc.start存储在一个新的局部变量中localStart。解构模式可以嵌套到任意级别的深度，所有功能在每个级别都可用;localStart为局部变量





















