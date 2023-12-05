第 N 个泰波那契数

泰波那契序列 Tn 定义如下： 
T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
给你整数 n，请返回第 n 个泰波那契数 Tn 的值。


我们可以看到，泰波那契数和斐波那契数列差不多，只是有前两项求和变成了前三项求和，所以我们只需要记住前三项的结果即可
```javascript
/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function(n) {
    const n_3=[0,1,1]
    if(n<=2)return n_3[n];
    for(var i=3;i<=n;i++){
        n_3.push(n_3[0]+n_3[1]+n_3[2]);
        n_3.shift();
    }
    return n_3[2]
};

```

我们测试一下用时
```javascript
console.time(); tribonacci(44); console.timeEnd();
```
结果: default: 22.747ms