// 04希尔排序
// 希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。
// 希尔排序是基于插入排序的以下两点性质而提出改进方法的:
// 插入排序在对几乎已经排好序的数据操作时，效率高，即可以达到线性排序的效率；
// 但插入排序一般来说是低效的，因为插入排序每次只能将数据移动一位；
// 希尔排序的基本思想是：先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，再对全体记录进行依次直接插入排序。

// ##1. 算法步骤
// 1.选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 2.按增量序列个数 k，对序列进行 k 趟排序；
// 3.每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

//	排序
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}

// 排序去重------1
function shellSortO(arr){
	var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
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
function shellSortT(arr){
	var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
        }
    }
	// 去重
	let hashObj = {}, newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if(!hashObj[arr[i]]){	// 如果hash表中不存在，则组成新数组,去重！！！！
			hashObj[arr[i]] = true;
			newArr.push((arr[i]))
		}
	};
	return newArr;
}

// 排序去重------3
function shellSortTS(){
    var len = arr.length,
        temp,
        gap = 1;
    while(gap < len/3) {          //动态定义间隔序列
        gap = gap*3+1;
    }
    for (gap; gap > 0; gap = Math.floor(gap/3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i-gap; j >= 0 && arr[j] > temp; j-=gap) {
                arr[j+gap] = arr[j];
            }
            arr[j+gap] = temp;
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
// 选择排序
// console.log(shellSort(arr));
// 排序去重------1
// console.log(shellSortO(arr));
// 排序去重------2
// console.log(shellSortT(arr));
// 排序去重------3
console.log(shellSortTS(arr));


