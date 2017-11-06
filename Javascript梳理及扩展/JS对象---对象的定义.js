// JavaScript---对象知多少
================================================================================
我们有两种方式可定义一个对象：
var object = {};
var object = new Object();
PS：根据对象字面量创建的对象不会调用Object构造函数

javascript中的对象类似于我们的hashtable，是一种键值对的形式，他可以以不同维度方式展示，某些时候甚至可以模拟我们的数据库结构！
对象在内存的存储方式是将具体的存在堆里面，而在栈里面保存一个引用，所以我们经常遇到两个有意思的东东，一个是引用赋值，后者变化而影响前者，一者就是深度克隆了，我们在此看看这两个东东：

var a = { a: 6 };
    alert(a.a);//6
    var b = a;
    b.a = 66;
    alert(a.a);//66

这个题，我们昨天就见过了，这里再提出来说下，于是我们来看看深度克隆呢：
浅度克隆：基本类型为值传递，对象仍为引用传递。
深度克隆：所有元素或属性均完全克隆，并于原引用类型完全独立，即，在后面修改对象的属性的时候，原对象不会被修改。
hasOwnProperty：是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。

function cloneObj(obj) {
    var o = obj.constructor == Array ? [] : {}; //首先处理变量，看看是数组还是对象啦
    for (var k in obj) {
        //我们知道for in 会将原型的东西也给遍历出来，所以我们这里需要做一个判断
        if (obj.hasOwnProperty(k)) {
            //递归方式处理
            o[k] = typeof obj[k] === 'object' ? cloneObj(obj[k]) : obj[k];
        }
    }
    return o;
}
var a = { a: 'aaa', b: 'bbb', c: { d: 'ddd', e: [1, 2, 4]} };
var b = cloneObj(a);
