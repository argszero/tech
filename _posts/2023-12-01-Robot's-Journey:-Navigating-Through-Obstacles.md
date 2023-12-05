Tags: JavaScript, Algorithms, Dynamic Programming, Matrix

Imagine a robot, starting at the top left corner of a grid, trying to reach the bottom right corner. The robot can only move down or to the right. Now, add some obstacles into the mix. The grid is represented as a 2D array, where 0 represents an open path and 1 represents an obstacle. The question is, how many different paths can the robot take to reach the finish line, given the obstacles?

Let's illustrate this with an example: 

```markdown
Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
+-----+------+------+
|  0  |  0   |  0   |
+-----+------+------+
|  0  |  1   |  0   |
+-----+------+------+
|  0  |  0   |  0   |
+-----+------+------+
Output: 2
```
In this 3x3 grid with a single obstacle in the middle, there are 2 distinct paths from start to finish:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

The robot can only enter a cell from the one above it or the one to its left. Therefore, the number of paths to any cell is the sum of the paths to the cell above it and the cell to its left. However, if a cell contains an obstacle, the number of paths to that cell is 0. This gives us the state transition equation: 

```markdown
dp[i][j] = obstacleGrid[i][j]===1 ? 0 : (dp[i-1][j] + dp[i][j-1])
```

The initial state is `dp[0][0] = obstacleGrid[i][j]===1 ? 0 : 1`. For any `i, j`, if `obstacleGrid[i][j]===1`, then `dp[i][j]=0`. For any non-obstacle cell in the first row or column, `dp[i][j]=1`.

Here is the JavaScript implementation of the algorithm:

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

The time complexity of this algorithm is $O(M\times N)$ due to the two nested loops. The space complexity is also $O(M\times N)$ because we store the number of paths to each cell in a 2D array `dp`.