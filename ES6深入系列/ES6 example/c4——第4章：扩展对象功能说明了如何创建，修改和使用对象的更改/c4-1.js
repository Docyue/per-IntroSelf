// --------- 扩展对象功能
// -----属性初始化器
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
// es6
function createPerson(name, age) {
    return {
        name,
        age
    };
}
// -----简明方法
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};
// es6
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};

// -----计算属性名称
var person = {
    "first name": "Nicholas"
};
console.log(person["first name"]);      // "Nicholas"
// 引用对象实例中的计算属性名称
var lastName = "last name";
var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};
console.log(person["first name"]);      // "Nicholas"
console.log(person[lastName]);          // "Zakas"
// 对象文字中的方括号表示属性名称已被计算
var suffix = " name";
var person = {
    ["first" + suffix]: "Nicholas",
    ["last" + suffix]: "Zakas"
};
console.log(person["first name"]);      // "Nicholas"
console.log(person["last name"]);       // "Zakas"



