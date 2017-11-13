// Generator 函数的异步应用
// =======================================================================
// ES6 诞生以前，异步编程的方法，大概有下面四种:
// 回调函数
// 事件监听
// 发布/订阅
// Promise 对象


// 回调函数
fs.readFile('/etc/passwd', 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(data);
});


// Promise
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});


// 协程Generator 函数
function* gen(x) {
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }

// 协程Generator 函数---错误处理
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}
var g = gen(1);
g.next();
g.throw('出错了');
// 出错了

// 协程Generator 函数---异步任务封装
var fetch = require('node-fetch');
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
var g = gen();
var result = g.next();
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});

// 协程Generator 函数---Thunk 函数
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。
function f(m) {
  return m * 2;
}
f(x + 5);
// 等同于
var thunk = function () {
  return x + 5;
};
function f(thunk) {
  return thunk() * 2;
}


// Thunk实现－－－任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

// Thunk调用
function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);
ft(1)(console.log) // 1

// Thunkify 模块
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;
    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    return function (done) {
      var called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
// thunkify的使用
var thunkify = require('thunkify');
var fs = require('fs');
var read = thunkify(fs.readFile);
read('package.json')(function(err, str){
  // ...
});


// Generator 函数的流程管理与thunk函数
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);
var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};

// Thunk 函数的 Generator 执行器
function run(fn) {
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}
function* g() {
  // ...
}
run(g);


// co模块
// 下面是一个 Generator 函数，用于依次读取两个文件
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// co 模块可以让你不用编写 Generator 函数的执行器
var co = require('co');
co(gen);
// co函数返回一个Promise对象，因此可以用then方法添加回调函数。
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});


// co 模块的原理
// co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。
// 使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。
// 如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，
// Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
// （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
// （2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。

// 处理并发的异步操作
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);
// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);
// 允许并发三个somethingAsync异步操作，等到它们全部完成，才会进行下一步。
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});
function* somethingAsync(x) {
  // do something async
  return y
}


// 实例：处理 Stream
const co = require('co');
const fs = require('fs');
const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;
co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
