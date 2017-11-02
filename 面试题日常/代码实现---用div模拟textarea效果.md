#### 用div模拟textarea效果
================================================================================

    HTML代码：
    <div class="test_box" contenteditable="true"><br /></div>

    CSS代码：
    .test_box {
       width: 400px;
       min-height: 120px;
       max-height: 300px;
       _height: 120px;
       margin-left: auto;
       margin-right: auto;
       padding: 3px;
       outline: 0;
       border: 1px solid #a0b3d6;
       font-size: 12px;
       word-wrap: break-word;
       overflow-x: hidden;
       overflow-y: auto;
       _overflow-y: visible;
    }

三、一些注意与说明  

    1、 现代浏览器如Firefox在可编辑模式下的div获取焦点的时候会有虚框，而实际上textarea是没有虚框显示的，此迹象会暴露出div是个冒牌货，所以，需要添加下面的样式：outline:0;

    2、 Firefox浏览器下可编辑模式的div如果内部元素是空空的，那么其在获取焦点是时候，光标不可见或是与外部div齐高，这也是会暴露出自己是textarea冒牌货的，所以，默认情况下，我们可以在此div中增加一个孤单的<br />换行标签。但是，IE8下，如果有个默认的br标签，光标位置可能会在第二行闪来闪去，所以，IE8下可编辑div里面默认是不能有br标签的，这个嘛，您自己想办法清掉吧。

    3、 IE浏览器下（IE6~8），输入文字回车的时候，div内部是会自动产生p标签包含每行元素的，而其他浏览器貌似是产生br标签（这里尚未全部测试，如有不准，欢迎指正）。由于默认的p标签是有1em大小的上下margin值的，为了效果统一，我们可以设置诸如下面的样式清除p标签的margin值：.test_box p{ margin: 0; }

    4、可编辑模式的div输入的内容都会是很正宗的HTML代码，如果作为内容提交的话需要进行HTML字符过滤。还有，如果您是从其他页面上拷贝一段内容过来，然后粘贴到可编辑模式下的div中，会连HTML也完整的复制过来的（不同于textarea），所以，这里也有必要进行HTML字符过滤（例如web QQ）。

    5、 IE6浏览器不支持max-height属性，所以，只用CSS是无法实现超过一定高度出现滚动条的效果，需要js配合实现。

    6、 可编辑模式的div标签与textarea一样，是支持focus, blur事件的。自然也支持focus伪类，demo页面中Firefox等现代浏览器获取焦点时的外发光就是使用的:focus。
