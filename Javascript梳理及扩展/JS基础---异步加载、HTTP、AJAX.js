JavaScript---异步加载、HTTP、AJAX
// ================================================================================
1、js 异步加载和同步加载
异步加载：也叫非阻塞模式加载，浏览器在下载js的同时，同时还会执行后续的页面处理；

在script标签内，用js创建一个script元素并插入到document中，这种就是异步加载js文件了：
(function() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'http://yourdomain.com/script.js';
    var x = document.getElementsByTagName('script')[0];
     x.parentNode.insertBefore(s, x);
})();
// --------------------------------------------------------------------------------
同步加载：平常默认用的都是同步加载。同步模式又称阻塞模式，会阻止流览器的后续处理。停止了后续的文件的解析，执行，如图像的渲染；
浏览器之所以会采用同步模式，是因为加载的js文件中有对dom的操作，重定向，输出document等默认行为，所以同步才是最安全的。

通常会把要加载的js放到body结束标签之前，使得js可在页面最后加载，尽量减少阻塞页面的渲染。这样可以先让页面显示出来。如：
<script src="http://yourdomain.com/script.js"></script>

// 同步加载流程是瀑布模型，异步加载流程是并发模型。
// ================================================================================
2、http请求和ajax 以及ajax跨域
A、  HTTP请求
超文本传输协议（HTTP）的设计目的是保证客户机与服务器之间的通信。
HTTP 的工作方式是客户机与服务器之间的请求-应答协议。
两种 HTTP 请求方法：GET 和 POST
a.GET 方法
请注意，查询字符串（名称/值对）是在 GET 请求的 URL 中发送的：
/test/demo_form.asp?name1=value1&name2=value2
有关 GET 请求的其他一些注释：
GET 请求可被缓存
GET 请求保留在浏览器历史记录中
GET 请求可被收藏为书签
GET 请求不应在处理敏感数据时使用
GET 请求有长度限制
GET 请求只应当用于取回数据
b.POST 方法
请注意，查询字符串（名称/值对）是在 POST 请求的 HTTP 消息主体中发送的：
POST /test/demo_form.asp HTTP/1.1
Host: w3schools.com
name1=value1&name2=value2
有关 POST 请求的其他一些注释：
POST 请求不会被缓存
POST 请求不会保留在浏览器历史记录中
POST 不能被收藏为书签
POST 请求对数据长度没有要求

================================================================================
3、AJAX
AJAX (异步 JavaScript 和 XML) 是个新产生的术语,专为描述JavaScript的两项强大性能.这两项性能在多年来一直被网络开发者所忽略,直到最近Gmail, Google Suggest和Google Maps的横空出世才使人们开始意识到其重要性.
这两项被忽视的性能是:
无需重新装载整个页面便能向服务器发送请求.
对XML文档的解析和处理

1、步骤1发送一个HTTP请求
为了用JavaScript向服务器发送一个HTTP请求, 需要一个具备这种功能的类实例. 这样的类首先由Internet Explorer以ActiveX对象引入, 被称为XMLHTTP. 后来Mozilla, Safari 和其他浏览器纷纷仿效, 提供了XMLHttpRequest类,它支持微软的ActiveX对象所提供的方法和属性.
A、创建一个跨浏览器的这样的类实例(对象), 可以应用如下代码:
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
http_request = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
http_request = new ActiveXObject("Microsoft.XMLHTTP");
}
(上例对代码做了一定简化,这是为了解释如何创建XMLHTTP类实例. 实际的代码实例可参阅本篇步骤3.)
如果服务器的响应没有XML mime-type header,某些Mozilla浏览器可能无法正常工作. 为了解决这个问题, 如果服务器响应的header不是text/xml,可以调用其它方法修改该header.
http_request = new XMLHttpRequest();
http_request.overrideMimeType('text/xml');

