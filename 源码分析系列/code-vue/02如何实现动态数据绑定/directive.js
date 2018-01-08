// https://github.com/youngwind/blog/issues/87
/**
 * 指令构造函数
 * @param name {string} 值为"text", 代表是文本节点
 * @param el {Element} 对应的DOM元素
 * @param vm {Bue} bue实例
 * @param expression {String} 指令表达式，例如 "name"
*  @param attr {String} 值为'nodeValue', 代表数据值对应的书节点的值
 * @constructor
 */

 function Directive(name, el, vm, expression){
 	this.name = name;
 	this.el = el;
 	this.vm= vm;
 	this.expression = expression;
 	this.attr = 'nodeValue';
 	this.update();
 }
// 这是指令的更新方法。当对应的数据发生改变了，就会执行这个方法
// 可以看出来，这个方法就是用来更新nodeValue的

Directive.prototype.update = function(){
	this.el[this.attr = this.vm.$data[this.expression];
	console.log(`更新了Dom-${this.expression}`);
}
