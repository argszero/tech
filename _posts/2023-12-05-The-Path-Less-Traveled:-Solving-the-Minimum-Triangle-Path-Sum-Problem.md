tags: JavaScript, Algorithms, Dynamic Programming, Matrix

Imagine you're standing at the peak of a pyramid, and your goal is to reach the base by taking the path with the smallest sum of numbers. You can only move to the adjacent numbers directly below you. This is the essence of the Minimum Triangle Path Sum problem.

Let's illustrate this with an example:

```
   2
  3 4
 6 5 7
4 1 8 3
```

The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

This problem is a classic example of dynamic programming, where the solution to a problem depends on solutions to smaller instances of the same problem. In this case, the minimum path sum to a node depends on the minimum path sums of the nodes directly below it.

We can solve this problem using a 2D dynamic programming array, `dp[i][j]`, where `dp[i][j]` represents the minimum path sum from node `(i, j)` to the base of the triangle. According to the problem's constraints, `dp[i][j]` can be calculated as `triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])`.

Here's the JavaScript code that implements this solution:

```markdown
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    const dp = [];
    dp[triangle.length-1] = triangle[triangle.length-1]; // The minimum path sum for the last row is the row itself
    for(let i = triangle.length-2; i >= 0; i--){
        dp[i] = [];
        for(let j = 0; j < triangle[i].length; j++){
            dp[i][j] = triangle[i][j] + Math.min(dp[i+1][j], dp[i+1][j+1]);
        }
    }
    return dp[0][0];
};
```

This algorithm starts from the base of the triangle and works its way up, calculating the minimum path sum for each node. When it reaches the top, `dp[0][0]` will contain the minimum path sum for the entire triangle.

The time complexity of this algorithm is O(n^2), where n is the number of rows in the triangle. This is because we need to iterate over each node in the triangle once. The space complexity is also O(n^2), as we need to store the minimum path sum for each node in the `dp` array.