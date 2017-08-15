function doubleUp(value) { 
	return value * 2;
}
function increment(value) {
	return value + 1; 
}
function output(value) { 
	console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1); 

promise
	.then(increment) 
	.then(doubleUp) 
	.then(output) 
	.catch(function(error){
	   // promise chain中出现异常的时候会被调用
		console.error(error); 
	});