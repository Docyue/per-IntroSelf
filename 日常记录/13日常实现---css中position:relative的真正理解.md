position属性是用四种定位:
默认的是static;

position:absolute（绝对定位） ——是脱离文档流，相对于父级元素（包含这个position:relative）定位，当然如果没有，那就是相对于body定位的。

position:relative（相对定位） ——单独使用，我不知道很多人是不是也跟我一样忽略过它，relative 也是不脱离文档流，“这个元素会偏移某个距离。但是该元素仍保持其未定位前的形状，它原本所占的空间仍保留。”，它是相对于自己来定位的，

例如：#main{position:relative;top:-50px;},这时#main会在相对于它原来的位置上移50px。


position:fixed（固定定位）  —— 跟绝对定位有点类似，只是它的父级元素永远都是视窗本身。
