// ------变换 2d
结合 transition: 1s;
// 变换---旋转
transform: rotateX(30deg);
transform: rotateY(30deg);
transform: rotate(30deg);

// 变换---斜切
transform: skewX(35deg) 
transform: skewY(45deg)
transform: skew(45deg,15deg)

// 变换---缩放
transform: scaleX(0.5);
transform: scaleY(0.5);
transform: scale(0.5);

// 变换---位移 默认左往右，上往下
transform: translateX(100px)
transform: translateY(100px)
transform: translate(100px,200px)

// ------变换基点
transform-origin: 
left/center/right/top |
left/center/right/top |
100px 200px;

// 变换---矩阵 （解决ie兼容问）
transform: matrix(a,b,c,d,e,f)
IE:
filter: "progid:DXImageTransform.Microsoft.Matrix(M11= a, M12= d, M21= b,M22= c, SizingMethod= 'auto expand')"

位移（ie只能使用其他方式实现）：
x: e+disX
y: f+dixY
缩放:
x: a=x*a c=x*c e=x*e
y: b=y*b d=x*d f=x*f
斜切:
x: c=Math.tan(Xdeg/180*Math.PI)
y: d=Math.tan(Ydeg/180*Math.PI)
旋转:(ie基点不是中心点==让它等于父元素中心点)
a=Math.cos(deg/180*Math.PI)
b=Math.sin(deg/180*Math.PI)
c= -Math.sin(deg/180*Math.PI)
d=Math.cos(deg/180*Math.PI)




