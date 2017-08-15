// let doSth = new Promise((resolve, reject) => {
//   console.log('hello');
//   resolve();
// });

// setTimeout(() => {
//   doSth.then(() => {
//     console.log('over');
//   })
// }, 3000);

// let a = [1,2];
// let b = [5,8];
// console.log(zipWith(a,b,(a,b)=>a+b));

// function zipWith(...arrays) {
//   const length = arrays.length
//   let iteratee = length > 1 ? arrays[length - 1] : undefined
//   iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined
//   return unzipWith(arrays, iteratee)
// }


function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

var g = function* () {
  try {
    var foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);






