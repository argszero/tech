
不同路径 II
tags: javascript，算法， 动态规划, 矩阵，排列组合

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。
现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
网格中的障碍物和空位置分别用 1 和 0 来表示。

示例1:输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
+-----+------+------+
|  0  |  0   |  0   |
+-----+------+------+
|  0  |  1   |  0   |
+-----+------+------+
|  0  |  0   |  0   |
+-----+------+------+
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右



因为机器人智能向下或者向右移动，所以对任意个一个单元格来说，进入这个单元格只有两种方法，一种是从上方进入，一种是从左边进入。
所以，到达任意单元格的路径数 = 到达这个单元格上方的单元格的路径数，到达这个单元格左边单元格的路径数。
另外，如果这个单元格有障碍物，则到达这个单元格的路径数为0
记为： dp[i][j] = obstacleGrid[i][j]===1?0:(dp[i-1][j] + dp[i][j-1])

这其实就是状态转移方程。
初始状态dp[0][0] = obstacleGrid[i][j]===1?0:1, 对于任意i,j，若obstacleGrid[i][j]===1， 则dp[i][j]=0; 对于第一行或者第一列的任意非障碍物的单元格dp[i][j]=1


于是我们的实现代码也就出来了
```javascript

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
    const dp = []
    for (let i = 0; i < obstacleGrid.length; i++) {
        const row = obstacleGrid[i];
        dp[i] = []
        for (let j = 0; j < row.length; j++) {
            if (obstacleGrid[i]?.[j] === 1) {
                dp[i][j] = 0
            } else if (i === 0 && j === 0) {
                dp[i][j] = 1
            } else {
                dp[i][j] = (dp[i - 1]?.[j] || 0) + (dp[i]?.[j - 1] || 0);
            }
        }
    }
    return dp[obstacleGrid.length - 1][obstacleGrid[0].length - 1]
};
```
时间复杂度为O(M*N)： 两层循环
空间复杂度为O(M*N): 针对矩阵中每个元素，保存其到达的最小数字和，即dp二维数组
