三角形最小路径和
tags: javascript，算法， 动态规划, 矩阵

给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。**相邻的结点**在这里指的是**下标** 与 **上一层结点下标** 相同或者等于 **上一层结点下标** + 1 的两个结点。也就是说，如果正位于当前行的下标 j ，那么下一步可以移动到下一行的下标 j 或 j + 1 。

示例 1：
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。


分析： 显然，下层的节点会影响上层的节点，适用于动态规划。
我们使用dp[i][j] 来存储当选择dp[i][j]节点时，从这个节点开始往下所有路径的最小路径和，根据题意：
dp[i][j] = triangle[i][j] + Math.min(dp[i+1][j],dp[i+1][j+1])

代码实现：
```javascript
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    const dp=[];
    dp[triangle.length-1] = triangle[triangle.length-1]; //最后一行的dp等于其节点值
    for(let i=triangle.length-2;i>=0;i--){
        dp[i]=[]
        for(let j=0;j<triangle[i].length;j++){
            dp[i][j] = triangle[i][j] + Math.min(dp[i+1][j],dp[i+1][j+1])
        }
    }
    return dp[0][0];
};
```

