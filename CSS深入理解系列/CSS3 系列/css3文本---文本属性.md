// 颜色透明
rgba 背景透明，文本不透明

// 文字阴影
text-shadow:x y shad color;

// 文字叠加阴影
text-shadow:x y shad color,x y shad color,...;

// 文字描边 -webkit-text-stroke
-webkit-text-stroke: 1px red;


// 文字排版（全兼容）
direction:rtl; 
unicode-bidi:dibi-override; 一定配合使用

// 文字省略显示（全兼容）
white-space:nowrap;
overflow:hidde;
text-overflow:ellipsis;

// 自定义字体
@font-face{
	font-family:'haha';
	src:url('../');
	font-weight:normal;
	font-style:normal;
}
配合transition:1s;