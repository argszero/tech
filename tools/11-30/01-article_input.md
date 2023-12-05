删除并获得点数。

tags: javascript，算法， 动态规划

给你一个整数数组 nums ，你可以对它进行一些操作。
每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。
开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。


我们这里可以做一个比喻，num数组里放的时各种单位的钞票。我们首先发现，每种单位的钞票，要么不取，要么全取。
所以我们首先可以这些钞票，按照单位分组。
于是，我们可以那一组盒子来放，每个盒子上标记。
然后，根据题意，当我拿为n的盒子时，单位为n+1以及单位为n-1的盒子会消失。所以，我们首先对盒子按照单位进行排序。
```javascript
    boxes = [{unit:u1,value:v1},{unit:u2,value:u2} ,..., {unit:un,value:vn},]
```
我们把这些盒子交给我们的助手，然后，助手将这些盒子一个一个的拿出来给我们，每当助手拿出来一个盒子给我们时，我们要根据之前的计算以及新的盒子，计算出加入这个盒子后我们的最大收入是多少。

这里的排序理论上可以是从小到大的顺序，也可以是从大到小的顺序，我们先假设为从小到大的顺序
好的，现在开始，我们使用dp来保存目前为止可以获取的最大金额，使用lastUnit保存上个盒子的金额：
1. 助手拿出 boxes[0]
很明显，我们这时候没有什么选择，只能选择boxes[0], 获取的金额为v1, 我们记做：
```javascript
    dp[0] = boxes[0].value
    lastUnit = boxes[0].unit
```
2. 助手拿出来boxes[1]
这个时候，我们可以首先看,boxes[1]的面额是不是boxes[0]面额+1， 如果是，两个盒子就只能取其中一个，如果不是，则两个盒子全取。
记做：
```javascript
    dp[1] = boxes[1].unit === (lastUnit+1)? 
                        Math.max(boxes[1].value,dp[1-1])
                        :boxes[1].value+dp[1-1]
    lastUnit = boxes[1].unit
```
3. 助手拿出来boxes[2]
和上面一样，我们还是只有两种选择,如果这个时候，我们我们发现面额刚好是上一个盒子加1， 我们如果选择上个盒子，结果就是之前的dp[2-1]； 如果我们选择这个盒子，那上个盒子就不能在选择，但上上个盒子还可以选择，所以我们收入就是boxes[2].value+dp[2-2]
```javascript
    dp[2] = boxes[2].unit ==(lastUnit +1)? 
                        Math.max(boxes[2].value+dp[2-2],dp[2-1])
                        :boxes[2].value+dp[2-1]

    lastUnit = boxes[2].unit
```
...
n. 助手拿出来boxes[n]
同理
```javascript
    dp[n] = boxes[n].unit === (lastUnit +1)?
                        Math.max(boxes[n].value+dp[n-2],dp[n-1])
                        :boxes[n].value+dp[n-1]
```


实现代码：
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    if(nums.length===0)return 0;
    let map = new Map();
    for(let num of nums){
        map.set(num, (map.get(num)||0)+num)
    }
    const boxes =Array.from(map, ([unit, value]) => ({ unit, value })).sort((a,b)=>a.unit - b.unit)
    let dp=[];
    dp[0] = boxes[0].value;
    if(boxes.length===1)return dp[0];
    let lastUnit = boxes[0].unit;
    dp[1] = (boxes[1].unit === lastUnit+1)?Math.max(boxes[1].value,dp[1-1]):(boxes[1].value+dp[1-1])
    if(boxes.length===2)return dp[1];
    lastUnit = boxes[1].unit
    for(let i=2;i<boxes.length;i++){
        dp[i] = (boxes[i].unit === lastUnit+1)?Math.max(boxes[i].value+dp[i-2],dp[i-1]):(boxes[i].value+dp[i-1])
        lastUnit = boxes[i].unit
    }
    return dp[boxes.length-1];
};
```

同理，我们按照从大到小的顺序的话，实现代码如下

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn2 = function(nums) {
    if(nums.length===0)return 0;
    let map = new Map();
    for(let num of nums){
        map.set(num, (map.get(num)||0)+num)
    }
    const boxes =Array.from(map, ([unit, value]) => ({ unit, value })).sort((b,a)=>a.unit - b.unit)
    let dp=[];
    dp[0] = boxes[0].value;
    if(boxes.length===1)return dp[0];
    let lastUnit = boxes[0].unit;
    dp[1] = (boxes[1].unit === lastUnit-1)?Math.max(boxes[1].value,dp[1-1]):(boxes[1].value+dp[1-1])
    if(boxes.length===2)return dp[1];
    lastUnit = boxes[1].unit
    for(let i=2;i<boxes.length;i++){
        dp[i] = (boxes[i].unit === lastUnit-1)?Math.max(boxes[i].value+dp[i-2],dp[i-1]):(boxes[i].value+dp[i-1])
        lastUnit = boxes[i].unit
    }
    return dp[boxes.length-1];
};
```

我们可以测试一下，两种代码效果是一致的。
```javascript
var nums =[];
for(let i=0;i<1000000;i++){
    nums.push(Math.floor(Math.random()*100000000));
}
console.time()
console.log(deleteAndEarn(nums))
console.timeEnd()
console.time()
console.log(deleteAndEarn2(nums))
console.timeEnd()
```

执行结果:

```bash
49504537598915
default: 1.555s
49504537598915
default: 1.258s
```