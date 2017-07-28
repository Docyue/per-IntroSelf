// 链式promise
// 链式1
let p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

p1.then(function(value) {
    console.log(value);
}).then(function() {
    console.log("Finished");
});
// 42
// finished

// 链式2
let p3 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p4 = p3.then(function(value) {
    console.log(value);
})
p4.then(function() {
    console.log("Finished");
});
// 42
// finished

// -------接允许您捕获履行或拒绝处理程序中可能在promise中发生的错误
// 始终在promise 链末尾有一个拒绝处理程序，以确保您可以正确处理可能发生的任何错误。
let p5 = new Promise(function(resolve, reject) {
    resolve(42);
});

p5.then(function(value) {
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message);     // "Boom!"
});

// 抛错两次
let p6 = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});

p6.catch(function(error) {
    console.log(error.message);     // "Explosion!"
    throw new Error("Boom!");
}).catch(function(error) {
    console.log(error.message);     // "Boom!"
});

】
// ------promise 链的另一个重要方面是将数据从一个promise 传递到下一个promise 的能力
let p7 = new Promise(function(resolve, reject) {
    resolve(42);
});
p7.then(function(value) {
    console.log(value);         // "42"
    return value + 1;
}).then(function(value) {
    console.log(value);         // "43"
});

// 当调用拒绝处理程序时，它可能返回一个值。如果是这样，那个价值被用来履行链中的下一个promise
let p8 = new Promise(function(resolve, reject) {
    reject(42);
});
p8.catch(function(value) {
    // first fulfillment handler
    console.log(value);         // "42"
    return value + 1;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);         // "43"
});



// ------从履行和拒绝处理程序中返回原始值允许在promise之间传递数据

let p9 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p10 = new Promise(function(resolve, reject) {
    resolve(43);
});

p9.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p2;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);     // 43
});


// 第二个履行处理程序是附加的p12而不是p11
let p10 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p11 = new Promise(function(resolve, reject) {
    resolve(43);
});

let p12 = p10.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p11;
});

p12.then(function(value) {
    // second fulfillment handler
    console.log(value);     // 43
});


// 如果p14被拒绝，则不会调用第二个履行处理程序
let p13 = new Promise(function(resolve, reject) {
    resolve(42);
});

let p14 = new Promise(function(resolve, reject) {
    reject(43);
});

p13.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p14;
}).then(function(value) {
    // second fulfillment handler
    console.log(value);     // never called
});

// 附加拒绝处理程序
let p14 = new Promise(function(resolve, reject) {
    resolve(42);
});
let p15 = new Promise(function(resolve, reject) {
    reject(43);
});
p14.then(function(value) {
    // first fulfillment handler
    console.log(value);     // 42
    return p15;
}).catch(function(value) {
    // rejection handler
    console.log(value);     // 43
});

















