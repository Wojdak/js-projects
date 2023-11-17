async function AsyncAdd(a, b) {
    return new Promise((resolve, reject) =>{
        if (isNaN(a) || isNaN(b)) {
            reject('Arguments must be numbers');
        } else {
            setTimeout(() => {
                resolve(a + b);
            }, 100);
        }
    });
}
//console.log(AsyncAdd(15, 1));

async function CalculateSum(arr) {
    const start = performance.now();
    let asyncCallsCount = 0;

    const half = Math.ceil(arr.length/2)

    let res1=0;
    let res2=0;
    
    for(let i=0; i<half; i++){
        res1 = await AsyncAdd(res1, arr[i])
        asyncCallsCount++;
        res2 = await AsyncAdd(res2, arr[i+half])
        asyncCallsCount++;
    }

    const result = await AsyncAdd(res1, res2);

    const end = performance.now();
    console.log("Sum: " + result);
    console.log("Time: " + Math.round(end - start) + "ms");
    console.log("Async method calls: " + asyncCallsCount);
};

//CalculateSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

let nums = [];

for(let i = 0; i<100; i++){
    nums[i]=i;
}

CalculateSum(nums);