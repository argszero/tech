TAGS: Algorithms, Dynamic Programming, Tribonacci sequence

Have you ever heard of the Fibonacci sequence? It's a series of numbers where each number is the sum of the two preceding ones. But what if we told you there's a similar sequence, but instead of two, it dances with three numbers? Meet the Tribonacci sequence!

The Tribonacci sequence  $T_n$ is defined as follows: 
$T_0 = 0, T_1 = 1, T_2 = 1$, and for $n >= 0$, $T_{n+3} = T_n + T_{n+1} + T_{n+2}$.

In other words, each number in the sequence is the sum of the previous three numbers. It's like a Fibonacci sequence with an extra step in the dance!

Now, let's say you're given an integer $n$ and you need to return the $n$th number in the Tribonacci sequence $T_n$ . How would you go about it?

Well, since the Tribonacci sequence is similar to the Fibonacci sequence, but with the sum of the last three numbers instead of two, we just need to remember the last three numbers. Here's a JavaScript function that does exactly that:

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

This function starts with an array, `n_3`, containing the first three numbers in the Tribonacci sequence. If $n$ is less than or equal to 2, it simply returns the $n$th number from the `n_3` array. If $n$ is greater than 2, it enters a loop where it calculates the next number in the sequence, adds it to the `n_3` array, and removes the first number from the `n_3` array. Finally, it returns the last number in the `n_3` array, which is the $n$th Tribonacci number.

To test the function, you can use the following code:

```javascript
console.time(); tribonacci(44); console.timeEnd();
```

This will print the time it took to calculate the 44th Tribonacci number. In our case, it took about 22.747 milliseconds. Not bad for a three-step dance, right?

So, next time you're asked about the Tribonacci sequence, you can not only explain what it is, but also how to calculate any number in the sequence. Now, that's a dance worth knowing!