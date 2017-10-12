// JavaScript---深拷贝
// ================================================================================
// 我们先看一下浅复制的缺陷，不知多少人中过招呢？
var oOriginal = {
  memNum: 1,                                      // number
  memStr: "I am a string",                      // string
  memObj: {
    test1: "Old value"                              // we’ll test
  },
  memArr: [                                         // array
    "a string",                                       // string member of array
    {                                                   // object member of array
      test2: "Try changing me"                 // we'll test
    }
  ]
}
// 这是一个比较复杂的对象，对象包含着对象与数组。我们用Prototype著名的继承函数复杂一下。它那个东东实在很难说是继承，jQuery的也不算。
var extend = function(result, source) {
  for (var key in source){
    result[key] = source[key];
  }
  return result;
}
// 测试程序：
var oCopy = extend({},oOriginal);                     // 浅拷贝
oCopy.memObj.test1 = "New value";                     // 出现问题了，会反射到原对象上
alert(oOriginal.memObj.test1);                        // 结果副本与原本都一同被修改了
oCopy.memArr[1].test2 = "I am changed";
alert(oOriginal.memArr[1].test2);                      // 同样中招了

// --------------------------------------------------------------------------------
// 看来如果不想修改原对象，我们需要特殊处理一下对象与数组。为了处理它们，我们就必须把它们识别出来。看下面函数：
	var is = function (obj,type) {
	  var toString = Object.prototype.toString,undefined;

	  return (type === "Null" && obj === null) ||
	    (type === "Undefined" && obj === undefined ) ||
	    toString.call(obj).slice(8,-1) === type;
	};
// 上面的函数是用于进行类型识别的，typeof是不可靠的，Array会返回"object"，instanceof也不行，它无法判定另一个文档对象的Array实例;
// 利用Object.prototype.toString.call虽然不是尽善尽美，鸭子类型嘛，很容易仿造，但总比以前的靠谱多了;

// --------------------------------------------------------------------------------
// 下面正式进入主题，我们的深拷贝函数会特殊处理值为对象与数组的键值对，对于它们，程序会为目标对象先创建一个新对象与数组，然后再一层层拷下去;
// 我们可以看到它并没有用hasOwnProperty，换言之，连原型中可遍历的属性都给它翻个底朝天;
// 对于数组，我们不用for(,,,)循环，它只能循环括号中的元素，无法循环附在数组上的其他属性，因此这里还是需要for...in这个特慢的方法;
// 由于深拷贝把所有属性都进行检测，中间还可能创建新对象，因此是个巨重型的方法。无事就别用;
	dom.deepCopy = function(result, source){
		for(var key in source) {
		  var copy = source[key];
		  if(source === copy) continue;//如window.window === window，会陷入死循环，需要处理一下
		  if(dom.is(copy,"Object")){
		    result[key] = arguments.callee(result[key] || {}, copy);
		  }else if(dom.is(copy,"Array")){
		    result[key] = arguments.callee(result[key] || [], copy);
		  }else{
		    result[key] = copy;
		  }
		}
		return result;
	};

// ================================================================================
// 要实现深复制有很多办法，比如最简单的办法有：
var cloneObj = JSON.parse(JSON.stringify(obj));

// 上面这种方法好处是非常简单易用，但是坏处也显而易见，这会抛弃对象的constructor，也就是深复制之后，无论这个对象原本的构造函数是什么，在深复制之后都会变成Object;
// 另外诸如RegExp对象是无法通过这种方式深复制的;
// --------------------------------------------------------------------------------
// 先决条件：
// 1. 对于任何对象，它可能的类型有Boolean, Number, Date, String, RegExp, Array 以及 Object（所有自定义的对象全都继承于Object）;
// 2. 我们必须保留对象的构造函数信息（从而使新对象可以使用定义在prototype上的函数）;
Object.prototype.clone = function () {
    var Constructor = this.constructor;
    var obj = new Constructor();

    for (var attr in this) {
        if (this.hasOwnProperty(attr)) {
            if (typeof(this[attr]) !== "function") {
                if (this[attr] === null) {
                    obj[attr] = null;
                }
                else {
                    obj[attr] = this[attr].clone();
                }
            }
        }
    }
    return obj;
};
// 定义在Object.prototype上的clone()函数是整个方法的核心，对于任意一个非js预定义的对象，都会调用这个函数;
// 而对于所有js预定义的对象，如Number,Array等，我们就要实现一个辅助clone()函数来实现完整的克隆过程：
// --------------------------------------------------------------------------------
/* Method of Array*/
Array.prototype.clone = function () {
    var thisArr = this.valueOf();
    var newArr = [];
    for (var i=0; i<thisArr.length; i++) {
        newArr.push(thisArr[i].clone());
    }
    return newArr;
};
/* Method of Boolean, Number, String*/
Boolean.prototype.clone = function() { return this.valueOf(); };
Number.prototype.clone = function() { return this.valueOf(); };
String.prototype.clone = function() { return this.valueOf(); };
/* Method of Date*/
Date.prototype.clone = function() { return new Date(this.valueOf()); };
/* Method of RegExp*/
RegExp.prototype.clone = function() {
    var pattern = this.valueOf();
    var flags = '';
    flags += pattern.global ? 'g' : '';
    flags += pattern.ignoreCase ? 'i' : '';
    flags += pattern.multiline ? 'm' : '';
    return new RegExp(pattern.source, flags);
};
