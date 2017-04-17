<div id="app">
    <ul>
        <li b-repeat="item:items">
             {{item.title}}
             {{user.name}}
        </li>
    </ul>
</div>


const app = new Bue({
    el: '#app',
    data: {
        user: {
            name: 'youngwind',
            age: 24
        },
        items: [
            {
                title: 'aaa'
            },
            {
                title: 'bbb'
            },
            {
                title: 'ccc'
            }
        ]
    },
    methods: {
        test: function () {
            //  [a, b, c]  => [b, c, e, f]
            this.items.shift();
            this.items.push({
                title: 'eee'
            });
            this.items.push({
                title: 'fff'
            });
        }
    }
});

exports._init = function (options) {
    // ....
    this.__proto__ = this.$parent;    // this.$parent就是当前实例的父实例
    //....
};








exports._updateBindingAt = function () {
    this._updateSelfBindingAt(...arguments); // 这个函数就是原来的_updateBindingAt
    this._updateChildrenBindingAt(...arguments);
};

/**
 * 触发本实例所有子实例的updateBindingAt
 */
exports._updateChildrenBindingAt = function () {
    if (!this.$children.length) return;
    this.$children.forEach((child) => {
        child._updateBindingAt(...arguments);
    });
};


