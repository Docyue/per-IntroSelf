// ------过渡

    // 过渡基本属性
    transition: 1s/100ms;

    // 样式需要过渡 width/backgroud/../all
    transition: 1s/100ms width/backgroud/../all;

    // 过渡形式 ease/ease-in/ease-out/ease-in-out/贝塞尔曲线
    transition: 1s/100ms width/backgroud/../all ease/ease-in/ease-out/ease-in-out/贝塞尔曲线（cubic-bezier(0.9,0.4,0.0,1.6)）;

    // 多属性过渡 时间，形式不一样
    transition: 1s/100ms width, 200ms backgroud;

    // 多属性过渡 延迟时间 3s
    transition: 1s/100ms width, 200ms 3s backgroud;
