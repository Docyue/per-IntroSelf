if (this.$parent) {
        this.$data = options.parent.$data;
} else {
        this.$data = options.data || {};
}

if (this.$parent) {
        this.observer = this.$parent.observer;
    } else {
        this.observer = Observer.create(data);
    }