// html
<div id="app">
    <p>姓名:{{user.name}}</p>
    <p>年龄:{{user.age}}</p>
    <div b-if="show" id="#sub_app">
        <h1>如果show为真,我们就显示</h1>
        <h1>如果show为假,我们就不显示</h1>
    </div>
</div>
const app = new Bue({
    el: '#app',
    data: {
        show: true,
        user: {
            name: 'youngwind',
            age: 24
        }
    }
});

/**
 * 渲染节点
 * @param node {Element}
 * @private
 */
exports._compileElement = function (node) {
    let hasAttributes = node.hasAttributes();

   // 添加了这个判断，如果包含b-if指令，那么就做特殊处理，不走原先的DOM遍历了
    if (hasAttributes && this._checkPriorityDirs(node)) {
        return;
    }

    if (node.hasChildNodes()) {
        Array.from(node.childNodes).forEach(this._compileNode, this);
    }
};

// 这里定义了一些特殊的指令，如v-if，碰到他们就做特殊处理
const priorityDirs = [
    'if'
];

/**
 * 检查node节点是否包含某些如 "v-if" 这样的高优先级指令
 * 如果包含,那么就不用走原先的DOM遍历了, 直接走指令绑定
 * @param node {Element}
 * @private
 */
exports._checkPriorityDirs = function (node) {
    priorityDirs.forEach((dir) => {
        let value = _.attr(node, dir);  // 获取b-if指令的值，此为"show"
        if (value) {
           // _bindDirective是我们在动态绑定的时候就做好的， 如果不明白这一块，请往前面的文章翻
            this._bindDirective(dir, value, node);  
            return true;
        }
    });
};

Directive.prototype._bind = function () {
    if (!this.expression) return;

   // 这里执行初始化
    this.bind && this.bind();

    this._watcher = new Watcher(
        this.vm,
        this.expression,
        this._update,  // 回调函数,目前是唯一的,就是更新DOM
        this           // 上下文
    );

    // 这里执行更新
    this.update(this._watcher.value);
};








