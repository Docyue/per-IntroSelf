一般会用 JS 更改相应样式，接着浏览器就会经历 JS 运行、样式计算、布局、绘制、合成等多个重要步骤（后面还会讲到这个步骤实际过程中可以更长或者更短），那么要做的优化就是在这几个步骤中进行优化并且尽量去掉中间的耗时步骤

================================================================================

#### 优化---JS 运行
函数的输入事件处理、不合时机的 JS 、长时间的 JS 运行以及垃圾回收。

当处理用户事件时，我们应该做到：

    1、避免长时间的 JS 执行；
    2、避免在处理中改变样式。因为样式改变会引起后面布局、绘制、合成等操作；
    3、对用户输入进行消抖

优化处理：

    1、使用 requestAnimationFrame：将 setTimeout 换成 requestAnimationFrame，因为 setTimeout 时间控制可能造成在一帧的中间，目前各浏览器对 requestAnimationFrame 的支持已经比较好了；
    2、使用 Web Workers：将复杂计算的 JS 采用 Web Workers 进行处理。
    3、减少垃圾回收：垃圾回收是一个容易被忽略的问题，因为垃圾回收的时间是不受控制的，它可能在一个动画的中途，阻塞动画的执行，更理想的情况是在循环中复用对象。


#### 优化---样式计算
样式的优化也是这两步：

    1、减小选择器的复杂性
      .box:nth-last-child(-n+1) .title {
      /* 复杂 */
      }
      .final-box-title {
      /* 更优 */
      }
    2、减少样式的计算量，减少无效元素
      <div>
        <div>
          <p>多层无意义的标签</p>
        </div>
      </div>

#### 优化---布局
    1、避免触发布局：
      目前，transform 和 opacity 只会引起合成，不会引起布局和重新绘制。整个流程中比较耗费性能的布局和绘制流程将直接跳过，性能显然是很好的；
    2、使用Flexbox布局：
      Flexbox 布局方案性能会优于以前的布局方案，而且目前浏览器对 Flexbox 支持度相当高了
    3、避免强制同步布局事件：
      为了给你返回 box 的 height 属性值，浏览器必须首先应用 box 的属性修改（因为对其添加了 super-big 样式），接着执行布局过程。在这之后，浏览器才能返回正确的 height 属性值。

      function logBoxHeight() {

        box.classList.add('super-big');
        // 不优秀方案
        // Gets the height of the box in pixels
        // and logs it out.
        console.log(box.offsetHeight);
      }
      function logBoxHeight() {
        // Gets the height of the box in pixels
        // and logs it out.
        // 优秀方案
        console.log(box.offsetHeight);

        box.classList.add('super-big');
      }
    4、避免快速连续的布局：连续快速的多次执行它
      function resizeAllParagraphsToMatchBlockWidth() {
        // Puts the browser into a read-write-read-write cycle.
        for (var i = 0; i < paragraphs.length; i++) {
          paragraphs[i].style.width = box.offsetWidth + 'px';
        }
      }

#### 优化---绘制

    1、提升移动或渐变元素的绘制层：
      在页面中新建一个渲染层最好的方式就是使用 will-change 属性，同时再与 transform 属性一起使用，就会创建一个新的组合层：
      .element {
        will-change: transform;
      }
      对于那些目前还不支持 will-change 属性、但支持创建渲染层的浏览器，可以使用一个 3D transform 属性来强制浏览器创建一个新的渲染层：
      .element {
        transform: translateZ(0);
      }
    2、仔细规划动画和简化绘制的复杂度：
      有时候，尽管把元素提升到了一个单独的渲染层，浏览器会把两个相邻区域的渲染任务合并在一起进行，这将导致整个屏幕区域都会被绘制。所以可以使用调试工具查看，仔细规划动画。
      不同的 CSS 属性绘制的成本是不一样的，绘制一个阴影就比绘制边框更费时。当然，这个浏览器也在不停优化中，现在的耗时渲染属性随时都可能被改变，所以需要多关注一下。


#### 优化---合成

    1、使用transform/opacity实现动画效果
      前面已经提到过 transform/opacity 的优势,应用了 transforms/opacity 属性的元素必须独占一个渲染层。为了对这个元素创建一个自有的渲染层，你必须提升该元素
    2、管理渲染层、避免过多数量的层：
      创建一个新的渲染层需要消耗额外的内存和管理资源。而在内存资源有限的设备上，由于过多的渲染层来带的开销而对页面渲染性能产生的影响，甚至远远超过了它在性能改善上带来的好处。由于每个渲染层的纹理都需要上传到 GPU 处理，因此我们还需要考虑 CPU 和 GPU 之间的带宽问题、以及有多大内存供 GPU 处理这些纹理的问题。
