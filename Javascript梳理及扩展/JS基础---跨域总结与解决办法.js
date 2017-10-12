JavaScript---跨域总结与解决办法
================================================================================
什么是跨域
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。

广义的跨域：
1.) 资源跳转： A链接、重定向、表单提交
2.) 资源嵌入：<link>、<script>、<img>、<frame>等dom标签，还有样式中background:url()、@font-face()等文件外链
3.) 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等
--------------------------------------------------------------------------------
其实我们通常所说的跨域是狭义的，是由浏览器同源策略限制的一类请求场景；
同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指”协议+域名+端口”三者相同，即协议、域名、端口有任何一个不同，都被当作是不同的域，即便两个不同的域名指向同一个ip地址，也非同源；

同源策略限制以下几种行为：
1.) Cookie、LocalStorage 和 IndexDB 无法读取
2.) DOM 和 Js对象无法获得
3.) AJAX 请求不能发送

更详细的说明可以看下表：
URL                                 说明                      是否允许通信
http://www.a.com/a.js
http://www.a.com/b.js               同一域名下                  允许
http://www.a.com/lab/a.js
http://www.a.com/script/b.js        同一域名下不同文件夹          允许
http://www.a.com:8000/a.js
http://www.a.com/b.js               同一域名，不同端口           不允许
http://www.a.com/a.js
https://www.a.com/b.js              同一域名，不同协议           不允许
http://www.a.com/a.js
http://70.32.92.74/b.js             域名和域名对应ip             不允许
http://www.a.com/a.js
http://script.a.com/b.js            主域相同，子域不同            不允许
http://www.a.com/a.js
http://a.com/b.js                   同一域名，不同二级域名        不允许（cookie这种情况下也不允许访问）
http://www.cnblogs.com/a.js
http://www.a.com/b.js               不同域名                    不允许
特别注意两点：
第一，如果是协议和端口造成的跨域问题“前台”是无能为力的，
第二：在跨域问题上，域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上。
“URL的首部”指window.location.protocol + window.location.host，也可以理解为“Domains, protocols and ports must match”。
接下来简单地总结一下在“前台”一般处理跨域的办法，后台proxy这种方案牵涉到后台配置，这里就不阐述了；

--------------------------------------------------------------------------------
跨域解决方案
1、 通过jsonp跨域
2、 document.domain + iframe跨域
3、 location.hash + iframe
4、 window.name + iframe跨域
5、 postMessage跨域
6、 跨域资源共享（CORS）
7、 nginx代理跨域
8、 nodejs中间件代理跨域
9、 WebSocket协议跨域


================================================================================
一、 通过jsonp跨域
通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上；
在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。

1.）原生实现：
<script>
    var script = document.createElement('script');
    script.type = 'text/javascript';
    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);
    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
</script>
服务端返回如下（返回时即执行全局函数）：
onBack({"status": true, "user": "admin"})

2.）jquery ajax：
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',  // 请求方式为jsonp
    jsonpCallback: "onBack",    // 自定义回调函数名
    data: {}
});

3.）vue.js：
this.$http.jsonp('http://www.domain2.com:8080/login', {
    params: {},
    jsonp: 'onBack'
}).then((res) => {
    console.log(res);
})

后端node.js代码示例：
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();
server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});
server.listen('8080');
console.log('Server is running at port 8080...');

jsonp缺点：只能实现get一种请求。


================================================================================
二、document.domain+iframe的设置
对于主域相同而子域不同的例子，可以通过设置document.domain的办法来解决；
具体的做法是可以在http://www.a.com/a.html和http://script.a.com/b.html两个文件中分别加上document.domain = ‘a.com’；
然后通过a.html文件中创建一个iframe，去控制iframe的contentDocument，这样两个js文件之间就可以“交互”了；
当然这种办法只能解决主域相同而二级域名不同的情况，如果你异想天开的把script.a.com的domian设为alibaba.com那显然是会报错地！

