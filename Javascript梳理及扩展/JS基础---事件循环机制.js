JS基础---事件循环机制
================================================================================
一个线程中，事件循环是唯一的，但是任务队列可以拥有多个，其中setTimeout和Promise的任务队列叫做macro-task(宏任务)，还有micro-task(微任务）：
macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver


// 事件循环机制---概念
事件循环的顺序是从script开始第一次循环，随后全局上下文进入函数调用栈，碰到macro-task就将其交给处理它的模块处理完之后将回调函数放进macro-task的队列之中；
碰到micro-task也是将其回调函数放进micro-task的队列之中，直到函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task；
当所有可执行的micro-task执行完毕之后。循环再次执行macro-task中的一个任务队列，执行完之后再执行所有的micro-task，就这样一直循环；

// 事件循环机制---总结
1、不同的任务会放进不同的任务队列之中。
2、先执行macro-task，等到函数调用栈清空之后再执行所有在队列之中的micro-task。
3、等到所有micro-task执行完之后再从macro-task中的一个任务队列开始执行，就这样一直循环。
4、当有多个macro-task(micro-task)队列时，事件循环的顺序是按上文macro-task(micro-task)的分类中书写的顺序执行的。
