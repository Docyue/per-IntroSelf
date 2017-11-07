// ----------原型代理陷阱
// Object.setPrototypeOf()ECMAScript 6添加的ECMAScript 5 Object.getPrototypeOf()方法。
// 代理允许您通过setPrototypeOf和getPrototypeOf陷阱拦截两种方法的执行。

// trapTarget - 应该设置原型的对象（代理的目标）
// proto - 用作原型的对象

// 首先，getPrototypeOf陷阱必须返回一个对象，否则null任何其他返回值会导致运行时错误
// 检查确保Object.getPrototypeOf()总是返回一个预期值。
// 同样，如果操作不成功，则setPrototypeOf必须返回值false。
// 当setPrototypeOf返回时false，Object.setPrototypeOf()会抛出错误。
// 如果setPrototypeOf返回任何其他值false，则Object.setPrototypeOf()表示操作成功。

let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return null;
    },
    setPrototypeOf(trapTarget, proto) {
        return false;
    }
});
let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype);      // true
console.log(proxyProto === Object.prototype);       // false
console.log(proxyProto);                            // null
// succeeds
Object.setPrototypeOf(target, {});

// throws error
Object.setPrototypeOf(proxy, {});

// ------果要使用这两个陷阱的默认行为，可以使用相应的方法Reflect
let target = {};
let proxy = new Proxy(target, {
    getPrototypeOf(trapTarget) {
        return Reflect.getPrototypeOf(trapTarget);
    },
    setPrototypeOf(trapTarget, proto) {
        return Reflect.setPrototypeOf(trapTarget, proto);
    }
});

let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);
console.log(targetProto === Object.prototype);      // true
console.log(proxyProto === Object.prototype);       // true
// succeeds
Object.setPrototypeOf(target, {});
// also succeeds
Object.setPrototypeOf(proxy, {});







