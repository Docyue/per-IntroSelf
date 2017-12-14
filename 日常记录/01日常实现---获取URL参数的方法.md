#### 完整的URL由这几个部分构成：
scheme://host:port/path?query#fragment

    scheme:通信协议---常用的http,ftp,maito等
    host:主机---服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。
    port:端口号---整数，可选，省略时使用方案的默认端口，如http的默认端口为80。
    path:路径---由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。
    query:查询---可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&"符号隔开，每个参数的名和值用"="符号隔开。
    fragment:信息片断---字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点.)

URL 对应方法有：

    URL---window.location.href
    URL协议---window.location.protocol
    URL主机---window.location.host
    URL端口---window.location.port
    URL路径---window.location.pathname
    URL参数---window.location.search
    URL锚点---window.locationhash

方法一：采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）

    function GetQueryString(name)
    {
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
    // 调用方法
    alert(GetQueryString("参数名1"));
    alert(GetQueryString("参数名2"));
    alert(GetQueryString("参数名3"));


方法二：传统方法

    function UrlSearch() {
      var name, value;
      var str = location.href; //取得整个地址栏
      var num = str.indexOf("?")
      str = str.substr(num + 1); //取得所有参数   
      // stringvar.substr(start [, length ] 返回一个从指定位置开始的指定长度的子字符串

      var arr = str.split("&"); //各个参数放到数组里
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          value = arr[i].substr(num + 1);
          this[name] = value;
        }
      }
    }
    var Request = new UrlSearch(); //实例化
    alert(Request.id);
