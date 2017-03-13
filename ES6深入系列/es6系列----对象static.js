class A {
    static fn() {
        console.log('sss');
    }
    fn2() {
        console.log('www');
    }
}

let a = new A();

a.fn(); // 报错
A.fn();
a.fn2();
A.fn2(); // 报错