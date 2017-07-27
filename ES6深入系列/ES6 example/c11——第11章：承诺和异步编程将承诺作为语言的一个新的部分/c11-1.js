// -----------promise和异步代理
// JavaScript引擎基于单线程事件循环的概念。单线程意味着一次只能执行一段代码
// 回调模式类似于事件模型，因为异步代码直到稍后的时间点才能执行
readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    console.log(contents);
});
console.log("Hi!");
// 回调模式比事件更灵活，因为通过回调链接多个调用更容易
readFile("example.txt", function(err, contents) {
    if (err) {
        throw err;
    }

    writeFile("example.txt", function(err) {
        if (err) {
            throw err;
        }

        console.log("File was written!");
    });
});
// -------这种模式工作得很好，但是你可以很快地发现自己在回调地狱
method1(function(err, result) {
    if (err) {
        throw err;
    }
    method2(function(err, result) {
        if (err) {
            throw err;
        }
        method3(function(err, result) {

            if (err) {
                throw err;
            }
            method4(function(err, result) {

                if (err) {
                    throw err;
                }

                method5(result);
            });
        });
    });
});



// -------promise基础
// promise是异步操作结果的占位符，而不是订阅一个事件或传递回函数，该函数可以返回一个 promise
// readFile promises to complete at some point in the future
let promise = readFile("example.txt");


// -------promise的生命周期
// fulfilled  promise 的异步操作已成功完成
// rejected   由于发生错误或其他原因，promise的异步操作未成功完成

// -----then()方法存在于所有promise中，并有两个参数。第一个参数是当承诺得到满足时调用的函数。与异步操作相关的任何其他数据都将传递给此履行功能。
// 第二个参数是当承诺被拒绝时调用的函数。与履行功能类似，拒绝功能通过与拒绝相关的任何附加数据

let promise = readFile("example.txt");
promise.then(function(contents) {
    // fulfillment
    console.log(contents);
}, function(err) {
    // rejection
    console.error(err.message);
});
promise.then(function(contents) {
    // fulfillment
    console.log(contents);
});
promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});
// 三个then()方法都运行在相同的promise。
// 第一个方法听取了履行和拒绝。
// 第二个只听取履行情况; 错误不会报告
// 第三个只是听取拒绝，不报告成功


// ------Promises也有一个catch()方法，then()当只有一个拒绝处理程序被传递时，它的行为是一样的；
promise.catch(function(err) {
    // rejection
    console.error(err.message);
});
// is the same as:
promise.then(null, function(err) {
    // rejection
    console.error(err.message);
});

























