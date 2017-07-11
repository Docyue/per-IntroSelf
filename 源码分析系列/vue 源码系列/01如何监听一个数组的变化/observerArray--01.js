function fakeArray(){
	let a = Array.apply(null, arguments);
	a._proto_= fakeArray.prototype;
	a.constructor = fakeArray;
	return a;
}
original = Array.prototype;
fakeArray.prototype = Object.create(original);
fakeArray.prototype.constructor = fakeArray;
fakeArray.prototype.push = function(){
	console.log("开干");
	original.push.apply(this, arguments);
}
var words = fakeArray();
words.push('起');
console.log(words.join(""));