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
