合并两个有序数组

给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。


根据题意，只需要将nums2里的每个元素，插入到nums1中即可。这道题对javascript来说有些简单，因为javascript splice函数支持向数组指定位置插入
```javascript 
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    nums1.splice(-n, n); //对javascript来说，数组是变长的，后面填充的0没必要
    let i =0; //当前nums1比较大到哪个元素了，
    for (let n2  of nums2){
        for(;nums1[i]<n2 && i<m;i++){ //跳过num1里比当前数小的位置
        }
        nums1.splice(i, 0, n2); //查到插入位置了，插入
        m++; //总元素个数变化了
    }
};
```