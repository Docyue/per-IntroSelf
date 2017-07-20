// ------对象和数组解构可以一起使用来创建更复杂的表达式
let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        },
        range: [0, 3]
    };
let {
    loc: { start },
    range: [ startIndex ]
} = node;
console.log(start.line);        // 1
console.log(start.column);      // 1
console.log(startIndex);        // 0

// ------------解构有一个更有用的用例，就是传递函数参数时
// ------properties on options represent additional parameters
function setCookie(name, value, options) {

    options = options || {};

    let secure = options.secure,
        path = options.path,
        domain = options.domain,
        expires = options.expires;

    // code to set the cookie
}
// third argument maps to options
setCookie("type", "js", {
    secure: true,
    expires: 60000
});

// ------es6 解构参数
function setCookie(name, value, { secure, path, domain, expires }) {

    // code to set the cookie
}
setCookie("type", "js", {
    secure: true,
    expires: 60000
});

// ------结构参数默认值
function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
    } = {}
) {

    // ...
}












































































