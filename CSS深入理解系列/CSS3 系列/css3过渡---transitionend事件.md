<script>

// ---transitionEnd 事件
// 每改变一次会触发一次
function addEnd(obj, fn){
	obj.addEventListener('WebkitTransitionEnd',fn,false)
	obj.addEventListener('transitionEnd',fn,false)
}

function removeEnd(obj, fn){
	obj.removeEventListener('WebkitTransitionEnd',fn,false)
	obj.removeEventListener('transitionEnd',fn,false)
}


</script>