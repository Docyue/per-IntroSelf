// 08 计数排序
// 计数排序的核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。作为一种线性时间复杂度的排序，计数排序要求输入的数据必须是有确定范围的整数。
// 计数排序
function countingSort(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
    }
    return arr;
}
// 排序去重------1
function countingSortO(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
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
function countingSortT(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
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
function countingSortTS(arr, maxValue) {
    var bucket = new Array(maxValue+1),
        sortedIndex = 0;
        arrLen = arr.length,
        bucketLen = maxValue + 1;
    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0;
        }
        bucket[arr[i]]++;
    }
    for (var j = 0; j < bucketLen; j++) {
        while(bucket[j] > 0) {
            arr[sortedIndex++] = j;
            bucket[j]--;
        }
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
// 计数排序
// console.log(countingSort(arr));
// 排序去重------1
// console.log(countingSortO(arr));
// 排序去重------2
// console.log(countingSortT(arr));
// 排序去重------3
console.log(countingSortTS(arr, 888));