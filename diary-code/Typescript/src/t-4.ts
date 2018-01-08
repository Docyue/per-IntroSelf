for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}
//  如果 SquareConfig带有上面定义的类型的color和width属性，并且还会带有任意数量的其它属性
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}



// 函数类型------------
interface SearchFunc {
  (source: string, subString: string): boolean;
}














