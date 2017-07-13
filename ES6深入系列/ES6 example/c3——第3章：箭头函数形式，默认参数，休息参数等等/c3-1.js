// ----------默认参数
console.log("// ----------默认参数");
// es5
function makeRequest(url, timeout, callback) {

    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof callback !== "undefined") ? callback : function() {};

    // the rest of the function

}
// es6
function makeRequest(url, timeout = 2000, callback = function() {}) {
	// the rest of the function

}
// uses default timeout
makeRequest("/foo", undefined, function(body) {
    doSomething(body);
});
// uses default timeout and callback
makeRequest("/foo");

// uses default callback
makeRequest("/foo", 500);

// doesn't use defaults
makeRequest("/foo", 500, function(body) {
    doSomething(body);
});

// doesn't use default timeout
makeRequest("/foo", null, function(body) {
    doSomething(body);
});

// ----------默认参数影响OBJECT
console.log("// ----------默认参数影响OBJECT");
//  in strict mode es5
function mixArgs(first, second) {
    "use strict"; 

    console.log(first === arguments[0]); // true
    console.log(second === arguments[1]); // true
    first = "c";
    second = "d"
    console.log(first === arguments[0]); // false
    console.log(second === arguments[1]);// false
}

mixArgs("a", "b");
// not in strict mode es6
function mixArgsa(first, second = "b") {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    first = "c";
    second = "d"
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
}

mixArgsa("a");
// ----------默认参数表达式
console.log('// ----------默认参数表达式');
function getValue() {
    return 5;
}

function add(first, second = getValue()) {
    return first + second;
}

console.log(add(1, 1));     // 2
console.log(add(1));        // 6
// ----------默认参数，TDZ 时间死区
console.log('// ----------默认参数，TDZ 时间死区');
// 在这个例子中，调用add(undefined, 1)抛出一个错误，因为second初始化时还没有被first初始化。在这一点上，second是在TDZ中，因此任何引用都会second引发错误
// 功能参数有自己的作用域和与功能体范围分开的自己的TDZ。这意味着参数的默认值不能访问在函数体内声明的任何变量
function add1(first = second, second) {
    return first + second;
}

console.log(add1(1, 1));         // 2
console.log(add1(undefined, 1));














