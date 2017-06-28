// 02 选择排序
// ## 算法步骤
// 1.首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置  
// 2.再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。  
// 3.重复第二步，直到所有元素均排序完毕。

//	选择排序
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]){//寻找最小的数
                minIndex = j;//将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

// 排序去重------1
function selectionSortO(arr){
	let len = arr.length;
	var minIndex, temp;
	for (var i = 0; i < len-1; i++) {
		minIndex = i;
		for (var j = i+1; j < len; j++) {
			if(arr[j] < arr[minIndex]){ //寻找最小的数
				minIndex = j; // 保存最小数的索引
			}
		};
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
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
function selectionSortT(arr){
	let len = arr.length;
	var minIndex, temp;
	for (var i = 0; i < len-1; i++) {
		minIndex = i;
		for (var j = i+1; j < len; j++) {
			if(arr[j] < arr[minIndex]){ //寻找最小的数
				minIndex = j; // 保存最小数的索引
			}
		};
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	};
	// 去重
	var hashObj = {}, newArr = [];

	for (var i = 0; i < arr.length; i++) {
		if(!hashObj[arr[i]] ){ // 如果hash表中不存在，则组成新数组,去重！！！！
			hashObj[arr[i]] = true;
			newArr.push(arr[i])
		}
	};
	return newArr;
}

// 排序去重------3
function selectionSortTS(arr){
	let len = arr.length;
	var minIndex, temp;
	for (var i = 0; i < len-1; i++) {
		minIndex = i;
		for (var j = i+1; j < len; j++) {
			if(arr[j] < arr[minIndex]){ //寻找最小的数
				minIndex = j; // 保存最小数的索引
			}
		};
		temp = arr[i];
		arr[i] = arr[minIndex];
		arr[minIndex] = temp;
	};
	// 去重
	var newArr = [arr[0]];

	for (var i = 1; i < arr.length; i++) {
		if(newArr.indexOf(arr[i]) == -1){ // 新数组,去重！！！！
			newArr.push(arr[i])
		}
	};
	return newArr;
}


var arr = [33,22,1,55,3,77,44,22,88,888,22,11,4,2]
// 选择排序
// console.log(selectionSort(arr));
// 排序去重------1
// console.log(selectionSortO(arr));
// 排序去重------2
// console.log(selectionSortT(arr));
// 排序去重------3
console.log(selectionSortTS(arr));


