let fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}
let fn2 = () => new Promise(resolve => {
    setTimeout(() => {
        console.log('fn2')
        resolve(2)
    }, 1000)
})


function promiseReduce(asyncFunctions, reduce, initialValue) {
    let result = 0
    let i = 0
    return new Promise((resolve) => {
        asyncFunctions.forEach(async function(func) {
            result = await getResult(func, reduce, initialValue, result)

            if (i === asyncFunctions.length-1)
                resolve(result)
            else
                i++
        })
    })
}

async function getResult(func, reduce, value, result) {
    result += reduce(await func(), value)

    return result
}

promiseReduce(
    [fn1, fn2],
    function(memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
)
    .then(result => console.log(result))