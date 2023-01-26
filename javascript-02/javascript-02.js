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
    return new Promise(resolve => {
        let result = 0;
        (async () => {
            for (let i = 0; i < asyncFunctions.length; i++) {
                result = await reduce(await asyncFunctions[i](), result == 0 ? initialValue : result)

                if (i === asyncFunctions.length - 1)
                    resolve(result)
            }
        })()
    })
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