B、决定当收到服务器的响应后,需要做什么.这需要告诉HTTP请求对象用哪一个JavaScript函数处理这个响应.可以将对象的onreadystatechange属性设置为要使用的JavaScript的函数名,如下所示:
http_request.onreadystatechange = nameOfTheFunction;
注意:在函数名后没有括号,也无需传递参数.另外还有一种方法,你可以使用一个匿名函数来描述那些要对服务器返回的响应内容所进行的操作,如下所示:
http_request.onreadystatechange = function(){
// do the thing
};

C、在定义了如何处理响应后,就要发送请求了.可以调用HTTP请求类的open()和send()方法, 如下所示:
http_request.open('GET','http://www.example.org/some.file',true); http_request.send(null);

open()的第一个参数是HTTP请求方式 – GET, POST, HEAD 或任何服务器所支持的您想调用的方式. 按照HTTP规范,该参数要大写;否则,某些浏览器(如Firefox)可能无法处理请求.有关HTTP请求方法的详细信息可参考http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html

第二个参数是请求页面的URL.由于自身安全特性的限制,该页面不能为第三方域名的页面.同时一定要保证在所有的页面中都使用准确的域名,否则调用open()会得到"permission denied"的错误提示.一个常见的错误是访问站点时使用domain.tld,而当请求页面时,却使用www.domain.tld.

第三个参数设置请求是否为异步模式.如果是TRUE, JavaScript函数将继续执行,而不等待服务器响应.这就是"AJAX"中的"A".
如果第一个参数是"GET",通过open()第二个参数，传递参数，一般用于查询，jsonp的跨域就是这个原理，也只能解决get方式的请求；
如果第一个参数是"POST",send()方法的参数可以是任何想送给服务器的数据. 这时数据要以字符串的形式送给服务器,如下所示:
name=value&anothername=othervalue&so=on

2、步骤 2处理服务器的响应
当发送请求时,要提供指定处理响应的JavaScript函数名.
http_request.onreadystatechange = nameOfTheFunction;

首先函数会检查请求的状态.如果状态值是4,就意味着一个完整的服务器响应已经收到了,您将可以处理该响应.
if (http_request.readyState == 4) {
// everything is good, the response is received
} else {
// still not ready
}
readyState的取值如下:
0 (未初始化)
1 (正在装载)
2 (装载完毕)
3 (交互中)
4 (完成)
(Source)

接着,函数会检查HTTP服务器响应的状态值. 完整的状态取值可参见 W3C site. 我们着重看值为200 OK的响应.
if (http_request.status == 200) {
// perfect!
} else {
// there was a problem with the request,
// for example the response may be a 404 (Not Found)
// or 500 (Internal Server Error) response codes
}
在检查完请求的状态值和响应的HTTP状态值后, 您就可以处理从服务器得到的数据了.有两种方式可以得到这些数据:
http_request.responseText – 以文本字符串的方式返回服务器的响应
http_request.responseXML – 以XMLDocument对象方式返回响应.处理XMLDocument对象可以用JavaScript DOM函数

3、步骤 3简单实例
我们现在将整个过程完整地做一次,发送一个简单的HTTP请求. 我们用JavaScript请求一个HTML文件, test.html, 文件的文本内容为"I'm a test.".然后我们"alert()"test.html文件的内容.
< script type = "text/javascript" >
var http_request = false;

function makeRequest(url) {
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);
}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            alert(http_request.responseText);
        } else {
            alert('There was a problem with the request.');
        }
    }
} < /script>
<span style="cursor: pointer; text-decoration: underline"   onclick="makeRequest('test.html')"> Make a request</span >本例中:
用户点击浏览器上的"请求"链接;
接着函数makeRequest()将被调用.其参数 – HTML文件test.html在同一目录下;
这样就发起了一个请求.onreadystatechange的执行结果会被传送给alertContents();
alertContents()将检查服务器的响应是否成功地收到,如果是,就会"alert()"test.html文件的内容.
