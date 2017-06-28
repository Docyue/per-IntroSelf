// 03 插入排序
// 插入排序的代码实现虽然没有冒泡排序和选择排序那么简单粗暴，但它的原理应该是最容易理解的了，因为只要打过扑克牌的人都应该能够秒懂。插入排序是一种最简单直观的排序算法，它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入；插入排序和冒泡排序一样，也有一种优化算法，叫做拆半插入。
// ## 算法步骤
// 1.将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 2.从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

//	插入排序
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}

// // 排序去重------1
function insertionSortO(arr){
	let len = arr.length;
	let preIndex, current;

	for (var i = 0; i < len; i++) {
		preIndex = i - 1;
		current = arr[i];
		while (preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex+1] = arr[preIndex];
			preIndex--;
		}
		arr[preIndex+1] = current;
	};
	// 去重
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if(newArr.indexOf(arr[i]) == -1){ // 去重！！！！
			newArr.push(arr[i]);
		}
	};
	return newArr;
}

// 排序去重------2
function insertionSortT(arr){
	let len = arr.length;
	let preIndex, current;
	
	for (var i = 0; i < len; i++) {
		preIndex = i - 1;
		current = arr[i];
		while (preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex--;
		}
		arr[preIndex + 1] = current;
	};
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
function insertionSortTS(arr){
	let len = arr.length;
	var preIndex, current;

	for (var i = 0; i < len; i++) {
		preIndex = i -1;
		current = arr[i];
		
		while (preIndex >= 0 && arr[preIndex] > current) {
			arr[preIndex + 1] = arr[preIndex];
			preIndex --;
		}
		arr[preIndex + 1] = current;
	};
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
// console.log(insertionSort(arr));
// 排序去重------1
// console.log(insertionSortO(arr));
// 排序去重------2
// console.log(insertionSortT(arr));
// 排序去重------3
console.log(insertionSortTS(arr));


