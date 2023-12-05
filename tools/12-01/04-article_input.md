
轮转数组
tags: javascript，算法， 数组，环状替换

给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

 

示例 1:

输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]


根据题意，如果k等于数组长度，则数组其实相当于不变，为了简化操作，我们可以令 k = k%nums
对于数组里任意元素 i ，我们可以计算出它移动后的位置 (i + k)%nums
但是，我们不能直接移动，因为当把位置为i的元素，移动到 (i + k)%nums后，原先在(i + k)%nums位置的元素就丢失了。为了解决这个问题，我们首先需要将数组做一个拷贝。

实现代码
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    k = k % nums.length;
    const copy=[...nums];
    for (let i = 0; i < nums.length; i++) {
        const target_index =(nums.length+i-k)%nums.length;
        nums[i] = copy[target_index]
    }
    return nums;
};
```

以上代码时间复杂度为O(n),空间复杂度也是O(n), 因为我们做了一次数组拷贝，带来了额外的内存消耗

那么，我们可以不拷贝整个数组，而只是拷贝当前被替换位置的元素吗？
我们看，如果我们只拷贝当前位置的元素：
1. 我们拷贝位置为a的元素到tmp， 
2. 将位置为b的元素拷贝到位置a
3. 将位置为c的元素拷贝到位置b
...
n. 将位置为a的的元素拷贝到位置n， （这里要注意，位置为a的元素其实在tmp元素里面，所以是把tmp拷贝到位置n)

看起来不错，但这个时候，是不是所有元素都已经完成位置移动了呢？

让我们看一个例子，假设数组长度为6，k=2
1. tmp = nums[0]
2. nums[0] = num[4]
3. nums[4] = num[2]
4. nums[2] = tmp (即nums[0])

这样子，我们就发现问题了，只有2的倍数的元素发生了移动，其他元素未处理。如何避免这种情况呢？
我们记录下已经移动了多少个元素，然后如果发现转了一圈回到start元素时，已经移动的元素个数和数组个数不一致，则将start指向下一个元素，然后继续。。
实现代码如下：
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    k = k % nums.length;
    let count=0;
    let start = 0;
    let target=start;
    let target_value = nums[start];
    for(;;count++){
        if(count===nums.length)break;
        let source = (target+nums.length -k)%nums.length;
        nums[target]=source==start?target_value:nums[source];
        target=source;
        if(target===start){
            start++;
            target_value = nums[start];
            target=start;
        };
    }
    return nums;
};
```

上面的做法，时间复杂度还是O(n), 但空间复杂度变成了O(1)

另外，因为我们使用javascript来实现，所以也可以使用javascript的内置数组函数splice来实现：
1. 使用取余运算符 % 确保 k 的值不超过数组长度，以避免不必要的操作。
2. 使用 splice 方法从数组末尾截取出 k 个元素，并将它们作为一个新的子数组。
3. 使用 splice 方法将这个子数组插入到数组的开头，以实现向右旋转 k 个位置。

代码实现如下:
```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    k = k % nums.length
    nums.splice(0,0,...nums.splice(-k))
};
```
不得不说，javascript真是一个人见人爱到达语言啊