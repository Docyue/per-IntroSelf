JavaScript---事件流
================================================================================
A、事件流
浏览器中的事件流意味着页面上可有不仅一个，甚至多个元素响应同一个事件。而这一个或多个元素响应事件发生的先后顺序在各个浏览器（主要针对IE和Netscape）上是不同的：

冒泡型事件（Dubbed Bubbling）：
IE上的解决方案就是冒泡型事件（Dubbed Bubbling）。冒泡型事件的基本思想是，事件按照从最特定的事件目标到最不特定的事件目标（document对象）的顺序触发；

捕获型事件（Event Capturing）：
相对IE4.0，Netscape4.0则使用的是捕获型事件的解决方案。这个事件触发的过程则正好和冒泡相反——在捕获型事件中，事件从最不精确的对象（document对象）开始触发，然后到最精确的对象。

DOM 事件流：
这个事件流则是W3C制定一个标准规范，它同时支持两种事件流模式，不过是先发生捕获型事件流，再发生冒泡型事件流；
DOM事件流最独特的是，它支持文本节点也触发事件（IE中这不支持）；
在开发的实践过程中的运用，我们一般都采取冒泡型的事件流触发方式，这点我们的IE做的比较成功。至于原因，毕竟我们给元素触发事件，肯定是希望从我们最希望先触发（从最精确的）的那个开始;

--------------------------------------------------------------------------------
B、事件绑定
事件处理函数/监听函数
一. 在DOM元素中直接绑定
二. 在JavaScript代码中绑定
三. 绑定事件监听函数
具体实践：
attachEvent(”NAME_OF_EVENT_HANDLER”, fnHandler)给元素绑定事件;
而在支持DOM事件流的浏览器里，则使用addEventListener(”NAME_OF_EVENT_HANDLER”, fnHandler, isCapture),前面我控制FIREFOX中触发捕获事件流，就是通过设置isCapture（ture：捕获；false：冒泡）做到的。

// 跨浏览器添加事件
function addEvent(obj,type,handle){
  try{    // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
    obj.addEventListener(type,handle,false);
  }catch(e){   //兼容IE
    obj.attachEvent('on' + type,handle);
  }
}

// 跨浏览器移除事件
function removeEvent(obj,type,fn){
    try(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }catch(e){  //兼容IE
        obj.detachEvent('on'+type,fn);
    }
}
// 那些事件是支持冒泡，那些不支持？
基本上只有onload、unload、focus、blur、submit和change事件是不支持冒泡的，这也是我在前面说“一般使用冒泡事件流”。
keydown、keypress、keyup、click、dbclick、mousedown、mouseout、mouseover、mouseup、mousemove。就是“Mouse and Key Events”支持冒泡，而Interface Events（也就是《Javascript高级程序设计》里的HTML（HTML是来构建interface的）事件。）则只支持捕获。

--------------------------------------------------------------------------------
C、事件委托
// document.onclick，从这点就能看出，这个示例把事件委托放到了document上，即点击document就直接触发我们相应的事件。
document.onclick = function(event){
    //IE doesn't pass in the event object
    event = event || window.event;

    //IE uses srcElement as the target
    var target = event.target || event.srcElement;

    switch(target.id){
        case "help-btn":
                openHelp();
                break;
        case "save-btn":
                saveDocument();
                break;
        case "undo-btn":
                undoChanges();
                break;
        //如果有其元素需要处理点击事件，
        //只需要在这里添加不同的case分支就行。
    }
};

优点：
从“处理速度”、“新增元素事件处理”和“内存消耗”三方面比较了“事件委托”和“事件绑定”的对比，可以很容易看出，“事件委托”在“处理速度”和“内存消耗”上，有得天独厚的优势。所以，在Web编程的时候，尤其在构建大型系统的时候，应该尽量考虑使用“事件委托”。但是，“事件委托”并不是万能的；它也有一些弊端。下面我们在论述一下它的弊端。
缺点：
使用“事件委托”时，并不是说把事件委托给的元素越靠近顶层就越好。事件冒泡的过程也需要耗时，越靠近顶层，事件的”事件传播链”越长，也就越耗时。

--------------------------------------------------------------------------------
D、阻止事件冒泡和阻止事件默认行为
// 阻止事件冒泡
function stopBubble(e) {
   var e = e || window.event;
   //如果提供了事件对象，则这是一个非IE浏览器
   if ( e && e.stopPropagation ){
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    }else{
      //否则，我们需要使用IE的方式来取消事件冒泡
      e.cancelBubble = true;
    }
}

// 阻止浏览器的默认行为
// 当按键后,不希望按键继续传递给如HTML文本框对象时,可以取消返回值.即停止事件默认行为
function stopDefault( e ) {
  var e = e || window.event;
  //阻止默认浏览器动作(W3C)
  if ( e && e.preventDefault ){
    e.preventDefault();
  //IE中阻止函数器默认动作的方式
  }else{
    e.returnValue = false;//即return false;
  }
}
