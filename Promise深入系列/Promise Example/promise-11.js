var assert = require('power-assert'); 
function shouldRejected(promise) {
	return {
		'catch': function (fn) {
			return promise.then(function () {
				throw new Error('Expected promise to be rejected but it was fulfilled');
			}, function (reason) { 
				fn.call(promise, reason);
		});
	   }
	};
}
it('should be rejected', function () {
	var promise = Promise.reject(new Error('human error')); 
	
	return shouldRejected(promise).catch(function (error) {
		assert(error.message === 'human error'); 
	});
});