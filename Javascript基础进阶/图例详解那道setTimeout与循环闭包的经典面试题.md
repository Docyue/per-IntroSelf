图例详解那道setTimeout与循环闭包的经典面试题
http://www.jianshu.com/p/9b4a54a98660


//
for (var i=1; i<=5; i++) { 
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}


//
setTimeout(function() {
    console.log('一秒钟之后我将被打印出来')
}, 1000)



//
var timer = setTimeout(function() {
    console.log('如果不清除我，我将会一秒之后出现。');
}, 1000)
clearTimeout(timer);  // 清除之后，通过setTimeout定义的操作并不会执行


//
var timer = setTimeout(function() {
    console.log('setTimeout actions.');
}, 0);

console.log('other actions.');

// 思考一下，当我将setTimeout的延迟时间设置为0时，上面的执行顺序会是什么？


//队列
在对于执行上下文的介绍中，分享了函数调用栈这种特殊数据结构的调用特性。在这里，将会介绍另外一个特殊的队列结构，页面中所有由setTimeout定义的操作，都将放在同一个队列中依次执行。


setTimeout(function() {
    console.log(a);
}, 0);

var a = 10;
console.log(b);
console.log(fn);
var b = 20;

function fn() {
    setTimeout(function() {
        console.log('setTImeout 10ms.');
    }, 10);
}
fn.toString = function() {
    return 30;
}

console.log(fn);
setTimeout(function() {
    console.log('setTimeout 20ms.');
}, 20);
fn();



//undefined

// function fn() {
//    setTimeout(function() {
//        console.log('setTImeout 10ms.');
//    }, 10);
// }

//30
//10
//setTImeout 10ms.
//setTImeout 20ms.








