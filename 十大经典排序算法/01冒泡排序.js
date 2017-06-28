// 01 冒泡排序
// ## 算法步骤
// 1.比较相邻的元素。如果第一个比第二个大，就交换他们两个。  
// 2.对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。  
// 3.针对所有的元素重复以上的步骤，除了最后一个。  
// 4.持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

// 冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
    		if (arr[j] > arr[j+1]) {// 相邻元素两两对比
                var temp = arr[j+1];// 元素交换
				arr[j+1] = arr[j];
            	arr[j] = temp;
            }
        }
    }
    return arr;
}

// 排序去重-------1
function bubbleSortQC(arr){
	// 排序
	let len = arr.length;
	for (var i = 0; i < (len-1); i++) {
		for (var j = 0; j < (len-1)-i; j++) {
			if(arr[j] > arr[j+1]){//相邻元素对比
				var temp = arr[j+1]; //元素交换
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
		};
	};
	// 去重------1
	let newArr =[]; // 新建数组
	for (var i = 0; i < arr.length; i++) {
		if(newArr.indexOf(arr[i]) == -1){ // 匹配，去重！！！！
			newArr.push(arr[i])
		}
	};
	return newArr;
}

// 排序去重-------2
function bubbleSortQCT(arr){
	// 排序
	let len = arr.length;
	for (var i = 0; i < (len-1); i++) {
		for (var j = 0; j < (len-1)-i; j++) {
			if(arr[j] > arr[j+1]){//相邻元素对比
				var temp = arr[j+1]; //元素交换
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
		};
	};
	// 去重------2
 	let hashObj = {},
 		newArr = []; //hashObj为hash表，newArr为临时数组
    for(var i = 0; i < arr.length; i++){ //遍历当前数组
        if (!hashObj[arr[i]]) //如果hash表中没有当前项，去重！！！！
        {
            hashObj[arr[i]] = true; //存入hash表
            newArr.push(arr[i]); //把当前数组的当前项push到临时数组里面
        }
        console.log(hashObj);
    }
	return newArr;
}

// 排序去重-------3
function bubbleSortQCS(arr){
	// 排序
	let len = arr.length;
	for (var i = 0; i < (len-1); i++) {
		for (var j = 0; j < (len-1)-i; j++) {
			if(arr[j] > arr[j+1]){//相邻元素对比
				var temp = arr[j+1]; //元素交换
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
		};
	};
	// // 去重
	var newArr = [arr[0]]; //结果数组
    for(var i = 1; i < arr.length; i++) //从第二项开始遍历
    {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
        //那么表示第i项是重复的，忽略掉，去重！！！！
        if (newArr.indexOf(arr[i]) == -1) newArr.push(arr[i]);
    }
    return newArr;
}



var arr = [1,5,22,3,666,3,55,77,5];
// 冒泡排序
// console.log(bubbleSort(arr));
// 排序去重-------1
// console.log(bubbleSortQC(arr));
// 排序去重-------2
// console.log(bubbleSortQCT(arr));
// 排序去重-------3
console.log(bubbleSortQCS(arr));


