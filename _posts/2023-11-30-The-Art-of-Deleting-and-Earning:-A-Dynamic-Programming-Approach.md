
tags: javascript, algorithms, dynamic programming

Imagine you're in a game show. You're presented with an array of integers, `nums`, and you have the power to perform certain operations on it. For each operation, you can choose any `nums[i]`, delete it, and earn `nums[i]` points. However, there's a catch! After you delete `nums[i]`, you must also delete all elements equal to `nums[i] - 1` and `nums[i] + 1`. You start with 0 points, and your goal is to maximize your points through these operations.

Let's think of this problem in a fun way. Suppose the numbers in the array are denominations of bills. You notice that for each denomination, you either take all the bills or none. So, you group the bills by denomination. 

Imagine these groups as boxes, each labeled with its denomination. According to the rules, when you take a box of denomination `n`, the boxes of denomination `n+1` and `n-1` disappear. So, you sort the boxes by denomination.

```javascript
    boxes = [{unit:u1,value:v1},{unit:u2,value:u2} ,..., {unit:un,value:vn}]
```

Now, you have an assistant who hands you the boxes one by one. Each time you receive a box, you calculate your maximum possible earnings based on your previous calculations and the new box.

The boxes can be sorted in ascending or descending order. Let's assume ascending order for now. 

We use `dp` to store the maximum earnings so far and `lastUnit` to store the denomination of the last box:

1. The assistant hands you `boxes[0]`. You have no choice but to take it. Your earnings are `v1`:
```javascript
    dp[0] = boxes[0].value
    lastUnit = boxes[0].unit
```

2. The assistant hands you `boxes[1]`. If the denomination of `boxes[1]` is `lastUnit+1`, you can only take one of the two boxes. If not, you take both:
```javascript
    dp[1] = boxes[1].unit === (lastUnit+1)? 
                        Math.max(boxes[1].value,dp[1-1])
                        :boxes[1].value+dp[1-1]
    lastUnit = boxes[1].unit
```

3. The assistant hands you `boxes[2]`. If the denomination of `boxes[2]` is `lastUnit+1`, you can either take `boxes[2]` and `boxes[0]` (`boxes[2].value+dp[2-2]`) or `boxes[1]` (`dp[2-1]`):
```javascript
    dp[2] = boxes[2].unit ==(lastUnit +1)? 
                        Math.max(boxes[2].value+dp[2-2],dp[2-1])
                        :boxes[2].value+dp[2-1]

    lastUnit = boxes[2].unit
```

...and so on until the assistant hands you `boxes[n]`:

```javascript
    dp[n] = boxes[n].unit === (lastUnit +1)?
                        Math.max(boxes[n].value+dp[n-2],dp[n-1])
                        :boxes[n].value+dp[n-1]
```

Here's the JavaScript implementation:

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
    const boxes =Array.from(map, ([unit, value]) => ({ unit, value }))
                    .sort((a,b)=>a.unit - b.unit)
    let dp=[];
    dp[0] = boxes[0].value;
    if(boxes.length===1)return dp[0];
    let lastUnit = boxes[0].unit;
    dp[1] = (boxes[1].unit === lastUnit+1)?
                        Math.max(boxes[1].value,dp[1-1])
                        :(boxes[1].value+dp[1-1])
    if(boxes.length===2)return dp[1];
    lastUnit = boxes[1].unit
    for(let i=2;i<boxes.length;i++){
        dp[i] = (boxes[i].unit === lastUnit+1)?
                        Math.max(boxes[i].value+dp[i-2],dp[i-1])
                        :(boxes[i].value+dp[i-1])
        lastUnit = boxes[i].unit
    }
    return dp[boxes.length-1];
};
```

Similarly, if the boxes are sorted in descending order, the implementation is as follows:

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
    const boxes =Array.from(map, ([unit, value]) => ({ unit, value }))
                    .sort((b,a)=>a.unit - b.unit)
    let dp=[];
    dp[0] = boxes[0].value;
    if(boxes.length===1)return dp[0];
    let lastUnit = boxes[0].unit;
    dp[1] = (boxes[1].unit === lastUnit-1)?
                            Math.max(boxes[1].value,dp[1-1])
                            :(boxes[1].value+dp[1-1])
    if(boxes.length===2)return dp[1];
    lastUnit = boxes[1].unit
    for(let i=2;i<boxes.length;i++){
        dp[i] = (boxes[i].unit === lastUnit-1)?
                            Math.max(boxes[i].value+dp[i-2],dp[i-1])
                            :(boxes[i].value+dp[i-1])
        lastUnit = boxes[i].unit
    }
    return dp[boxes.length-1];
};
```

We can test both implementations to verify they produce the same result:

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

Execution results:

```bash
49504537598915
default: 1.555s
49504537598915
default: 1.258s
```

As you can see, both implementations produce the same result and have similar execution times. This shows the flexibility of dynamic programming in solving complex problems.