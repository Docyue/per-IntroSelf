// function asyncFunction() {
// 	return new Promise(function (resolve, reject) { 
// 		setTimeout(function () {
// 			resolve('Async Hello world'); 
// 		}, 16);
// 	}); 
// }
// asyncFunction().then(function (value) { 
// 	console.log(value); // => 'Async Hello world'
// 	}).catch(function (error) { console.log(error);
// });

// setTimeout(function(){
//     var a=100;
//     console.log(a);
//     setTimeout(function () {
//         var b=200;
//         console.log(b)
//         setTimeout(function () {
//             var c=300;
//             console.log(c)
//         }, 200);
//     }, 100);
// },1000);   

new Promise(function (resolve, reject) {
    setTimeout(function () {
        var a=100;
        resolve(a);
    }, 1000);
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var b=200;
            resolve(b);
        }, 1000);
    })
}).then(function (res) {
    console.log(res);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var c=300
            resolve(c);
        }, 1000);
    })
}).then(function (res) {

    console.log(res);
})













