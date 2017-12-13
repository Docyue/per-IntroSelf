// ------动画
animation: 2s  动画名称 ;


// 动画---关键帧
@keyframes 动画名称{
	0%{
		width: 100px;
	}
	100%{
		width: 500px;
	}
}

// 动画---动画形式
animation: 2s 动画名称 动画形式;
动画形式：linear/ease/ease-in/ease-out/ease-in-out/cubic-bezier(a,b,c,d)[参数在0-1之间]

// 动画---延迟时间
animation: 2s 延迟时间 动画名称 动画形式;

// 动画---重复次数  x/infinite
animation: 2s 延迟时间 动画名称 动画形式 重复次数;

// 动画---动画方向(偶数次的时候的方向) alternate/normal
animation: 2s 延迟时间 动画名称 动画形式 重复次数 动画方向;

// 动画---播放/暂停
animation-play-state: running/paused;

