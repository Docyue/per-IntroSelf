函数参数
================================================================================
各位看得没错，我觉得我对函数的参数理解不够彻底，各位怎么样呢，我现在出个例子来试试：

var param = { name: '叶小钗', age: 33 };
function alertArgurment(d) {
    for (var k in d) {
        alert(k + ': ' + d[k]);
    }
}
alertArgurment(param);

这个题自然没有问题，那我们变化一下呢？

var param = { name: '叶小钗', age: 33 };
function alertArgurment(param) {
    for (var k in param ) {
        alert(k + ': ' + param [k]);
    }
}
alertArgurment(param);

各位现在知道自己使用的是外面的param还是里面的param呢？若是仍然难不倒你，看看这个呢：
var param = { name: '叶小钗', age: 33 };
function alertArgurment(d) {
param.id = '刀狂剑痴';
    for (var k in d) {
        alert(k + ': ' + d[k]);
    }
}
alertArgurment(param);

那么这个呢？或者说这段代码与这段代码有什么不同呢？请对比两段代码：

var param = { name: '叶小钗', age: 33 };
function alertArgurment(d) {
    d.id = '刀狂剑痴';
    for (var k in d) {
        alert(k + ': ' + d[k]);
    }
}
alertArgurment(param);
怎么样呢？对于参数各位还敢说知道吗，我反正有点不敢了，于是再看看各位知道下面这些家伙是干什么的吗？
① arguments
② callee
③ caller
若是你都知道并且了解十分深入的话，那么我又在自己为难自己了。。。。好了，上面的问题先留着，我们来看看什么是参数：

ECMAScript函数的参数与其它语言有所不同，其有以下特点：
① 个数不限
② 类型不限
③ 函数调用时候参数传递看心情

ECMAScript在内部是使用一个数组来表示参数的：arguments对象可访问这个数组。

但是arguments只是与数组类似，他并不是Array的实例,所以我们定义函数时候可以不显示定义参数而是使用arguments[0]的方式读取
于是函数重载什么的也只能是传说了。

callee：函数内部有两个特殊对象，一个是this一个是arguments，其中arguments有一个callee的属性，他是一个指针，指向其函数。

在ECMAScript5中规范化了另外一个函数对象属性：caller，这个属性保存着调用当前函数的引用，全局变量中对应着null
其获取方式为arguments.callee.caller（在严格模式先访问arguments.callee要报错）
复制代码
我们先贴一张图出来看看：



各位看到了，我们只是将param作为参数传了进去，然后在里面给他多加了一个属性，但是param也多了一个属性哦！

--------------华丽的分割线------------------

PS：我突然想起了那天面试我错了一道非常恶心的题，突然想起的，勿喷，实在太恶心了。。。

复制代码
var a = {};
    a.a = 6;
    alert(a.a);
var b = a;
    b.a = 66;
    alert(a.a);
复制代码
这个我还答对了，但是好像后面类似这样的题我答错了，囧：

var a = 3;
    alert(a);
    a = 4;
就是类似于这样的题了，我当时是饿了还是在大神面前智商降低了呢？我刚刚突然想起了，觉得好戳哦。。。

--------------华丽的分割线------------------

回到本题，我们来理一理这个东西，我们这里传递了一个对象作为函数的参数，与其说是对象，不如说是对象的引用。

ECMAScript所有参数传递的都是值，不能通过引用传递参数
所以内部改变了那个值也会改变外面的东东，但是传递值的话又有所不同：

复制代码
var a = 1;
function alertArgurment(d) {
    d = 2;
    alert(d);
}
alertArgurment(a);
复制代码
这块里面就是2，外面的a仍然是1了。根据前面的研究我们再修改下程序：

复制代码
var param = { name: '叶小钗', age: 33 };
function alertArgurment(d) {
    d.id = '刀狂剑痴';
    arguments[0].qq = '素还真';
    for (var k in d) {
            alert(k + ': ' + d[k]);
    }
}
alertArgurment(param);

复制代码

我们既然不能传递引用，那么他就直接将对象传进去了。。。

复制代码
var param = { name: '叶小钗', age: 33 };
function alertArgurment(d) {
    var tmp = param;
    d.id = '刀狂剑痴';
    arguments[0].qq = '素还真';
    var sss = '';
}
alertArgurment(param);
复制代码
大家请设置断点观察tmp的变化，d变化了tmp会与之同步，所以我们这里应该是把param直接给传递进去了吧：



整理

ECMAScript中所有函数的参数都是按值传递。在这点上我们容易模糊，因为引用类型传递的时候会完全的复制进去

在传递引入引用类型时，会把这个值在内存中的地址复制给一个局部变量，这个局部变量的变化会反应到外部。
就如我们上面的例子：
① 我们创建了一个对象param
② 我们将之转到函数内部后就复制给了d对象（arguments[0]）,d与param现在是同一对象，他们在堆中只有一个对象。
