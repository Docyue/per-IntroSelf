// ---------继承promise
class MyPromise extends Promise {
    // use default constructor
    success(resolve, reject) {
        return this.then(resolve, reject);
    }
    failure(reject) {
        return this.catch(reject);
    }

}
let promise = new MyPromise(function(resolve, reject) {
    resolve(42);
});
promise.success(function(value) {
    console.log(value);             // 42
}).failure(function(value) {
    console.log(value);
});


// 通过确保每个异步操作返回promise，大大简化和推广此过程
let fs = require("fs");
function run(taskDef) {
    // create the iterator
    let task = taskDef();

    // start the task
    let result = task.next();

    // recursive function to iterate through
    (function step() {

        // if there's more to do
        if (!result.done) {

            // resolve to a promise to make it easy
            let promise = Promise.resolve(result.value);
            promise.then(function(value) {
                result = task.next(value);
                step();
            }).catch(function(error) {
                result = task.throw(error);
                step();
            });
        }
    }());
}
// Define a function to use with the task runner
function readFile(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, contents) {
            if (err) {
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}
// Run a task
run(function*() {
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});

// ----------未来异步任务运行
(async function() {
    let contents = await readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});


// 概要
// Promises旨在通过在事件和回调中提供比异步操作更多的控制和组合来改善JavaScript中的异步编程。 promise 将作业添加到JavaScript引擎的作业队列中，以便稍后执行，而第二个作业队列会跟踪 promise 履行和拒绝处理程序，以确保正确执行。

//  promise 有三个状态：待决，履行和拒绝。 promise 开始处于挂起状态，并在成功执行时履行或在失败时被拒绝。在任一种情况下，都可以添加处理程序来指示 promise 何时结算。该then()方法允许您分配履行和拒绝处理程序，该catch()方法允许您仅分配拒绝处理程序。

// 您可以通过各种方式将 promise 联系在一起，并在其间传递信息。每次调用then()创建并返回在前一个解决方案时解决的新 promise 。这样的链可用于触发对一系列异步事件的响应。您还可以使用Promise.race()和Promise.all()监视多个 promise 的进度并作出相应的回应。

// 当组合生成器和 promise 时，异步任务运行更容易，因为 promise 会提供异步操作可以返回的通用接口。然后，您可以使用生成器和yield运算符等待异步响应并进行适当响应。

// 大多数新的Web API正在建立在 promise 之上，您可以期待更多的跟随。

























