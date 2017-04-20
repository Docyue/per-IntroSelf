<div id="app">
    <my-component :name="user.name1" message="近况如何?"></my-component>
    <my-component :name="user.name2" message="How are you?"></my-component>
</div>
import Bue from 'Bue'
var MyComponent = Bue.extend({
    template: '<div>' +
                '<p>Hello,{{name}}</p>' +
                '<p>{{message}}</p>' +
              '</div>',
    props: {
       // 对props的声明，本来应该写一些prop验证之类的，不过尚未实现这个功能
        name: {},
        message: {}
    }
});

Bue.component('my-component', MyComponent);

const app = new Bue({
    el: '#app',
    data: {
        user: {
            name1: '梁少峰',
            name2: 'youngwind'
        }
    }
});


/**
 * 初始化组件的props,将props解析并且填充到$data中去
 * 在这个过程中,如果是动态属性, 那么会在父实例生成对应的directive和watcher，用于prop的动态更新
 * @private
 */
exports._initProps = function () {
    let {el, props, isComponent} = this.$options;
    if (!isComponent || !props) return;
    let compiledProps = this.compileProps(el, props);  // 解析props
    this.applyProps(compiledProps);                              // 应用props
};
/**
 * 解析props参数, 包括动态属性和静态属性
 * @param el {Element} 组件节点,比如: <my-component b-bind:name="user.name" message="hello"></my-component>
 * @param propOptions {Object} Vue.extend的时候传进来的prop对象参数, 形如 {name:{}, message:{}}
 * @returns {Array} 解析之后的props数组,
 * 形如: [
 *          {
 *              "name":"name",     // 动态prop
 *              "options":{},      // 原先Vue.extend传过来的属性对应的参数, 暂时未空, 之后会放一些参数校验之类的
 *              "raw":"user.name", // 属性对应的值
 *              "dynamic":true,    // true代表是动态属性,也就是从父实例/组件那里获取值
 *              "parentPath":"user.name"   // 属性值在父实例/组件中的路径
 *          },
 *          {
 *              "name":"message",   // 静态prop
 *              "options":{},
 *              "raw":"hello"
 *          }
 *     ]
 */
exports.compileProps = function (el, propOptions) {
    let names = Object.keys(propOptions);
    let props = [];
    names.forEach((name) => {
        let options = propOptions[name] || {};
        let prop = {
            name,
            options,
            raw: null
        };

        let value;

        if ((value = _.getBindAttr(el, name))) {
            // 动态props
            prop.raw = value;
            prop.dynamic = true;
            prop.parentPath = value;
        } else if ((value = _.getAttr(el, name))) {
            // 静态props
            prop.raw = value;
        }
        props.push(prop);
    });
    return props;
};

/**
 * 获取动态数据绑定属性值,
 * 比如 b-bind:name="user.name" 和 :name="user.name"
 * @param node {Element}
 * @param name {String} 属性名称 比如"name"
 * @returns {string} 属性值
 */
exports.getBindAttr = function (node, name) {
    return exports.getAttr(node, `:${name}`) || exports.getAttr(node, `${config.prefix}bind:${name}`);
};

/**
 * 获取节点属性值,并且移除该属性
 * @param node {Element}
 * @param attr {String}
 * @returns {string}
 */
exports.getAttr = function (node, attr) {
    let val = node.getAttribute(attr);
    if (val) {
        node.removeAttribute(attr);
    }
    return val;
};



/**
 * 应用props
 * 如果是动态属性, 需要额外走Directive、Watcher那一套流程
 * 因为只有这样,当父实例/组件的属性发生变化时,才能将变化传导到子组件
 * @param props {Array} 解析之后的props数组
 */
exports.applyProps = function (props) {
    props.forEach((prop) => {
        if (prop.dynamic) {
            // 动态prop
            let dirs = this.$parent._directives;
            dirs.push(
                new Directive('prop', null, this, {
                    expression: prop.raw,  // prop对应的父实例/组件的哪个数据, 如:user.name
                    arg: prop.name          // prop在当前组件中的属性键值, 如:name
                })
            );
        } else {
            // 静态prop
            this.initProp(prop.name, prop.raw, prop.dynamic);
        }
    });
};
/**
 * 将prop设置到当前组件实例的$data中去, 这样一会儿initData的时候才能监听到这些数据
 * 如果是动态属性, 还需要跑到父实例/组件那里去取值
 * @param path {String} 组件prop键值，如"name"
 * @param val {String} 组件prop值，如果是静态prop，那么直接是"How are you"这种。
                 如果是动态prop，那么是"user.name"这种，需要从父实例那里去获取实际值
 * @param dynamic {Boolean} true代表是动态prop， false代表是静态prop
 */
exports.initProp = function (path, val, dynamic) {
    if (!dynamic) {
        // 静态prop
        this.$data[path] = val;
    } else {
        // 动态prop
        this.$data[path] = compileGetter(val)(this.$parent.$data);
    }
};

// directives/prop.js
module.exports = {
    bind: function () {
        // this.arg == "name"; this.expression == "user.name", true代表是动态prop
        // 对于动态prop，在bind方法中完成**把prop塞到$data中的任务**
        this.vm.initProp(this.arg, this.expression, true);
    },

    update: function (value) {
        // 当父实例对应的数据放生改变时，就会执行这里的方法
        // 将新的数据设置到组件的$data中, 从而会引发组件数据的更新
        this.vm.$set(this.arg, value);
    }
};

