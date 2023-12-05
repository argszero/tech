TAGS: Algorithms, Dynamic Programming, Fibonacci sequence

Imagine you're standing at the base of a staircase with `n` steps. You can either ascend 1 or 2 steps at a time. How many different paths can you take to reach the top? Sounds like a riddle, right? Well, it's actually a fun and easy way to comprehend the Fibonacci sequence!

## The Fundamental Idea

Let's dissect it:

1. If there's only 1 step, you have just one way to reach the top: 1 step at a time. We can denote this as `climbStairs(1) = 1`.
2. If there are 2 steps, you have two options: either 1 step at a time, or 2 steps at once. So, `climbStairs(2) = 2`.
3. If there are 3 steps, you can either climb 1 step (and then you're left with the situation of `climbStairs(2)`), or climb 2 steps (and then you're left with `climbStairs(1)`). Hence, `climbStairs(3) = climbStairs(1) + climbStairs(2)`.
4. Similarly, for 4 steps, `climbStairs(4) = climbStairs(2) + climbStairs(3)`, and so forth.

This pattern is nothing but the Fibonacci sequence! The simplest way to implement this is through recursion.

## The Code

Here's a JavaScript implementation:

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n===1)return 1;
    if (n===2)return 2;
    return climbStairs(n-1)+climbStairs(n-2);
};
```

Let's test the execution time:
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
Result: default: 17.708s

## The Issue

This code works, but it's not very efficient. When we calculate `climbStairs(n)`, we end up calculating `climbStairs(n-2)` twice, and for each of those calculations, we calculate `climbStairs(n-4)` twice, and so on. This redundancy leads to a lot of wasted time.

## The Solution

To improve efficiency, we can use a cache to store the results of previous calculations:

```javascript
var climbStairs = function(n) {
    const cache = []
    const climbStairsWithCache = function(n,cache){
        if (n===1)return 1;
        if (n===2)return 2;
        const cachedResult = cache[n];
        if(cachedResult)return cachedResult;
        const result = climbStairsWithCache(n-1,cache)+climbStairsWithCache(n-2,cache);
        cache[n] = result;
        return result;
    }
    return climbStairsWithCache(n,cache);
};
```
Let's test the execution time:
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
Result: default: 25.557ms

This approach, while enhancing performance with caching, can be memory-intensive. However, if we reflect on our previous thought process, we first calculate the number of ways for one step, then for the 2nd, 3rd, 4th steps, and so on. When we calculate for the nth step, we don't need to remember all the previous solutions, just the solutions for n-1 and n-2.

## The Optimization

We can further optimize our solution by realizing that we don't need to remember all previous results, just the last two. Here's the optimized code:

```javascript
var climbStairs = function(n) {
    let n_1=1;
    let n_2=2;
    if (n===1)return n_1;
    if (n===2)return n_2;
    for(var i=3;i<=n;i++){
        let temp = n_1+n_2;
        n_1 = n_2;
        n_2 = temp;
    }
    return n_2;
};
```

Let's test the execution time:
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
Result: default: 18.478ms

## The Mathematical Approach

From a mathematical perspective, we can derive the general formula for the Fibonacci sequence:

$$
F(n)=\frac{1}{\sqrt{5}}\left[ \left(\frac{1+\sqrt{5}}{2}\right)^{n} - \left(\frac{1-\sqrt{5}}{2}\right)^{n} \right]
$$

And here's the code implementation:

```javascript
var climbStairs = function(n) {
    n=n+1; //because the first term starts from 1, not 0
    const sqrt5 = Math.sqrt(5);
    return Math.round((((1+sqrt5)/2)**n -((1-sqrt5)/2)**n) / sqrt5);
}; 
```

Let's test the execution time:
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
Result: default: 0.241ms

This mathematical approach is significantly faster, especially for large `n`. For example, when `n = 10^9`, the previous method takes 11.156s, but the mathematical approach only takes 1.296ms!

So, the next time you encounter a staircase, remember: it's not just a means to ascend, it's also a fun way to understand the Fibonacci sequence!