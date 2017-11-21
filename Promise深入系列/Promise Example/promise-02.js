function getURL(URL){
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
		req.open('GET',URL,true);
		req.onload = function(){
			if(req.status === 200){
				resolve(req.responseText);
			}else{
				reject(new Error(req.statusText));
			}
		}
		req.onerror = function(){
			reject(new Error(req.statusText));
		}
		req.send();
	});	
}

// 运行示例
var URL = "http://httpbin.org/get"; 
getURL(URL).then(function onFulfilled(value){
	console.log(value); 
}).catch(function onRejected(error){
	console.error(error); 
});
