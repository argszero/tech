爬楼梯

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

分析：这个其实是一个小学奥数题。

1. 如果现在还剩1级阶梯，则只能有一种爬法：1， 记为：climbStairs(1) = 1
2. 如果现在还剩2级阶梯，则有2中爬法: 1+1,2, 记为:climbStairs(2) = 2
3. 如果现在还剩3级阶梯，则如果爬1个台阶，则变成了climbStairs(2)， 如果爬俩个台阶，则变成了climbStairs(1)，记为：climbStairs(3) = climbStairs(1) +  climbStairs(2)
4. 如果现在还剩4级阶梯，则如果爬1个台阶，则变成了climbStairs(3)， 如果爬俩个台阶，则变成了climbStairs(2)， 记为：climbStairs(4) = climbStairs(2) +  climbStairs(3)
...

所以这其实是一个斐波那契数列。最简单的实现方式就是递归

我们使用javascript来实现：
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

我们测试一下执行时间：
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
结果：default: 17.708s

显然，时间有些长了，我们能否再进一步提高执行效率呢？

我们看一下，我们的函数，会发现
climbStairs(n) = climbStairs(n-1)+climbStairs(n-2) = (climbStairs(n-2)+climbStairs(n-3)) + climbStairs(n-2)
到这一步我们就发现，计算n,其实相当于计算了n-2两次,而每次计算n-2相当于计算了n-4两次，所以时间就消耗在这里了。

我们可以增加一个缓存看一下效果
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
我们测试一下执行时间：
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
结果：default: 25.557ms

上面这种方式，我们采用了缓存提升了性能,但会比较消耗内存
我们回顾我们之前的思考，我们先计算还有一级阶梯时的个数，然后再分别计算第2，3，4级阶梯时的次数，当我们计算第n级阶梯时，我们并不需要记住之前的所有解，只需要记住n-1和n-2的解即可。
所以我们就有了下面这种方法
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
我们测试一下执行时间：
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
18.478ms

到目前为止，我们并未采用任何数学手段，现在从数学的角度来想一想这题我们应该怎么做？

从数学角度讲，就是要求推导斐波那契数列的通项公式。

F(n) = F(n-1) + F(n-2)

通项公式公式的推导过程比较复杂，回头专门写一下。这里我们只需要知道推导结果为：
$$
F(n)=\frac{1}{\sqrt{5}}\left[ \left(\frac{1+\sqrt{5}}{2}\right)^{n} - \left(\frac{1-\sqrt{5}}{2}\right)^{n} \right]
$$

下面是这个通项公式在代码里的实现：
```javascript
var climbStairs = function(n) {
    n=n+1; //因为本题首项不是从0，而是从1开始的
    const sqrt5 = Math.sqrt(5);
    return Math.round((((1+sqrt5)/2)**n -((1-sqrt5)/2)**n) / sqrt5);
}; 
```
我们测试一下执行时间：
```javascript
console.time(); climbStairs(44); console.timeEnd();
```
结果：default: 0.241ms

因为当n=44时，之前的方法已经时毫秒级的响应时间了，最后这点提升似乎体现不出来，但当n取值非常大的时候，效果提升就很明显了。
当 $n = 10^9$ 时，前面的方法耗时为11.156s，但使用通项公式的方法耗时只有1.296ms