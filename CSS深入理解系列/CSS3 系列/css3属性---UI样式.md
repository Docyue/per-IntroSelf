// ------圆角
border-radius: 1px;
border-radius: 1px 2px 3px;
border-radius: 1px 2px 3px 4px;

// 边框图片
border-image

// 边框宽度
border-left-width
border-right-width

// 边框颜色 -moz
border-color


// ------线性渐变 （只能用在背景上）
background-image: -webkit-linear-gradient(left top, red,blue);

background-image: -webkit-linear-gradient(30deg, red,blue,...);

// 重绘线性渐变
background-image: -webkit-repeating-linear-gradient(30deg, red,blue,...);


// ------径向渐变 （只能用在背景上）
background-image: -webkit-radial-gradient([起点],[形状|大小]，点，点);

background-image: -webkit-radial-gradient(red,blue);

background-image: -webkit-radial-gradient(left top,red,blue);

background-image: -webkit-radial-gradient(left top,ellipse,red,blue);

background-image: -webkit-radial-gradient(left top,100px 20px,red,blue);




// ------多背景
backround:url('img1.png'),url('img2.png');

// 结合渐变
backround: -webkit-linear-gradient(30deg, red,blue,...), url('img2.png');

// 背景尺寸 放大/缩小
background-size:x y;

// 背景显示方向
background-origin: border-box/padding-box/content-box

// 背景裁剪方向
background-clip: border-box/padding-box/content-box/no-clip

