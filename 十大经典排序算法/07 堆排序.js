// 07 堆排序
// 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：

// 大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列；
// 小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列；
// 堆排序的平均时间复杂度为 Ο(nlogn)。

// ## 算法步骤
// 1.创建一个堆 H[0……n-1]；
// 2.把堆首（最大值）和堆尾互换；
// 3.把堆的尺寸缩小 1，并调用 shift_down(0)，目的是把新的数组顶端数据调整到相应位置；
// 4.重复步骤 2，直到堆的尺寸为 1。

//  堆排序
var len;    // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) {   // 建立大顶堆
    len = arr.length;
    for (var i = Math.floor(len/2); i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) {     // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}

// 排序去重------1
function heapSortO(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    // 去重
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if(newArr.indexOf(arr[i]) == -1){ // 如果不存在重复的则执行，去重！！！！
            newArr.push(arr[i]);
        }
    };
    return newArr;
}

// 排序去重------2
function heapSortT(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    // 去重
    let hashObj = {}, newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if(!hashObj[arr[i]]){   // 如果hash表中不存在，则组成新数组,去重！！！！
            hashObj[arr[i]] = true;
            newArr.push((arr[i]))
        }
    };
    return newArr;
}
// 排序去重------3
function heapSortTS(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    // 去重
    var newArr = [arr[0]];

    for (var i = 1; i < arr.length; i++) {
        if(newArr.indexOf(arr[i]) == -1){ // 如果不存在则执行，新数组,去重！！！！
            newArr.push(arr[i])
        }
    };
    return newArr;
}

var arr = [33,22,1,55,3,77,44,22,88,888,22,11,4,2]
// 堆排序
// console.log(heapSort(arr));
// 排序去重------1
// console.log(heapSortO(arr));
// 排序去重------2
// console.log(heapSortT(arr));
// 排序去重------3
console.log(heapSortTS(arr));



