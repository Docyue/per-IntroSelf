console.log(a);

function  a (a1,a2,a3){
	// console.log(a1);
	// console.log(a3);
	// console.log(bb);
	var a2,
		a3 = 'canshu11';
	// console.log(a2);
	function bb(){}
}
a('canshu1')

for (var i = 0; i < 5; i++) {
	// console.log(i);
	setTimeout(function(){
		console.log(i);
	}, 0)
};

setTimeout(function(){
    var a=100;
    console.log(a);
    setTimeout(function () {
        var b=200;
        console.log(b)
        setTimeout(function () {
            var c=300;
            console.log(c)
        }, 1000);
    }, 1000);
},0);   