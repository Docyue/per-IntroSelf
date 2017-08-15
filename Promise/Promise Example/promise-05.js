
function taskA() {
	console.log("Task A");
	throw new Error("throw Error @ Task A")
}

function taskB() {
	console.log("Task B");// 不会被调用
}
function onRejected(error) {
   console.log(error);// => "throw Error @ Task A" 
}
function finalTask() { 
	console.log("Final Task");
}
var promise = Promise.resolve(); 

promise
	.then(taskA) 
	.then(taskB) //不会调用
	.catch(onRejected) 
	.then(finalTask);