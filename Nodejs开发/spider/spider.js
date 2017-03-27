var http = require('http');
var fs = require('fs');
var net = require('net');
var url = require('url');

var cheerio = require('cheerio');
var request = require('request');

var i = 0;
var actUrl = 'http://book.zongheng.com/quanben/c0/c0/b9/u1/p1/v9/s1/t0/ALL.html';
http://book.zongheng.com/quanben/c0/c0/b9/u1/p2/v9/s1/t0/ALL.html


fetchPage();


// 请求数据
function fetchPage(){
	var u = url.parse(actUrl);
	startRequest(u);
}


// 请求爬区数据
function startRequest(x){
	console.log(x);
	http.get(x, function(res){
		var html = '';
		var title = ''
		res.setEncoding('utf-8');
		res.on('data', function(chunk){
			html += chunk;
		})
		res.on('end',function(){
			var $ = cheerio.load(html);

			var actBOX = $('.new_chapter').find(' .main_con').find(' li ');
			saveContent($,actBOX)
			
		})
		res.on('error', function(err){
			console.log(err);
		})
	})
}

// 处理数据生成文件
function saveContent($,actBOX){
	console.log("成功啦");
	actBOX.each(function(index, el) {
		getText(el, index)
	});

	function getText(actItem, actLength){
		var newItem = {
			titleText: $(actItem).find('.fs14').text().trim(),
			timeText: $(actItem).find('.time').text().trim(),
			link: $(actItem).find('.fs14').attr('href'),
			i: actLength
		}
		if(newItem.titleText != ''){
			fs.appendFile('./data/'+ newItem.titleText+'txt');
		}
	}
}


