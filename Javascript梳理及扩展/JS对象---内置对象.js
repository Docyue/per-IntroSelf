JavaScript---内置对象
{
  Array---数组
  String---字符串
  Number 和 Math ---数字，数学对象
  Date---日期时间
  RegExp---正则
  null 和 undefined ---空
}
================================================================================
Array---数组
--------------------------------------------------------------------------------
1、基本方法：
Push ,unshift, pop, shift, for ,forin,toString()
Jion,reverse,sort,concat,slice,splice
forEach,map,filter,every,some,reduce,reduceRight,indexof

2、判断是否数组：
Array.isArray([]);
X instenceof Array
({}).tostring.apply([]) === ‘[object Array]’
[].constructor === Array

3、基本数组，二维数组，稀疏数组

4、实例
A、js循环遍历数组
<script>
       //循环遍历数组
       var animals = ["cat",'dog','human','whale','seal'];
       var animalString = "";
       for(var i = 0;i<animals.length;i++){
           animalString += animals[i] + " ";
       }
       alert(animalString);  //输出数组里的每个项
</script>

B、遍历二维数组
<script>
  var arr=[[0,0,0,0,0,0],[0,0,1,0,0,0],[0,2,0,3,0,0],[0,0,0,0,0,0]];
  for(var i=0;i<arr.length;i++){
    //遍历每一个具体的值
    for(var j=0;j<arr[i].length;j++){
      document.writeln(arr[i][j]+" ");
    }
    document.writeln("<br/>");
  }
</script>

C、创建多维数组
<script type="text/javascript">
    var arrayLength = 3;//设置数组长度

    //创建数组
    var multiArray = new Array(arrayLength);
    for(var i =0;i<multiArray.length;i++){
        multiArray[i] = new Array(arrayLength);
    }

    //给第一个数组索引添加项
    multiArray[0][0] = 'phone';
    multiArray[0][1] = 'book';
    multiArray[0][2] = 'TV';

    //第二个
    multiArray[1][0] = 2;
    multiArray[1][1] = 1;
    multiArray[1][2] = 98;

    //第三个
    multiArray[2][0] = ['java','python'];
    multiArray[2][1] = ['js','C++'];
    multiArray[2][2] = ['Haskell','php'];
</script>

D、排序数组
<script type="text/javascript">
    {/* a.字母排序 */}
    var fruits = ['banana','apple','orange','strawberry'];
    console.log(fruits.sort());//Array [ "apple", "banana", "orange", "strawberry" ]

    {/* b.数字排序 */}
    function compare(a,b){
      return a-b;
    }
    var num = [32,43,2,5,-23,0,4];
    console.log(num.sort(compare));//Array [ -23, 0, 2, 4, 5, 32, 43 ]
</script>

String---字符串
--------------------------------------------------------------------------------
1、基本方法：
charCodeAt, charCodeAt, charAt, slice, substring, substr, indexOf, lastIndexOf, search,
concat, split, toLowerCase, toUpperCase,localeCompare, match, replace, trim

2、实例
A、js判断字符串出现最多的字符，并统计次数
<script type="text/javascript">
  {/* js实现一个函数，来判断一个字符串出现次数最多的字符，并统计这个次数 */}
  function countStr(str){
    var obj = {};
    for(var i = 0, l = str.length,k; i < l ;i++){
      k = str.charAt(i);
      if(obj[k]){
        obj[k]++;
      }else{
        obj[k] = 1;
      }
    }
    var m = 0,i=null;
    for(var k in obj){
      if(obj[k] > m){
        m = obj[k];
        i = k;
      }
    }
    return i + ':' + m;
  }
</script>

B、字符串中查找子字符串
<script type="text/javascript">
    var test = 'Welcome to my blog!';
    var value = 'blog';
    var subValue = test.indexOf(value);
    console.log(subValue);//14,子字符串的索引
</script>

Number 和 Math ---数字，数学对象
--------------------------------------------------------------------------------
数字可以是一个直接量，也可以是一个对象，但是Math对象不同，他没有构造函数，并且其所有的属性和方法都是直接通过这个对象来访问的
1、把十进制转化为一个十六进制值
<script type="text/javascript">
  var num = 255;
  console.log(num.toString(16));//ff
</script>
2、随机产生颜色
<script type="text/javascript">
    function randomVal(val){
        return Math.floor(Math.random()*(val + 1));
    }

    function randomColor(){
        return 'rgb(' + randomVal(255) + ',' + randomVal(255) + ',' + randomVal(255) + ')';
    }
</script>
目前，所有浏览器都支持RGB表示法和十六进制表示法，除了IE7，它只支持十六进制表示法

3、在角度和弧度之间转换
<script type="text/javascript">
  var rad = degrees*(Math.PI/180);
  var degrees = rad*(180/Math.PI);
</script>

4、js判断传入参数是否为质数
<script type="text/javascript">
  function fn(input) {
    input = parseInt(input,10);
    return isPrime(input) ? 'is prime' : 'not prime';
  }
  function isPrime(input) {
    if (input < 2) {
      return false;
    } else {
      for (var i = 2; i <= Math.sqrt(input); i++) {
        if (input % i == 0) {
          return false;
        }
      }
    }
    return true;
  }
</script>


Date---日期时间
--------------------------------------------------------------------------------
1、js计算时间差
<script type="text/javascript">
  var date1=new Date();  //开始时间，当前时间
  var date2=new Date(); //结束时间，需传入时间参数
  var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
</script>
2、计算出相差天数
<script type="text/javascript">
  var days=Math.floor(date3/(24*3600*1000));
</script>

3、计算出小时数
<script type="text/javascript">
  var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
  var hours=Math.floor(leave1/(3600*1000));
</script>

4、计算相差分钟数
<script type="text/javascript">
  var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
  var minutes=Math.floor(leave2/(60*1000));
</script>

5、计算相差秒数
<script type="text/javascript">
  var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
  var seconds=Math.round(leave3/1000);
  console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");
</script>

RegExp---正则
--------------------------------------------------------------------------------
1、js实现千分位分隔
<script type="text/javascript">
    function cc(s){
        if(/[^0-9\.]/.test(s)) return "invalid value";
        s=s.replace(/^(\d*)$/,"$1.");
        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
        s=s.replace(".",",");
        var re=/(\d)(\d{3},)/;
        while(re.test(s)){
          s=s.replace(re,"$1,$2");
        }
        s=s.replace(/,(\d\d)$/,".$1");
        return "￥" + s.replace(/^\./,"0.")
    }
</script>
<input onchange="this.value=cc(this.value)" />

null 和 undefined ---空
--------------------------------------------------------------------------------
null 是一个字面量（而不是全局对象的一个属性，undefined 是）;
null 常被放在期望一个对象，但是不引用任何对象的参数位置。当检测 null 或 undefined 时，注意相等（==）与全等（===）两个操作符的区别 （前者会执行类型转换）;