www.a.com上的a.html
--------------------------------------------------------------------------------
document.domain = 'a.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.a.com/b.html';
ifr.style.display = 'none';
document.body.appendChild(ifr);
ifr.onload = function(){
    var doc = ifr.contentDocument || ifr.contentWindow.document;
    // 在这里操纵b.html
    alert(doc.getElementsByTagName("h1")[0].childNodes[0].nodeValue);
};

script.a.com上的b.html
--------------------------------------------------------------------------------
document.domain = 'a.com';

这种方式适用于{www.kuqin.com, kuqin.com, script.kuqin.com, css.kuqin.com}中的任何页面相互通信。
备注：某一页面的domain默认等于window.location.hostname。主域名是不带www的域名，例如a.com，主域名前面带前缀的通常都为二级域名或多级域名，例如www.a.com其实是二级域名。 domain只能设置为主域名，不可以在b.a.com中将domain设置为c.a.com。

问题：
1、安全性，当一个站点（b.a.com）被攻击后，另一个站点（c.a.com）会引起安全漏洞。
2、如果一个页面中引入多个iframe，要想能够操作所有iframe，必须都得设置相同domain。
2、动态创建script 虽然浏览器默认禁止了跨域访问，但并不禁止在页面中引用其他域的JS文件，并可以自由执行引入的JS文件中的function（包括操作cookie、Dom等等），根据这一点，可以方便地通过创建script节点的方法来实现完全跨域的通信。

这里判断script节点加载完毕还是蛮有意思的：ie只能通过script的readystatechange属性，其它浏览器是script的load事件，以下是部分判断script加载完毕的方法：

js.onload = js.onreadystatechange = function() {
    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        // callback在此处执行
        js.onload = js.onreadystatechange = null;
    }
};


================================================================================
三、利用iframe和location.hash
这个办法比较绕，但是可以解决完全跨域情况下的脚步置换问题，原理是利用location.hash来进行传值；
在url： http://a.com#helloword中的‘#helloworld’就是location.hash，改变hash并不会导致页面刷新，所以可以利用hash值来进行数据传递，当然数据容量是有限的；
假设域名a.com下的文件cs1.html要和cnblogs.com域名下的cs2.html传递信息，cs1.html首先创建自动创建一个隐藏的iframe，iframe的src指向cnblogs.com域名下的cs2.html页面，这时的hash值可以做参数传递用；
cs2.html响应请求后再将通过修改cs1.html的hash值来传递数据（由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于a.com域名下的一个代理iframe；Firefox可以修改）。同时在cs1.html上加一个定时器，隔一段时间来判断location.hash的值有没有变化，一点有变化则获取获取hash值。代码如下：

a.com下的文件cs1.html文件：
--------------------------------------------------------------------------------
function startRequest(){
    var ifr = document.createElement('iframe');
    ifr.style.display = 'none';
    ifr.src = 'http://www.cnblogs.com/lab/cscript/cs2.html#paramdo';
    document.body.appendChild(ifr);
}

function checkHash() {
    try {
        var data = location.hash ? location.hash.substring(1) : '';
        if (console.log) {
            console.log('Now the data is '+data);
        }
    } catch(e) {};
}
setInterval(checkHash, 2000);

cnblogs.com域名下的cs2.html:
--------------------------------------------------------------------------------
//模拟一个简单的参数处理操作
switch(location.hash){
    case '#paramdo':
        callBack();
        break;
    case '#paramset':
        //do something……
        break;
}

function callBack(){
    try {
        parent.location.hash = 'somedata';
    } catch (e) {
        // ie、chrome的安全机制无法修改parent.location.hash，
        // 所以要利用一个中间的cnblogs域下的代理iframe
        var ifrproxy = document.createElement('iframe');
        ifrproxy.style.display = 'none';
        ifrproxy.src = 'http://a.com/test/cscript/cs3.html#somedata';    // 注意该文件在"a.com"域下
        document.body.appendChild(ifrproxy);
    }
}

a.com下的域名cs3.html
--------------------------------------------------------------------------------
//因为parent.parent和自身属于同一个域，所以可以改变其location.hash的值
parent.parent.location.hash = self.location.hash.substring(1);
当然这样做也存在很多缺点，诸如数据直接暴露在了url中，数据容量和类型都有限等……


