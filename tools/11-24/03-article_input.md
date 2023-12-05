使用最小花费爬楼梯
TAG: 算法，数组，动态规划

给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。
你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。
请你计算并返回达到楼梯顶部的最低花费。

首先，我们想到通过回归来实现:
假设共有n个阶梯，cost里保存的是n个阶梯的费用。
我们可以选择：
    1. 我们选择向上爬一个阶梯，则花费为cost[0],剩余阶梯为n-1(即cost.slice(1))，所以总花费为:cost[0]+minCostClimbingStairs(cost.slice(1))
    2. 我们选择向上爬两个阶梯，则花费为cost[1],剩余阶梯为n-2(即cost.slice(2)), 所以总花费为:cost[1]+minCostClimbingStairs(cost.slice(2))
我们只需要选择两种方案中花费最小的。

```
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    if(cost.length===0) return 0;
    if(cost.length===1) return 0;
    if(cost.length===2) return Math.min(cost[0],cost[1]);
    return Math.min(cost[0]+minCostClimbingStairs(cost.slice(1)),cost[1]+minCostClimbingStairs(cost.slice(2)))
};

```

我们测试一下用时：
```
console.time()
console.log(minCostClimbingStairs([841,462,566,398,243,248,238,650,989,576,361,126,334,729,446,897,953,38,195,679,65,707,196,705,569,275,259,872,630,965,978,109,56,523,851,887,91,544,598,963,305]))
console.timeEnd()
```
结果：23.631s

很显然，效率非常低。
问题出在什么地方呢？ 因为到达每一级台阶都有多种方法，且越往后的台阶，到达的方式越多。针对每种到达方式，我们都会重新计算从这个台阶开始爬到楼顶所用的最小花费，相当于做了很多的重复计算。

既然这样，为什么我们不提前计算好从之后任意一个台阶到达楼梯的最小花费呢？

因为前面台阶的最小花费都要依赖后面台阶的最小花费，很自然的，我们从最后往前依次计算每个台阶的最小花费

倒数第一级阶梯的费用为cost[-1],这个费用是固定的,因为后面不需要花费就可以直接爬一级阶梯到楼顶了,记为Min(cost) = 0, When cost.length==1
倒数第二级阶梯的费用为cost[-2],这个费用是固定的,因为后面不需要花费就可以直接爬两级阶梯到楼顶了,记为Min(cost) = 0, When cost.length==2
倒数第三级阶梯的费用为cost[-3], 可以选择爬一级阶梯到倒数第二阶梯，或者选择爬两级阶梯到倒数第一阶梯，记为Min(cost) = min(cost[-2] + Min(cost.slice(1)), cost[-1] + Min(cost.slice[2])), When cost.lenght==3
倒数第N 级阶梯的费用为cost[-n],可以选择爬一级阶梯到倒数第n-1阶梯，或者选择爬两级阶梯到倒数第n-2阶梯，记为Min(cost) = min(cost[n-2] + Min(cost.slice(1)), cost[n-1] + Min(cost.slice[2])), When cost.lenght==n

```javascript
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    cost=[0,...cost] //到达当前阶梯，前面的费用为0
    const mins = new Array(cost.length); //保存到达每一级台阶后的最小花费
    mins[mins.length-1] = 0;
    mins[mins.length-2] = 0;
    for(var i=mins.length-3;i>=0;i--){ //从倒数第三级开始算
        let cost1 = cost[i+1]+mins[i+1];//选择爬1级的最小费用
        let cost2 = cost[i+2]+mins[i+2];//选择爬2级的最小费用
        mins[i] = Math.min(cost1,cost2);
    }
    return mins[0]
};
```
```
console.time()
console.log(minCostClimbingStairs([841,462,566,398,243,248,238,650,989,576,361,126,334,729,446,897,953,38,195,679,65,707,196,705,569,275,259,872,630,965,978,109,56,523,851,887,91,544,598,963,305]))
console.timeEnd()
```
结果：0.368ms