浏览器在 javascript 的加载方式
关键词：异步加载（async loading），延迟加载（lazy loading），延迟执行（lazy execution），async 属性， defer 属性
一、同步加载与异步加载的形式
1. 同步加载
我们平时最常使用的就是这种同步加载形式：
<script src="http://yourdomain.com/script.js"></script>
同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止了后续的解析，因此停止了后续的文件加载（如图像）、渲染、代码执行。
 js 之所以要同步执行，是因为 js 中可能有输出 document 内容、修改dom、重定向等行为，所以默认同步执行才是安全的。
以前的一般建议是把<script>放在页面末尾</body>之前，这样尽可能减少这种阻塞行为，而先让页面展示出来。
简单说：同步加载的网络 timeline 是瀑布模型，而异步加载的 timeline 是并发模型。


2. 常见异步加载（Script DOM Element）
(function() {
     var s = document.createElement('script');
     s.type = 'text/javascript';
     s.async = true;
     s.src = 'http://yourdomain.com/script.js';
     var x = document.getElementsByTagName('script')[0];
     x.parentNode.insertBefore(s, x);
 })();
异步加载又叫非阻塞，浏览器在下载执行 js 同时，还会继续进行后续页面的处理。
这种方法是在页面中<script>标签内，用 js 创建一个 script 元素并插入到 document 中。这样就做到了非阻塞的下载 js 代码。
async属性是HTML5中新增的异步支持，见后文解释，加上好（不加也不影响）。
此方法被称为 Script DOM Element 法，不要求 js 同源。
将js代码包裹在匿名函数中并立即执行的方式是为了保护变量名泄露到外部可见，这是很常见的方式，尤其是在 js 库中被普遍使用。
例如 Google Analytics 和 Google+ Badge 都使用了这种异步加载代码：

