// generator---00
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}

// generator---01 遍历对象
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// generator---02 遍历对象
function* objectEntries2() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}
let jane2 = { first: 'Jane', last: 'Doe' };
jane2[Symbol.iterator] = objectEntries2;
for (let [key, value] of jane2) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

// generator---03
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}
// 扩展运算符
[...numbers()] // [1, 2]
// Array.from 方法
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();
x // 1
y // 2
// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2

// generator---04 throw
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

// generator---05 return
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

// generator---07 yield* 表达式
function* inner() {
  yield 'hello!';
}
function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}
var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"
function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}
var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"
