// ------响应式布局
media 加载不同的样式表
<link rel="stylesheet" href="style1.css" media='screen and (min-width:800px)'>

// 横竖屏切换
// 竖屏
<link 
rel="stylesheet" 
type="text/css" 
media="all and (orientation:portrait)" 
href="orient.css">

// 横屏
<link 
rel="stylesheet" 
type="text/css" 
media="all and (orientation:landscape)" 
href="orient.css">

// style 内部处理
// 大于400
@media screen and (min-width:400px){
    ....
}

// 400-800之间
@import url('.../a.css') screen and (min-width:400px) and (max-width:800px)

// 小于800
@media screen and (max-width:800px){
    ....
}



