setTimeout(function(){
  console.log("setTimeout1");
})
new Promise(function(resolve){
  console.log("Promise1");
  for(var i =0; i<1000;i++){
    i ==99 && resolve();
  }
  console.log('Promise2');
}).then(function(){
  console.log('then1');
})
console.log("global");
// Promise1
// Promise2
// global
// then1
// setTimeout1