================================================================================
四、window.name实现的跨域数据传输
window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。
1.）a.html：(http://www.domain1.com/a.html)
var proxy = function(url, callback) {
    var state = 0;
    var iframe = document.createElement('iframe');

    // 加载跨域页面
    iframe.src = url;

    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    iframe.onload = function() {
        if (state === 1) {
            // 第2次onload(同域proxy页)成功后，读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();

        } else if (state === 0) {
            // 第1次onload(跨域页)成功后，切换到同域代理页面
            iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
            state = 1;
        }
    };

    document.body.appendChild(iframe);

    // 获取数据以后销毁这个iframe，释放内存；这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
        document.body.removeChild(iframe);
    }
};
// 请求跨域b页面数据
proxy('http://www.domain2.com/b.html', function(data){
    alert(data);
});

2.）proxy.html：(http://www.domain1.com/proxy….
中间代理页，与a.html同域，内容为空即可。

3.）b.html：(http://www.domain2.com/b.html)
<script>
    window.name = 'This is domain2 data!';
</script>


================================================================================
五、使用HTML5 postMessage
postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：
a.） 页面和其打开的新窗口的数据传递
b.） 多窗口之间消息传递
c.） 页面与嵌套的iframe消息传递
d.） 上面三个场景的跨域数据传递

otherWindow.postMessage(message, targetOrigin);
otherWindow: 对接收信息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。
message: 所要发送的数据，string类型，传参时最好用JSON.stringify()序列化。
targetOrigin: 用于限制otherWindow，“*”表示不作限制

a.com/index.html中的代码：
--------------------------------------------------------------------------------
<iframe id="ifr" src="b.com/index.html"></iframe>
<script type="text/javascript">
window.onload = function() {
    var ifr = document.getElementById('ifr');
    var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                        // 若写成'http://c.com'就不会执行postMessage了
    ifr.contentWindow.postMessage('I was there!', targetOrigin);
};
</script>

b.com/index.html中的代码：
--------------------------------------------------------------------------------
<script type="text/javascript">
    window.addEventListener('message', function(event){
        // 通过origin属性判断消息来源地址
        if (event.origin == 'http://a.com') {
            alert(event.data);    // 弹出"I was there!"
            alert(event.source);  // 对a.com、index.html中window对象的引用
                                  // 但由于同源策略，这里event.source不可以访问window对象
        }
    }, false);
</script>


================================================================================
六、跨域资源共享（CORS）
普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置。
带cookie请求：前后端都需要设置字段，另外需注意：所带cookie为跨域请求接口所在域的cookie，而非当前页。
目前，所有浏览器都支持该功能(IE8+：IE8/9需要使用XDomainRequest对象来支持CORS）)，CORS也已经成为主流的跨域解决方案。

1、 前端设置：
1.）原生ajax
// 前端设置是否带cookie
xhr.withCredentials = true;
示例代码：
var xhr = new XMLHttpRequest(); // IE8/9需用window.XDomainRequest兼容
// 前端设置是否带cookie
xhr.withCredentials = true;
xhr.open('post', 'http://www.domain2.com:8080/login', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('user=admin');
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        alert(xhr.responseText);
    }
};

2.）jQuery ajax
$.ajax({
    ...
   xhrFields: {
       withCredentials: true    // 前端设置是否带cookie
   },
   crossDomain: true,   // 会让请求头中包含跨域的额外信息，但不会含cookie
    ...
});

3.）vue框架
在vue-resource封装的ajax组件中加入以下代码：
Vue.http.options.credentials = true


--------------------------------------------------------------------------------
2、 服务端设置：
若后端设置成功，前端浏览器控制台则不会出现跨域报错信息，反之，说明没设成功。
1.）Java后台：

/*
* 导入包：import javax.servlet.http.HttpServletResponse;
* 接口参数中定义：HttpServletResponse response
*/
response.setHeader("Access-Control-Allow-Origin", "http://www.domain1.com");  // 若有端口需写全（协议+域名+端口）
response.setHeader("Access-Control-Allow-Credentials", "true");

2.）Nodejs后台示例：
var http = require('http');
var server = http.createServer();
var qs = require('querystring');

server.on('request', function(req, res) {
    var postData = '';
    // 数据块接收中
    req.addListener('data', function(chunk) {
        postData += chunk;
    });
    // 数据接收完毕
    req.addListener('end', function() {
        postData = qs.parse(postData);
        // 跨域后台设置
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': 'http://www.domain1.com',    // 允许访问的域（协议+域名+端口）
            'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取cookie
        });
        res.write(JSON.stringify(postData));
        res.end();
    });
});
server.listen('8080');
console.log('Server is running at port 8080...');


