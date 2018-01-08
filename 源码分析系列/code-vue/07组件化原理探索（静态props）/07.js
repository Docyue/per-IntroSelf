<div id="app">
    <my-component message="hello liangshaofeng!"></my-component>
    <my-component message="hello Vue!"></my-component>
</div>
import Bue from 'Bue';

var MyComponent = Bue.extend({
    template: '<p>{{message}}</p>'
});

Bue.component('my-component', MyComponent);

const app = new Bue({
    el: '#app'
});

/*
 * 组件构造器
 * 返回组件构造函数
 * @param extendOptions {Object} 组件参数
 * @returns {BueComponent}
 */
Bue.extend = function (extendOptions) {
    let Super = this;
    extendOptions = extendOptions || {};
    let Sub = createClass();
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    // 此处的mergeOptions就是简单的Object.assign
    Sub.options = _.mergeOptions(Super.options, extendOptions);
    return Sub;
};

/**
 * 构造组件构造函数本身
 * @returns {Function}
 */
function createClass() {
    return new Function('return function BueComponent(options){ this._init(options)}')(); 
}


var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
// 你看，React不需要将HellMessage注册成<hello-message>
ReactDOM.render(<HelloMessage name="John" />, mountNode);



/**
 * 注册组件
 * vue的组件使用方式与React不同。React构建出来的组件名可以直接在jsx中使用
 * 但是vue不是。vue的组件在构建之后还需要注册与之相对应的DOM标签
 * @param id {String}, 比如 'my-component'
 * @param definition {BueComponent} 比如 MyComponent
 * @returns {*}
 */
Bue.component = function (id, definition) {
    this.options.components[id] = definition;
    return definition;
};


/**
 * 渲染节点
 * @param node {Element}
 * @private
 */
exports._compileElement = function (node) {
    // 判断节点是否是组件
    // 这个函数具体做什么，下面会讲到
    if (this._checkComponentDirs(node)) {
        return;
    }
    // ....
};


/**
 * 判断节点是否是组件指令,如 <my-component></my-component>
 * 如果是,则构建组件指令
 * @param node {Element}
 * @returns {boolean}
 * @private
 */
exports._checkComponentDirs = function (node) {
    let tagName = node.tagName.toLowerCase();
    if (this.$options.components[tagName]) {
        let dirs = this._directives;
        dirs.push(
            new Directive('component', node, this, {
                expression: tagName
            })
        );
        return true;
    }
};
/**
 * 将template模板转化成DOM结构,
 * 举例: '<p>{{user.name}}</p>'  -> 对应的DOM结构
 * @param el {Element} 原有的DOM结构
 * @param options {Object}
 * @returns {DOM}
 */
module.exports = function (el, options) {
    let tpl = options.template;
    if (tpl) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(tpl, 'text/html');
        // 此处生成的doc是一个包含html和body标签的HTMLDocument
        // 想要的DOM结构被包在body标签里面
        // 所以需要进去body标签找出来
        return doc.querySelector('body').firstChild;
    } else {
        return el;
    }
};

/**
 * 初始化组件的props,将props解析并且填充到$data中去
 * @private
 */
exports._initProps = function () {
    let isComponent = this.$options.isComponent;
    if (!isComponent) return;
    let el = this.$options.el;
    let attrs = Array.from(el.attributes);
    attrs.forEach((attr) => {
        let attrName = attr.name;
        let attrValue = attr.value;
        this.$data[attrName] = attrValue;
    });
};

// component.js
module.exports = {
    bind: function () {
        // 判断该组件是否已经被挂载
        if (!this.el.__vue__) {
            // 这里的anchor作为锚点，是之前常用的方法了
            this.anchor = document.createComment(`${config.prefix}component`);
            _.replace(this.el, this.anchor);
            this.setComponent(this.expression);
        }
    },

    update: function () {
        // update方法暂时不做任何事情
    },

    /**
     * @param value {String} 组件标签名, 如 "my-component"
     */
    setComponent: function (value) {
        if (value) {
            // 这里的Component就是那个带有options自定义属性的BueComponent构造函数啊！
            this.Component = this.vm.$options.components[value];
            this.ComponentName = value;
            this.mountComponent();
        }
    },

    /**
     * 构建、挂载组件实例
     */
    mountComponent: function () {
        let newComponent = this.build();
        // 就是在这里将组件生成的DOM结构插入到真实DOM中
        newComponent.$before(this.anchor);
    },

    /**
     * 构建组件实例
     * @returns {BueComponent}
     */
    build: function () {
        if (this.Component) {
            let options = {
                name: this.ComponentName,   // "my-component"
                el: this.el.cloneNode(), 
                parent: this.vm,
                isComponent: true
            };
            // 实例化组件
            let child = new this.Component(options);
            return child;
        }
    }
};


