
最小路径和
tags: javascript，算法， 动态规划, 矩阵，排列组合

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。

示例1:输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
+-----+------+------+
|  1  |  3   |  1   |
+-----+------+------+
|  1  |  5   |  1   |
+-----+------+------+
|  4  |  2   |  1   |
+-----+------+------+
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。

因为机器人智能向下或者向右移动，所以对任意个一个单元格来说，进入这个单元格只有两种方法，一种是从上方进入，一种是从左边进入。
所以，到达任意单元格到达路径数字总和的最小值 = 当前单元格的数字 + Math.min(到达这个单元格上方的单元格的最小数字和，到达这个单元格左边单元格的最小数字和）
记 dp[i][j] = grid[i][j] + Math.min(dp[i-1][j],dp[i][j-1])
这其实就是状态转移方程。
初始状态dp[0][0] = grid[0][0], 对于任意i<0或者j<0时，dp[i][j] = 0;

```
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const dp=[]
    
    for(let i =0;i<grid.length;i++){
        const row = grid[i]
        dp[i]=[];
        for(let j=0;j<row.length;j++){
            if(i===0&&j===0)dp[i][j]=grid[i][j]
            else if(i===0)dp[i][j]=grid[i][j]+dp[i][j-1]
            else if(j===0)dp[i][j]=grid[i][j]+dp[i-1][j]
            else dp[i][j]=grid[i][j]+Math.min(dp[i-1][j],dp[i][j-1])
        }
    }
    return dp[grid.length-1][grid[0].length-1];
};
```
时间复杂度为O(M*N)： 两层循环
空间复杂度为O(M*N): 针对矩阵中每个元素，保存其到达的最小数字和，即dp二维数组
