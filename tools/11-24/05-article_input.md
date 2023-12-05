多数元素
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。

最直接的做法，使用一个hashMap保存每个数出现的次数，如果发现某个元素出现的次数大于n/2,则返回这个元素
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let hash ={}
    let mid = nums.length/2;
    return (()=>{
        for(let num of nums){
            let count= (hash[num]||0) + 1
            hash[num]=count
            console.log(num,count)
            if(count > mid){
                return num
            }
        }
    })();
};
```

这里时间复杂度为O(n),空间复杂度也是O(n)

有没有可能在O(1)的空间复杂度下解决这个问题呢？ 这里里我们可以利用“博耶-摩尔多数投票算法”。

博耶-摩尔多数投票算法的简单简单解释如下；
保存一个候选人，以及当前候选人的得票。每个人投票时，如果这个人和候选人一样，则当前候选人票数加1，反之，则当前候选人票数减一。如果投票人发现当前候选人的票数为零，则自己带着自己的那票作为新的候选人。

为什么在以上规则下，一定保证最终的候选人是多数呢？
因为：
    1. 如果候选人不是多数 则多数,会和其他非候选人一起反对 会反对候选人,所以候选人一定会下台
    2 如果候选人是多数 , 则多数会支持自己，其他候选人会反对，同样因为多数票数超过一半，所以多数一定会成功当选

也可以这么理解: 所有人互相PK，随便选出两个人，如果两个人一样，则抱团，如果不一样，则互相抵消都扔掉。对多数候选人最不利的情况是，每个非多数的人，都pk掉一个多数的人。即使在这种最不利的情况下，多数的人也一定能胜出。

代码实现如下:

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let candinate =nums[0];
    let voteCount = 1;
    for(let i=1;i<nums.length;i++){
        if(nums[i]===candinate){
            voteCount++;
        }else{
            voteCount--;
            if(voteCount===0){
                candinate = nums[i];
                voteCount = 1;
            }
        }
    }
    return candinate
};
```