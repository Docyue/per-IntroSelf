// Node.js example

// let fs = require("fs");

// function readFile(filename) {
//     return new Promise(function(resolve, reject) {

//         // trigger the asynchronous operation
//         fs.readFile(filename, {
//             encoding: "utf8"
//         }, function(err, contents) {

//             // check for errors
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             // the read succeeded
//             resolve(contents);

//         });
//     });
// }

// let promise = readFile("example.txt");

// // listen for both fulfillment and rejection
// promise.then(function(contents) {
//     // fulfillment
//     console.log(contents);
// }, function(err) {
//     // rejection
//     console.error(err.message);
// });


// add this function to the job queue after 500ms have passed
setTimeout(function() {
    console.log("Timeout");
}, 500);
console.log("Hi!");
// HI
// timeout


let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});
console.log("Hi!");
// promise
// hi


let promise = new Promise(function(resolve, reject) {
    console.log("Promise");
    resolve();
});
promise.then(function() {
    console.log("Resolved.");
});
console.log("Hi!");
// promise
// hi 
// resolved


// 如果您希望promise 仅表示一个已知的值

// Promise.resolve()方法接受单个参数，并在满足状态下返回 promise
let promise = Promise.resolve(42);
promise.then(function(value) {
    console.log(value);         // 42
});
// Promise.reject() Promise.resolve()除了promise 处于被拒绝的状态外
let promise = Promise.reject(42);
promise.catch(function(value) {
    console.log(value);         // 42
});


// 一个对象有一个then()方法接受resolve一个reject参数和一个参数时，会创建一个非 promise 
let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);     // 42
});
p1.catch(function(value) {
    console.log(value);     // 42
});


// 如果一个执行器中抛出一个错误，那么promise 的拒绝处理程序被调用
let promise = new Promise(function(resolve, reject) {
    throw new Error("Explosion!");
});
promise.catch(function(error) {
    console.log(error.message);     // "Explosion!"
});

// same as to 
let promise = new Promise(function(resolve, reject) {
    try {
        throw new Error("Explosion!");
    } catch (ex) {
        reject(ex);
    }
});
promise.catch(function(error) {
    console.log(error.message);     // "Explosion!"
});



// unhandledRejection：当promise 被拒绝并且在事件循环的一个回合内没有调用拒绝处理程序时发出

let rejected;
process.on("unhandledRejection", function(reason, promise) {
    console.log(reason.message);            // "Explosion!"
    console.log(rejected === promise);      // true
});
rejected = Promise.reject(new Error("Explosion!"));


// rejectionHandled：当promise 被拒绝时发出，并且在一轮事件循环后调用拒绝处理程序
let rejected;
process.on("rejectionHandled", function(promise) {
    console.log(rejected === promise);              // true
});
rejected = Promise.reject(new Error("Explosion!"));
// wait to add the rejection handler
setTimeout(function() {
    rejected.catch(function(value) {
        console.log(value.message);     // "Explosion!"
    });
}, 1000);



// ------在浏览器中跟踪未处理拒绝的代码与Node.js的代码非常相似
let possiblyUnhandledRejections = new Map();
// when a rejection is unhandled, add it to the map
window.onunhandledrejection = function(event) {
    possiblyUnhandledRejections.set(event.promise, event.reason);
};
window.onrejectionhandled = function(event) {
    possiblyUnhandledRejections.delete(event.promise);
};
setInterval(function() {
    possiblyUnhandledRejections.forEach(function(reason, promise) {
        console.log(reason.message ? reason.message : reason);

        // do something to handle these rejections
        handleRejection(promise, reason);
    });

    possiblyUnhandledRejections.clear();

}, 60000);







