// ----------
console.log("x".repeat(3));

// ----------
var pattern = /hello\d/y;
console.log(pattern.sticky);    // true

// ----------
function hasRegExpY() {
    try {
        var pattern = new RegExp(".", "y");
        console.log(true); 
    } catch (ex) {
        console.log(false); 
    }
}
hasRegExpY()

// ----------
var re = /ab/g;
console.log(re.source);     // "ab"
console.log(re.flags);      // "g"