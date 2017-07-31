// 某些模块可能不导出任何内容，而只能对全局范围中的对象进行修改。
// 尽管模块中的顶层变量，函数和类不会自动结束在全局范围内，但这并不意味着模块无法访问全局作用域。
// 内置对象如所述的共享的定义Array和Object是一个模块内部接近，并把这些对象中的变化将在其他模块中反映出来。
// -----如果要将pushAll()方法添加到所有数组
// module code without exports or imports
Array.prototype.pushAll = function(items) {

    // items must be an array
    if (!Array.isArray(items)) {
        throw new TypeError("Argument must be an array.");
    }

    // use built-in push() and spread operator
    return this.push(...items);
};

//  引用
import "./example.js";
let colors = ["red", "green", "blue"];
let items = [];
items.pushAll(colors);

// ----------Web浏览器中的模块加载顺序
<!-- this will execute first -->
<script type="module" src="module1.js"></script>
<!-- this will execute second -->
<script type="module">
import { sum } from "./example.js";

let result = sum(1, 2);
</script>

<!-- this will execute third -->
<script type="module" src="module2.js"></script>

// 所有使用明确包含的模块<script type="module">和隐含使用的模块都import按顺序加载和执行。在上述示例中，完整加载顺序为：

// 下载并解析module1.js。
// 递归下载和解析import资源module1.js。
// 解析内联模块。
// 在内import联模块中递归下载并解析资源。
// 下载并解析module2.js。
// 递归下载和解析import资源module2.js

// 一旦加载完成，在文件完全解析之后才执行任何操作。完成文档解析后，会发生以下操作：
// 递归执行import资源module1.js。
// 执行module1.js。
// 递归地执行import内联模块的资源。
// 执行内联模块。
// 递归执行import资源module2.js。
// 执行module2.js。
// 请注意，内联模块的作用与其他两个模块不同，代码不必首先下载。否则，加载import资源和执行模块的顺序是完全相同的。






// -----------Web浏览器中异步模块加载
// 您可能已经熟悉async了<script>元素上的属性。当与脚本一起使用时，async一旦文件完全下载并解析，就会执行脚本文件。
// 顺序async的脚本文件中不会影响这些脚本的执行顺序，但脚本在下载完成后立即执行，而无需等待包含文档完成解析。
<!-- no guarantee which one of these will execute first -->
<script type="module" async src="module1.js"></script>
<script type="module" async src="module2.js"></script>


// 概要
// ECMAScript 6将模块添加到语言中，作为打包和封装功能的一种方式。模块的行为不同的脚本，因为他们没有修改他们的顶级变量，函数和类全球范围内，并且this是undefined。为了达到这个目的，模块使用不同的模式进行加载。

// 您必须导出任何您想向模块的消费者提供的功能。变量，函数和类都可以导出，每个模块还允许一个默认的导出。导出后，另一个模块可以导入所有或部分导出的名称。这些名称就像let在同一个模块中无法重新声明的块绑定一样定义和操作。

// 如果在全局范围内操作某些东西，模块不需要导出任何东西。实际上，您可以从模块导入任何绑定到模块范围。

// 因为模块必须以不同的模式运行，所以引入的浏览器将<script type="module">信号源文件或内联代码作为模块执行。加载的模块文件<script type="module">被加载，就像将defer属性应用于它们一样。一旦文档完全解析，模块也按照它们在包含文档中出现的顺序执行。



























