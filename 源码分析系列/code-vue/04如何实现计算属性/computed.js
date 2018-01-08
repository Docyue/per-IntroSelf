<div id="app">
	<p>姓名:{{user.name}}</p>
	<p>年龄:{{user.age}}</p>
	<p>{{info}}</p>
</div>

const app = new Bue({
	el: '#app',
	data:{
		user:{
			name:'fengquan',
			age:23
		}
	},
	computed:{
		info:function(){
			return `计算出来的属性-> 姓名：${this.user.name},年龄: ${this.user.age}`
		}
	}
})

/**
 * 初始化所有计算属性
 * 主要完成一个功能:将计算属性定义的function当成是该属性的getter函数
 * @private
 */
export._initComputed = function(){
	// 注意，这里的this指的是bue实例
    let computed = this.$options.computed;
    if (!computed) return;
    for (let key in computed) {
        let def = computed[key];
        if (typeof def === 'function') {
            def = {
                get: def
            };
            def.enumerable = true;
            def.configurable = true;
            Object.defineProperty(this.$data, key, def);
        }
    }
}

function Watcher(vm,, expression, cb ,ctx){
	this.id = ++uid;
	this.vm = vm;
	this.expression = expression;
	this.cb = cb;
	this.ctx = ctx || vm;
	this.deps= Object.create(null);
	// 这里的getter可以不去细究，其实就是根据expression（比如user.name)
    // 拼接出它对应的函数，当成getter
    // 你完全可以理解为调用this.getter()方法其实就是为了得到user.name的值
    this.getter = expPareser.compileGetter(expression);
    this.initDeps(expression);
}


/**
 * 要注意,这里的getter.call是完成计算属性的核心,
 * 因为正是这里的getter.call, 执行了该计算属性的getter方法,
 * 从而执行该计算属性所依赖的其他属性的get方法
 * 从而发出get事件,冒泡到底层, 触发collectDep事件
 * @param path {String} 指令表达式对应的路径, 例如: "user.name"
 */
Watcher.prototype.initDeps = function(path){
	this.addDep(path);
	Observer.emitGet = true;
	this.vm._activeWatcher = this;

	// 就是在这儿调用info的getter，进而调用name和age的getter
    // 进入触发和传播get事件
    this.value = this.getter.call(this.vm, this.vm.$data);
    Observer.emitGet = false;
    this.vm._activeWatcher = null;
}


/**
 * 收集依赖。
 * 为什么需要这个东西呢?
 * 因为在实现computed计算属性功能的过程中,
 * 发现程序需要知晓计算出来的属性到底依赖于哪些原先就有的属性
 * 这样才能做到在对应原有的属性的_subs数组中添加新属性指令的watcher事件
 * @param path {String} get事件传播到顶层时的路径,比如"user.name"
 * @private
 */

export._collectDep = function(event, path){
	let watcher = this._activeWatcher;
	if(watcher){
		watcher.addDep(path);
	}
}

// 看，就是在这儿给$data顶层注册收集依赖的事件的
this.observer.on('set', this._updateBindingAt.bind(this))
			.on('get', this._collectDep.bind(this));





