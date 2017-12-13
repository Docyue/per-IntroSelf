// ------变换
结合 transition: 1s;
// 变换---旋转
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


