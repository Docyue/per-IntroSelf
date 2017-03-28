var http = require('http');
var fs = require('fs');
var net = require('net');
var url = require('url');

var cheerio = require('cheerio');
var request = require('request');




fetchPage(2);


// 请求数据
function fetchPage(allLength){
	for (var i = 1; i < allLength; i++) {
		var actUrl = 'http://book.zongheng.com/quanben/c0/c0/b9/u1/p'+ i +'/v9/s1/t0/ALL.html';
		var u = url.parse(actUrl);
		startRequest(u);
	};
	
}


// 请求爬区数据
function startRequest(x){
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
	console.log("chenggong");
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
		// 存在才进行下一步操作
		if(newItem.titleText != ''){
			getArtCharpters(newItem);
			fs.appendFile('./data/'+newItem.titleText+'.txt');
		}
	}
}


// 获取章节
function getArtCharpters(newItem){
	
	let acturl = newItem.link.split('/');
	for (var i = 0; i < acturl.length; i++) {
		if(acturl[i].indexOf('html') != -1){
			newItem.storyId= acturl[i].slice( 0,-5);
			let itemURL = 'http://book.zongheng.com/showchapter/'+acturl[i];
			startArtCharpter(itemURL, newItem)
		}
	};
}
// 请求拉取章节数据
function  startArtCharpter(x,newItem){
	http.get(x, function(res){
		var html = '';
		var title = ''
		res.setEncoding('utf-8');
		res.on('data', function(chunk){
			html += chunk;
		})
		res.on('end',function(){
			var $ = cheerio.load(html);
			
			setArtCharpter($,newItem);
		})
		res.on('error', function(err){
			console.log(err);
		})
	})
}
// 处理数据
function setArtCharpter($,newItem){
	let charpersItem = $('.booklist ').find('td.chapterBean');
	// 获取章节详情
	for (var i = 0; i < charpersItem.length; i++) {
		// 组装章节url
		let contentUrl = 'http://book.zongheng.com/chapter/'+newItem.storyId+ '/'+$(charpersItem[i]).attr("chapterid")+'.html'
		getCharpterDetail(contentUrl, $(charpersItem[i]).text(), newItem);
	};
	

}


// 获取章节详情
function getCharpterDetail(contentUrl, charpersItemText, newItem){
	http.get(contentUrl, function(res){
		var html = '';
		var title = ''
		res.setEncoding('utf-8');
		res.on('data', function(chunk){
			html += chunk;
		})
		res.on('end',function(){
			var $ = cheerio.load(html);
			
			setStoryContent($,charpersItemText, newItem);
		})
		res.on('error', function(err){
			console.log(err);
		})
	})
}

// 最后组装小说
function setStoryContent($, charpersItemText, newItem){
	// 小说名字
	// 小说章节
	// 小说内容
	let itemStoryContent= {
		storyName: newItem.titleText,
		storyCharpters: charpersItemText,
		storyCharptersContent: $('#chapterContent').text().trim()
	}
	let charpertContent= itemStoryContent.storyCharpters +'/n' +itemStoryContent.storyCharptersContent;

	fs.writeFile('./data/'+itemStoryContent.storyName+'.txt',charpertContent,function(err){
		if(err) throw err;
		console.log("小说写入成功");
	})
}