================================================================================
七、 nginx代理跨域
1、 nginx配置解决iconfont跨域
浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。

location / {
  add_header Access-Control-Allow-Origin *;
}

--------------------------------------------------------------------------------
2、 nginx反向代理接口跨域
跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。
实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

nginx具体配置：
#proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;

    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}

1.)前端代码示例：

var xhr = new XMLHttpRequest();
// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;
// 访问nginx中的代理服务器
xhr.open('get', 'http://www.domain1.com:81/?user=admin', true);
xhr.send();

2.) Nodejs后台示例：

var http = require('http');
var server = http.createServer();
var qs = require('querystring');
server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));
    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });
    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');



================================================================================
八、 Nodejs中间件代理跨域
node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发。

1、 非vue框架的跨域（2次跨域）
利用node + express + http-proxy-middleware搭建一个proxy服务器。

1.）前端代码示例：
var xhr = new XMLHttpRequest();
// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;
// 访问http-proxy-middleware代理服务器
xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
xhr.send();

2.）中间件服务器：
var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();
app.use('/', proxy({
    // 代理跨域目标接口
    target: 'http://www.domain2.com:8080',
    changeOrigin: true,
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function(proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },
    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));
app.listen(3000);
console.log('Proxy server is listen at port 3000...');

3.）Nodejs后台同（六：nginx）

--------------------------------------------------------------------------------
2、 vue框架的跨域（1次跨域）
利用node + webpack + webpack-dev-server代理接口跨域。在开发环境下，由于vue渲染服务和接口代理服务都是webpack-dev-server同一个，所以页面与代理接口之间不再跨域，无须设置headers跨域信息了。

webpack.config.js部分配置：
module.exports = {
    entry: {},
    module: {},
    ...
    devServer: {
        historyApiFallback: true,
        proxy: [{
            context: '/login',
            target: 'http://www.domain2.com:8080',  // 代理跨域目标接口
            changeOrigin: true,
            cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
        }],
        noInfo: true
    }
}



================================================================================
九、 WebSocket协议跨域
WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
原生WebSocket API使用起来不太方便，我们使用Socket.io，它很好地封装了webSocket接口，提供了更简单、灵活的接口，也对不支持webSocket的浏览器提供了向下兼容。

1.）前端代码：
<div>user input：<input type="text"></div>
<script src="./socket.io.js"></script>
<script>
var socket = io('http://www.domain2.com:8080');
// 连接成功处理
socket.on('connect', function() {
    // 监听服务端消息
    socket.on('message', function(msg) {
        console.log('data from server: ---> ' + msg);
    });
    // 监听服务端关闭
    socket.on('disconnect', function() {
        console.log('Server socket has closed.');
    });
});

document.getElementsByTagName('input')[0].onblur = function() {
    socket.send(this.value);
};
</script>


2.）Nodejs socket后台：
var http = require('http');
var socket = require('socket.io');
// 启http服务
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});
server.listen('8080');
console.log('Server is running at port 8080...');
// 监听socket连接
socket.listen(server).on('connection', function(client) {
    // 接收信息
    client.on('message', function(msg) {
        client.send('hello：' + msg);
        console.log('data from client: ---> ' + msg);
    });

    // 断开处理
    client.on('disconnect', function() {
        console.log('Client socket has closed.');
    });
});
