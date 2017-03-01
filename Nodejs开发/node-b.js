var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.baidu.com/';

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapter = $('.s-manhattan-index');
	
}

http.get(url,function(res){
	var html = '';
	res.on('data',function(data){
		html += data;
	})
	res.on('end',function(){
		console.log(html);
		filterChapters(data)
	})
}).on('error',function(){
	console.log("获取数据错误！");
})