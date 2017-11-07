// ---------this
// this引用错误,this指向document
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click", function(event) {
            this.doSomething(event.type);     // error
        }, false);
    },
    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
// 通过bind来实现，bind(this)创建了一个新函数
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click", (function(event) {
            this.doSomething(event.type);     // no error
        }).bind(this), false);
    },
    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
// 箭头函数没有this绑定，这意味着this箭头函数内部的值只能通过查找范围链来确定。
var PageHandler = {
    id: "123456",
    init: function() {
        document.addEventListener("click",
                event => this.doSomething(event.type), false);
    },
    doSomething: function(type) {
        console.log("Handling " + type  + " for " + this.id);
    }
};
// 您可以使用默认参数来移动该return语句之外的乘法运算。所得到的函数将临时结果携带到下一个迭代中，创建一个行为相同但可以由ECMAScript 6引擎优化的函数
function factorial(n, p = 1) {

    if (n <= 1) {
        return 1 * p;
    } else {
        let result = n * p;

        // optimized
        return factorial(n - 1, result);
    }
}



