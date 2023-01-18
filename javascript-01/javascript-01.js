function argSum(...args){
    return args.reduce(function(sum, elem) {
        return sum + elem
    }, 0)
}

function curry(f) {
    return function curried(...args){
        return function (arg) {
            if (arg === undefined) {
                return f.apply(this, args)
            } else
                return curried(...args, arg)
        }
    }
}

let sum = curry(argSum)