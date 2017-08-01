// -----------什么是代理和反思？
// 您可以通过调用创建一个代理来代替另一个对象（称为目标）new Proxy()。
// 代理虚拟化目标，以便代理和目标看起来与使用代理的功能相同的对象。
// -----JavaScript中的代理陷阱
// 代理陷阱			覆盖行为	默认行为
// get			读取属性值	Reflect.get()
// set			写一个财产	Reflect.set()
// has			该in运营商	Reflect.has()
// deleteProperty				该delete运营商	Reflect.deleteProperty()
// getPrototypeOf			Object.getPrototypeOf()	Reflect.getPrototypeOf()
// setPrototypeOf			Object.setPrototypeOf()	Reflect.setPrototypeOf()
// isExtensible			Object.isExtensible()	Reflect.isExtensible()
// preventExtensions			Object.preventExtensions()	Reflect.preventExtensions()
// getOwnPropertyDescriptor			Object.getOwnPropertyDescriptor()	Reflect.getOwnPropertyDescriptor()
// defineProperty			Object.defineProperty()	Reflect.defineProperty
// ownKeys			Object.keys，Object.getOwnPropertyNames()，Object.getOwnPropertySymbols()	Reflect.ownKeys()
// apply			调用函数	Reflect.apply()
// construct			调用一个函数 new





// ----------创建一个简单的代理
// 当您使用Proxy构造函数进行代理时，您将传递两个参数：目标和处理程序。
let target = {};
let proxy = new Proxy(target, {});
proxy.name = "proxy";
console.log(proxy.name);        // "proxy"
console.log(target.name);       // "proxy"
target.name = "target";
console.log(proxy.name);        // "target"
console.log(target.name);       // "target"


// ------使用set陷阱验证属性
// 假设您要创建一个对象，其属性值必须是数字。
// 这意味着必须验证添加到对象的每个新属性，如果该值不是数字，则必须抛出一个错误。
// 要完成此操作，您可以定义一个set覆盖设置值的默认行为的陷阱。

// trapTarget - 将接收该属性的对象（代理的目标）
// key - 要写入的属性键（字符串或符号）
// value - 正在写入财产的价值
// receiver - 操作发生的对象（通常是代理）
// 要验证属性值，您可以使用set陷阱并检查value传入的值
let target = {
    name: "target"
};
let proxy = new Proxy(target, {
    set(trapTarget, key, value, receiver) {

        // ignore existing properties so as not to affect them
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                throw new TypeError("Property must be a number.");
            }
        }

        // add the property
        return Reflect.set(trapTarget, key, value, receiver);
    }
});
// adding a new property
proxy.count = 1;
console.log(proxy.count);       // 1
console.log(target.count);      // 1
// you can assign to name because it exists on target already
proxy.name = "proxy";
console.log(proxy.name);        // "proxy"
console.log(target.name);       // "proxy"
// throws an error
proxy.anotherName = "proxy";

// ------使用get陷阱的对象形状验证
let target = {};
console.log(target.name);       // undefined
// 由于属性验证只有在读取属性时才会发生，您将使用get陷阱
// trapTarget - 从中​​读取属性的对象（代理的目标）
// key - 要读取的属性键（字符串或符号）
// receiver - 操作发生的对象（通常是代理）
let proxy = new Proxy({}, {
        get(trapTarget, key, receiver) {
            if (!(key in receiver)) {
                throw new TypeError("Property " + key + " doesn't exist.");
            }

            return Reflect.get(trapTarget, key, receiver);
        }
    });

// adding a property still works
proxy.name = "proxy";
console.log(proxy.name);            // "proxy"
// nonexistent properties throw an error
console.log(proxy.nme);             // throws error


// ------使用has陷阱隐藏属性存在
let target = {
    value: 42;
}
console.log("value" in target);     // true
console.log("toString" in target);  // true
// 两个参数传递给has陷阱
// trapTarget - 该属性被读取的对象（代理的目标）
// key - 要检查的属性键（字符串或符号）
let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    has(trapTarget, key) {

        if (key === "value") {
            return false;
        } else {
            return Reflect.has(trapTarget, key);
        }
    }
});
console.log("value" in proxy);      // false
console.log("name" in proxy);       // true
console.log("toString" in proxy);   // true

// ------防止财产删除与deleteProperty陷阱
let target = {
    name: "target",
    value: 42
};
Object.defineProperty(target, "name", { configurable: false });
console.log("value" in target);     // true
let result1 = delete target.value;
console.log(result1);               // true
console.log("value" in target);     // false
// Note: The following line throws an error in strict mode
let result2 = delete target.name;
console.log(result2);               // false
console.log("name" in target);      // true
// 在deleteProperty每当陷阱被调用delete操作者上的对象属性使用。陷阱传递两个参数
// trapTarget - 从中​​删除属性的对象（代理的目标）
// key - 要删除的属性键（字符串或符号）

let target = {
    name: "target",
    value: 42
};
let proxy = new Proxy(target, {
    deleteProperty(trapTarget, key) {

        if (key === "value") {
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget, key);
        }
    }
});
// Attempt to delete proxy.value
console.log("value" in proxy);      // true
let result1 = delete proxy.value;
console.log(result1);               // false
console.log("value" in proxy);      // true
// Attempt to delete proxy.name
console.log("name" in proxy);       // true
let result2 = delete proxy.name;
console.log(result2);               // true
console.log("name" in proxy);       // false





































