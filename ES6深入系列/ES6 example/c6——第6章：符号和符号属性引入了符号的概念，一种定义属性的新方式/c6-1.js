// -----------符号和符号属性
// 创建symbol
// let firstName = Symbol();
// let person = {};
// person[firstName] = "Nicholas";
// console.log(person[firstName]);     // "Nicholas"


// 描述本身不能用于访问属性，但用于调试目的
// let firstName = Symbol("first name");
// let person = {};
// person[firstName] = "Nicholas";
// console.log("first name" in person);        // false
// console.log(person[firstName]);             // "Nicholas"
// console.log(firstName);                     // "Symbol(first name)"

// -------识别symbol
// 由于symbol是原始值，您可以使用typeof运算符来确定变量是否包含符号
// let symbol = Symbol("test symbol");
// console.log(typeof symbol);         // "symbol"

// ------使用symbol
// let firstName = Symbol("first name");
// // use a computed object literal property
// let person = {
//     [firstName]: "Nicholas"
// };
// // make the property read only
// Object.defineProperty(person, firstName, { writable: false });
// let lastName = Symbol("last name");
// Object.defineProperties(person, {
//     [lastName]: {
//         value: "Zakas",
//         writable: false
//     }
// });
// console.log(person[firstName]);     // "Nicholas"
// console.log(person[lastName]);      // "Zakas"

// ------共享symbol
// 当要创建要共享的符号时，请使用该Symbol.for()方法而不是调用该Symbol()方法
// let uid = Symbol.for("uid");
// let object = {};
// object[uid] = "12345";
// console.log(object[uid]);       // "12345"
// console.log(uid);               // "Symbol(uid)"
// let uid2 = Symbol.for("uid");
// console.log(uid === uid2);      // true
// console.log(object[uid2]);      // "12345"
// console.log(uid2);              // "Symbol(uid)"

// Symbol.keyFor()方法来检索与全局符号注册表中的符号关联的密钥
let uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid));    // "uid"
let uid2 = Symbol.for("uid");
console.log(Symbol.keyFor(uid2));   // "uid"
let uid3 = Symbol("uid");
console.log(Symbol.keyFor(uid3));   // undefined



















