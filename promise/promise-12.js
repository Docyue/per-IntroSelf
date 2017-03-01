var assert = require('power-assert'); 
function shouldFulfilled(promise) {
	return {
		'then': function (fn) {
			return promise.then(function (value) { 
				fn.call(promise, value);
			}, function (reason) { 
				throw reason;
			}); 
		}
	}; 
}
it('should be fulfilled', function () {
	var promise = Promise.resolve('value');
	return shouldFulfilled(promise).then(function (value) {
		assert(value === 'value'); 
	});
});