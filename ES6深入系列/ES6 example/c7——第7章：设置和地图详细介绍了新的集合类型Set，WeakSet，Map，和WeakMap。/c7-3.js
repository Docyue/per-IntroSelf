// ----------ECMAScript 6 Map类型是键值对的有序列表，其中键和值都可以有任何类型
let map = new Map();
map.set("title", "Understanding ES6");
map.set("year", 2016);
console.log(map.get("title"));      // "Understanding ES6"
console.log(map.get("year"));       // 2016
// ------三种方法都可用于地图和集合 
// has(key) - 确定地图中是否存在给定的键
// delete(key) - 从地图中删除密钥及其关联值
// clear() - 从地图中删除所有的键和值
// 地图还有一个size属性，指示它包含多少个键值对，与集合一样，size属性始终包含地图中键值对的数量
let map1 = new Map();
map1.set("name", "Nicholas");
map1.set("age", 25);
console.log(map1.size);          // 2
console.log(map1.has("name"));   // true
console.log(map1.get("name"));   // "Nicholas"
console.log(map1.has("age"));    // true
console.log(map1.get("age"));    // 25

map1.delete("name");
console.log(map1.has("name"));   // false
console.log(map1.get("name"));   // undefined
console.log(map1.size);          // 1

map1.clear();
console.log(map1.has("name"));   // false
console.log(map1.get("name"));   // undefined
console.log(map1.has("age"));    // false
console.log(map1.get("age"));    // undefined
console.log(map1.size);          // 0
// ------地图初始化
// 数组中的每个项目本身都是一个数组，其中第一个项目是键，第二个是该键的相应值
let map2 = new Map([["name", "Nicholas"], ["age", 25]]);
console.log(map2.has("name"));   // true
console.log(map2.get("name"));   // "Nicholas"
console.log(map2.has("age"));    // true
console.log(map2.get("age"));    // 25
console.log(map2.size);          // 2


// map 的forEach方法
let map3 = new Map([ ["name", "Nicholas"], ["age", 25]]);

map3.forEach(function(value, key, ownerMap) {
    console.log(key + " " + value);
    console.log(ownerMap === map3);
});

// ------弱map
// ECMAScript 6 WeakMap类型是键值对的无序列表，其中键必须是非空对象，值可以是任何类型
let map4 = new WeakMap(),
    element = document.querySelector(".element");
map4.set(element, "Original");
let value = map4.get(element);
console.log(value);             // "Original"
// remove the element
element.parentNode.removeChild(element);
element = null;
// the weak map4 is empty at this point
// 弱地图初始化
let key1 = {},
    key2 = {},
    map = new WeakMap([[key1, "Hello"], [key2, 42]]);

console.log(map.has(key1));     // true
console.log(map.get(key1));     // "Hello"
console.log(map.has(key2));     // true
console.log(map.get(key2));     // 42

// -------私有对象数据
// 此代码使用前导下划线的常见约定来指示属性被视为私有的，不应在对象实例外部进行修改
// 下面getName()读取this._name并且不允许_name的值改变
function Person(name) {
    this._name = name;
}

Person.prototype.getName = function() {
    return this._name;
};
//------ECMAScript 5 获取私有数据
//这种方法的大问题是数据privateData永远不会消失，因为无法知道对象实例何时被销毁的；
//privateData对象总是包含额外的数据
var Person = (function() {

    var privateData = {},
        privateId = 0;

    function Person(name) {
        Object.defineProperty(this, "_id", { value: privateId++ });

        privateData[this._id] = {
            name: name
        };
    }

    Person.prototype.getName = function() {
        return privateData[this._id].name;
    };

    return Person;
}());
// -----使用弱映射来解决
// Person示例使用弱映射为私有数据而不是对象
// 当Person调用构造函数时，将使用键this和包含私有信息的对象的值将新条目设置为弱映射
let Person = (function() {

    let privateData = new WeakMap();

    function Person(name) {
        privateData.set(this, { name: name });
    }

    Person.prototype.getName = function() {
        return privateData.get(this).name;
    };

    return Person;
}());
// -----------弱地图使用和限制
// 当决定是使用弱映射还是使用常规映射时，要考虑的主要决定是是否只使用对象键。任何时候只要使用对象键，那么最好的选择就是弱图。这将允许您优化内存使用，并通过确保在不再可访问后不再保留额外的数据来避免内存泄漏。
// 请记住，弱地图可以很轻松地显示其内容，因此您无法使用forEach()方法，size属性或clear()方法来管理项目。如果您需要一些检查功能，那么常规地图是更好的选择。请务必注意内存使用情况。
// 当然，如果你只想使用非对象键，那么常规的地图就是你唯一的选择


// ----------总结概要


// ECMAScript 6正式将集和地图引入JavaScript。在此之前，开发人员经常使用对象来模拟集合和映射，由于与对象属性相关的限制，常常遇到问题。

// 集是  唯一值的有序列表。不强制确定等价性。设置自动删除重复值，因此您可以使用集合过滤数组以获得重复数据并返回结果。集合不是数组的子类，因此您不能随机访问集合的值。相反，您可以使用该has()方法来确定集合中是否包含值，还可以使用size属性来检查集合中的值的数量。该Set类型还具有forEach()处理每个设置值的方法。

// 弱集  是只能包含对象的特殊集合。这些对象以弱引用存储，这意味着如果该项目是对对象的唯一剩余引用，则弱集合中的项目将不会阻止垃圾回收。由于内存管理的复杂性，无法检查弱集合内容，因此最好使用弱集只用于跟踪需要分组在一起的对象。

// 地图  是有序的键值对，键可以是任何数据类型。与集合类似，键不强制确定等价，这意味着您可以将数字键5和字符串"5"作为两个单独的键。任何数据类型的值都可以使用该set()方法与密钥相关联，并且该值可以稍后通过使用该get()方法来检索。地图还有一个size属性和一个forEach()方法来允许更容易的项目访问。

// 弱地图  是一种特殊类型的地图，只能有对象键。与弱集一样，对象关键字引用很弱，并且在对对象唯一的剩余引用时不会阻止垃圾回收。当密钥被垃圾回收时，与密钥相关联的值也从弱映射中移除。这种存储器管理方面使弱映射特别适合于将附加信息与其生命周期在访问它们的代码之外进行管理的对象相关联。





