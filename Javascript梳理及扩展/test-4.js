let data = []

// for (var i = 0; i < 5; i++) {
//   data[i] = function(){
//     console.log(i);
//   }
// }
// // 啥都不输出
//
//
// for (var i = 0; i < 5; i++) {
//   (data[i] = function(){
//     console.log(i);
//   })()
// }
// // 0 1 2 3 4
//
//
// for (var i = 0; i < 5; i++) {
//   data[i] = (function(i){
//     console.log(i);
//   })(i)
// }
//
// // 0 1 2 3 4


for (var i = 0; i < 5; i++) {
  setTimeout(function(){
    console.log(i);
  })
}
// 5 5 5 5 5
