function getValue(condition) {

		//----------- 块级作用域
    if (condition) {
        let value = "blue";

        // other code

        console.log(value); 
    } else {

        // value doesn't exist here
        console.log(null); 
    }

    //----------- 块级作用域
    var count = 30;
		// Does not throw an error
		if (condition) {

		    let count = 40;
		    console.log(count);
		}
		console.log(count);


		//-----------  阻止等号绑定，不能修改对象；
		// 一个const声明阻止修改绑定而不是修改值本身。这意味着const对象的声明不会阻止对这些对象的修改。
		const person = {
	    name: "Nicholas"
		};

		// works
		person.name = "Greg";

		// throws an error
		// person = {
		//     name: "Greg"
		// };
	  console.log(person);
		

	  //----------- 为了输出0，1，2，3
		var funcs = [];

		// for (var i = 0; i < 10; i++) {
		//     funcs.push(function(value) { 
		//     	return function(){console.log(value); 
		//     	}
		//     }(i));
		// }
		for (let i = 0; i < 10; i++) {
		    funcs.push(function() {
		        console.log(i);
		    });
		}

		funcs.forEach(function(func) {
		    func();     // outputs the number "10" ten times
		});
		
}



getValue(true)
