// ---animationEnd 事件

    function addEnd(obj, fn){
        obj.addEventListener('WebkitAnimation',fn,false)
        obj.addEventListener('animation',fn,false)
    }

    function removeEnd(obj, fn){
        obj.removeEventListener('WebkitAnimation',fn,false)
        obj.removeEventListener('animation',fn,false)
    }
