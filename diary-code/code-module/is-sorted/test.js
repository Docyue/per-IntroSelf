var sorted = require('./index.js')
console.log(sorted([1, 2, 3]));
// => true

console.log(sorted([3, 1, 2]))
// => false

// supports custom comparators
console.log(sorted([3, 2, 1], function (a, b) { return b - a })
// => true
