// ----------描述符对象限制
// 不管是什么对象作为第三个参数传递的Object.defineProperty()方法，只有属性enumerable，configurable，value，writable，get，和set将传递给描述符对象的defineProperty陷阱。
let proxy = new Proxy({}, {
    defineProperty(trapTarget, key, descriptor) {
        console.log(descriptor.value);              // "proxy"
        console.log(descriptor.name);               // undefined

        return Reflect.defineProperty(trapTarget, key, descriptor);
    }
});
Object.defineProperty(proxy, "name", {
    value: "proxy",
    name: "custom"
});



// ------getOwnPropertyDescriptor诱捕器具有略微不同的限制，需要返回值是null，undefined，或者一个对象。如果一个对象被返回，只是enumerable，configurable，value，writable，get，并set允许为对象的自己的属性。如果您返回一个不允许的属性的对象返回一个错误
let proxy = new Proxy({}, {
    getOwnPropertyDescriptor(trapTarget, key) {
        return {
            name: "proxy"
        };
    }
});
// throws error
let descriptor = Object.getOwnPropertyDescriptor(proxy, "name");

// ------------重复描述符方法
// ------defineProperty（）方法
// Object.defineProperty()和Reflect.defineProperty()它们的返回值完全相同。
// Object.defineProperty()方法返回第一个参数，如果操作成功则Reflect.defineProperty()返回，true否则返回false。
let target = {};
let result1 = Object.defineProperty(target, "name", { value: "target "});
console.log(target === result1);        // true
let result2 = Reflect.defineProperty(target, "name", { value: "reflect" });
console.log(result2);                   // true

// ------getOwnPropertyDescriptor（）方法
let descriptor1 = Object.getOwnPropertyDescriptor(2, "name");
console.log(descriptor1);       // undefined
// throws an error
let descriptor2 = Reflect.getOwnPropertyDescriptor(2, "name");


















