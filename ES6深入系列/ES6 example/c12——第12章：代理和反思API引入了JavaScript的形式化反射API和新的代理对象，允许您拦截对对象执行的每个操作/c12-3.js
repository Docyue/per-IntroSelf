// ----------对象扩展陷阱
// ECMAScript 5通过Object.preventExtensions()和Object.isExtensible()方法添加了对象可扩展性修改，
// ECMAScript 6允许代理通过preventExtensions和isExtensible陷阱拦截对底层对象的方法调用
let target = {};
let proxy = new Proxy(target, {
    isExtensible(trapTarget) {
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget) {
        return Reflect.preventExtensions(trapTarget);
    }
});
console.log(Object.isExtensible(target));       // true
console.log(Object.isExtensible(proxy));        // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target));       // false
console.log(Object.isExtensible(proxy));        // false
// 两者Object.preventExtensions()并Object.isExtensible()正确地从穿过proxy到target。




// Object.preventExtensions(proxy)由于preventExtensions陷阱返回，呼叫被有效地忽略false。
// 操作不转发到底层target，所以Object.isExtensible()返回true。
let target = {};
let proxy = new Proxy(target, {
    isExtensible(trapTarget) {
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget) {
        return false
    }
});
console.log(Object.isExtensible(target));       // true
console.log(Object.isExtensible(proxy));        // true
Object.preventExtensions(proxy);
console.log(Object.isExtensible(target));       // true
console.log(Object.isExtensible(proxy));        // true
// ------重复的可扩展性方法
let result1 = Object.isExtensible(2);
console.log(result1);                       // false
// throws error
let result2 = Reflect.isExtensible(2);
// Object.preventExtensions()和Reflect.preventExtensions()方法也很相似。该Object.preventExtensions()方法始终返回作为参数传递给它的值，即使该值不是一个对象
let result1 = Object.preventExtensions(2);
console.log(result1);                               // 2
let target = {};
let result2 = Reflect.preventExtensions(target);
console.log(result2);                               // true
// throws error
let result3 = Reflect.preventExtensions(2);






















// 
// 
// 
// 
// 
// 
// 
// 
// 