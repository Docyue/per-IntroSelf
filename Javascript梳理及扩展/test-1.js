console.log('golb1');

setTimeout(function(){
  console.log('timeout1')
  process.nextTick(function(){
    console.log('timeout1_nextTick');
  })
  new Promise(function(resolve){
    console.log('timeout1_promise');
    resolve();
  }).then(function(){
    console.log('timeout1_then');
  })
})

setImmediate(function(){
  console.log('immadiate1');
  process.nextTick(function(){
    console.log('immadiate1_nextTick');
  })
  new Promise(function(resolve){
    console.log('immadiate1_promise');
    resolve();
  }).then(function(){
    console.log('immadiate1_then');
  })
})

process.nextTick(function(){
  console.log('glob1_nextTick');
})


new Promise(function(resolve){
  console.log('glob1_promise');
  resolve();
}).then(function(){
  console.log('glob1_then');
})

setTimeout(function(){
  console.log('timeout2')
  process.nextTick(function(){
    console.log('timeout2_nextTick');
  })
  new Promise(function(resolve){
    console.log('timeout2_promise');
    resolve();
  }).then(function(){
    console.log('timeout2_then');
  })
})

process.nextTick(function(){
  console.log('glob2_nextTick');
})
new Promise(function(resolve){
  console.log('glob2_promise');
  resolve();
}).then(function(){
  console.log('glob2_then');
})

setImmediate(function(){
  console.log('immadiate2');
  process.nextTick(function(){
    console.log('immadiate2_nextTick');
  })
  new Promise(function(resolve){
    console.log('immadiate2_promise');
    resolve();
  }).then(function(){
    console.log('immadiate2_then');
  })
})

// golb1
// glob1_promise
// glob2_promise
// glob1_nextTick
// glob2_nextTick
// glob1_then
// glob2_then
// timeout1
// timeout1_promise
// timeout2
// timeout2_promise
// timeout1_nextTick
// timeout2_nextTick
// timeout1_then
// timeout2_then
// immadiate1
// immadiate1_promise
// immadiate2
// immadiate2_promise
// immadiate1_nextTick
// immadiate2_nextTick
// immadiate1_then
// immadiate2_then
