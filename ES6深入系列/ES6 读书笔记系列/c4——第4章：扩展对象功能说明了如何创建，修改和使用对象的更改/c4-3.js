// Object.getOwnPropertyNames()和返回属性Reflect.ownKeys（在第12章中介绍）。它也会影响属性的处理顺序Object.assign()。
// 自己的属性枚举的基本顺序是：
// 所有数字键按升序排列
// 所有字符串按照它们被添加到对象的顺序
// 所有符号键（第6章所述）按照它们添加到对象的顺

var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    b: 1,
    1: 1
};
obj.d = 1;
console.log(Object.getOwnPropertyNames(obj).join(""));     // "012acbd"
// ----------更改对象的原型
// ECMAScript 6通过添加该Object.setPrototypeOf()方法来改变该假设，这允许您更改任何给定对象的原型。该Object.setPrototypeOf()方法接受两个参数：原型应该更改的对象以及应成为第一个参数原型的对象
let person = {
    getGreeting() {
        return "Hello";
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};

// prototype is person
let friend = Object.create(person);
console.log(friend.getGreeting());                      // "Hello"
console.log(Object.getPrototypeOf(friend) === person);  // true

// set prototype to dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());                      // "Woof"
console.log(Object.getPrototypeOf(friend) === dog);     // true

// Object.getPrototypeOf()不再在所有情况下工作
// es5
let person = {
    getGreeting() {
        return "Hello";
    }
};

// prototype is person
let friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
// prototype is friend
let relative = Object.create(friend);
console.log(person.getGreeting());                  // "Hello"
console.log(friend.getGreeting());                  // "Hello, hi!"
console.log(relative.getGreeting());                // error!

// es6
let person = {
    getGreeting() {
        return "Hello";
    }
};
// prototype is person
let friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person); // 修改对象的原型
// prototype is friend
let relative = Object.create(friend); // 新建对象
console.log(person.getGreeting());    // "Hello"
console.log(friend.getGreeting());    // "Hello, hi!"
console.log(relative.getGreeting());  // "Hello, hi!"



