(function() {
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();
(function()

    {var po = document.createElement("script");
    po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(po, s);
 })();
但是，这种加载方式在加载执行完之前会阻止 onload 事件的触发，而现在很多页面的代码都在 onload 时还要执行额外的渲染工作等，所以还是会阻塞部分页面的初始化处理。


3. onload 时的异步加载
(function() {
     function async_load(){
         var s = document.createElement('script');
         s.type = 'text/javascript';
         s.async = true;
         s.src = 'http://yourdomain.com/script.js';
         var x = document.getElementsByTagName('script')[0];
         x.parentNode.insertBefore(s, x);
     }
     if (window.attachEvent)
         window.attachEvent('onload', async_load);
     else
         window.addEventListener('load', async_load, false);
 })();
这和前面的方式差不多，但关键是它不是立即开始异步加载 js ，而是在 onload 时才开始异步加载。这样就解决了阻塞 onload 事件触发的问题。
补充：DOMContentLoaded 与 OnLoad 事件
DOMContentLoaded : 页面(document)已经解析完成，页面中的dom元素已经可用。但是页面中引用的图片、subframe可能还没有加载完。
OnLoad：页面的所有资源都加载完毕（包括图片）。浏览器的载入进度在这时才停止。
这两个时间点将页面加载的timeline分成了三个阶段。



4.异步加载的其它方法 ***
由于Javascript的动态特性，还有很多异步加载方法：

    XHR Eval
    XHR Injection
    Script in Iframe
    Script Defer
    document.write Script Tag
    还有一种方法是用 setTimeout 延迟0秒 与 其它方法组合。

4.1 XHR Eval ：通过 ajax 获取js的内容，然后 eval 执行。
var xhrObj = getXHRObject();
 xhrObj.onreadystatechange =
   function() {
     if ( xhrObj.readyState != 4 ) return;
     eval(xhrObj.responseText);
   };
 xhrObj.open('GET', 'A.js', true);
 xhrObj.send('');

4.2 Script in Iframe：创建并插入一个iframe元素，让其异步执行 js 。
var iframe = document.createElement('iframe');
 document.body.appendChild(iframe);
 var doc = iframe.contentWindow.document;
 doc.open().write('<body onload="insertJS()">');
 doc.close();

4.3 GMail Mobile：页内 js 的内容被注释，所以不会执行，然后在需要的时候，获取script元素中 text 内容，去掉注释后 eval 执行。
<script type="text/javascript">
 /*
 var ...
 */
 </script>
详见参考资料中2010年的Velocity 大会 Steve Souders 和淘宝的那两个讲义。

二、async 和 defer 属性
1. defer 属性
<script src="file.js" defer></script>
defer属性声明这个脚本中将不会有 document.write 或 dom 修改。
浏览器将会并行下载 file.js 和其它有 defer 属性的script，而不会阻塞页面后续处理。
defer属性在IE 4.0中就实现了，超过13年了！Firefox 从 3.5 开始支持defer属性 。
注：所有的defer 脚本保证是按顺序依次执行的。

2. async 属性
<script src="file.js" async></script>
async属性是HTML5新增的。作用和defer类似，但是它将在下载后尽快执行，不能保证脚本会按顺序执行。它们将在onload 事件之前完成。
Firefox 3.6、Opera 10.5、IE 9 和 最新的Chrome 和 Safari 都支持 async 属性。可以同时使用 async 和 defer，这样IE 4之后的所有 IE 都支持异步加载。

3. 详细解释
<script> 标签在 HTML 4.01 与 HTML5 的区别：

    type 属性在HTML 4中是必须的，在HTML5中是可选的。
    async 属性是HTML5中新增的。
    个别属性（xml:space）在HTML5中不支持。
说明：
    async：false，script 将立即获取（下载）并执行，然后才继续后面的处理，这期间阻塞了浏览器的后续处理。
    async：true，那么 script 将被异步下载并执行，同时浏览器继续后续的处理。
    HTML4中就有了defer属性，它提示浏览器这个 script 不会产生任何文档元素（没有document.write），因此浏览器会继续后续处理和渲染。
    如果没有 async 属性 但是有 defer 属性，那么script 将在页面parse之后执行。（async=false;defer=true）

    如果同时设置了二者，那么 defer 属性主要是为了让不支持 async 属性的老浏览器按照原来的 defer 方式处理，而不是同步方式。（异步兼容，同时使用defer+async）


三、延迟加载（lazy loading）
前面解决了异步加载（async loading）问题，再谈谈什么是延迟加载。
延迟加载：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。延迟加载就是一开始并不加载这些暂时不用的js，而是在需要的时候或稍后再通过js 的控制来异步加载。
也就是将 js 切分成许多模块，页面初始化时只加载需要立即执行的 js ，然后其它 js 的加载延迟到第一次需要用到的时候再加载。
特别是页面有大量不同的模块组成，很多可能暂时不用或根本就没用到。
就像图片的延迟加载，在图片出现在可视区域内时（在滚动条下拉）才加载显示图片。



四、script 的两阶段加载 与 延迟执行（lazy execution）
JS的加载其实是由两阶段组成：下载内容（download bytes）和执行（parse and execute）。
浏览器在下载完 js 的内容后就会立即对其解析和执行，不管是同步加载还是异步加载。(下载后都立刻执行)
前面说的异步加载，解决的只是下载阶段的问题，但代码在下载后会立即执行。
而浏览器在解析执行 JS 阶段是阻塞任何操作的，这时的浏览器处于无响应状态。
我 们都知道通过网络下载 script 需要明显的时间，但容易忽略了第二阶段，解析和执行也是需要时间的。script的解析和执行所花的时间比我们想象的要多，尤其是script 很多很大的时候。有些是需要立刻执行，而有些则不需要（比如只是在展示某个界面或执行某个操作时才需要）。

原理：
这些script 可以延迟执行，先异步下载缓存起来，但不立即执行，而是在第一次需要的时候执行一次。
利用特殊的技巧可以做到 下载 与 执行的分离 (再次感谢 javascript 的动态特性)。比如将 JS 的内容作为 Image或 object 对象加载缓存起来，所以就不会立即执行了，然后在第一次需要的时候再执行。
此部分的更多解释 请查看末尾参考资料中 ControlJS 的相关链接。
小技巧：
1. 模拟较长的下载时间：
写个后端脚本，让其 sleep 一定时间。如在 jsp 中 Thread.sleep(5000); ，这样5秒后才能收到内容。
2. 模拟较长的 js 代码执行时间（因为这步一般比较快不容易观察到）：
var t_start = Number(new Date());
while ( t_start + 5000 > Number(new Date()) ) {}
这个代码将使 js 执行5秒才能完成！

五、script 标签使用的历史
1. script 放在 HEAD 中
<head>
  <script src=“…”></script>
  </head>
    阻止了后续的下载；
    在IE 6-7 中 script 是顺序下载的，而不是现在的 “并行下载、顺序执行” 的方式；
    在下载和解析执行阶段阻止渲染（rendering）； （这就是页面卡的根源！）

2. script 放在页面底部（2007）
...
 <script src=“…”></script>
 </body>
    不阻止其它下载；（底部/body前）
    在IE 6-7 中 script 是顺序下载的；
    在下载和解析执行阶段阻止渲染（rendering）；

3. 异步加载script（2009）**
var se = document.createElement
 ('script');
 se.src = 'http://anydomain.com/A.js';
 document.getElementsByTagName('head')
 [0].appendChild(se);

这就是本文主要说的方式。
    不阻止其它下载；
    在所有浏览器中，script都是并行下载；
    只在解析执行阶段阻止渲染（rendering）；

4. 异步下载 + 按需执行 (2010)（图片预加载）
var se = new Image();
 se.onload = registerScript();
 se.src = 'http://anydomain.com/A.js';
 把下载 js 与 解析执行 js 分离出来

    不阻止其它下载；
    在所有浏览器中，script都是并行下载；
    不阻止渲染（rendering）直到真正需要时；


六、异步加载的问题
在异步加载的时候，无法使用 document.write 输出文档内容。
在同步模式下，document.write 是在当前 script 所在的位置输 出文档的。而在异步模式下，浏览器继续处理后续页面内容，根本无法确定 document.write 应该输出到什么位置，所以异步模式下 document.write 不可行。而到了页面已经 onload 之后，再执行 document.write 将导致当前页面的内容被清空，因为它会自动触发 document.open 方法。
实际上document.write的名声并不好，最好少用。
替代方法：
1. 虽然异步加载不能用 document.write，但还是可以onload之后执行操作dom（创建dom或修改dom）的，这样可以实现一些自己的动态输出。比如要在页面异步创建一个浮动元素，这和它在页面中的位置就没关系了，只要创建出该dom元素添加到 document 中即可。
2. 如果需要在固定位置异步生成元素的内容，那么可以在该固定位置设置一个dom元素作为目标，这样就知道位置了，异步加载之后就可以对这个元素进行修改。

六、JS 模块化管理
异步加载，需要将所有 js 内容按模块化的方式来切分组织，其中就存在依赖关系，而异步加载不保证执行顺序。
另外，namespace 如何管理 等相关问题。这部分已超出本文内容，可参考：
RequireJS 、 CommonJS 以及 王保平(淘宝)的 SeaJS 及其博客 。

七、JS最佳实践：
1. 最小化 js 文件，利用压缩工具将其最小化，同时开启http gzip压缩。工具：
2. 尽量不要放在 <head> 中，尽量放在页面底部，最好是</body>之前的位置
3. 避免使用 document.write 方法
4. 异步加载 js ，使用非阻塞方式，就是此文内容。
5. 尽量不直接在页面元素上使用 Inline Javascript，如onClick 。有利于统一维护和缓存处理。
