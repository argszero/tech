打家劫舍

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

假设每个房间的金额为nums数组对应下标的元素，我们发现第一个房间选择num[0],则下次要在num[2,3]的房间来选择，如果第一次房间选择num[1],则下次要在num[3,4]的房间里选择。
如果我们采用递归的话，num[3]就会计算多次，耗费性能。由此我们想到，是不是可以用动态规划来解决这个问题。

也就是，我们针对每个房间，计算出选择该房间的最高收益。我们假设先从房间号较大的
剩下的最大房间号              最高收益                                                              计作
0                          num[0]                                                               dp[0]
1                          max(num[0],num[1])                                                   dp[1]
2                          max(num[2]+dp[0],dp[1])                                              dp[2]
3                          max(num[3]+dp[1],dp[2])                                              dp[3]
4                          max(num[4]+dp[2],dp[3])                                              dp[4]
...                        ...                                                                  ...
n                          max(num[n]+dp[n-2],dp[n-1])                                          dp[n]

代码实现：
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const dp = new Array(nums.length)
    dp[0] = nums[0]
    if (nums.length > 1) {
        dp[1] = Math.max(nums[0], nums[1])
        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
        }
    }
    return dp[dp.length - 1]
};
```


