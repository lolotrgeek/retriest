const { retrier } = require("./main")


/**
 * Test retrying something with pullback
 * @param {function} something 
 */
 async function retry_test(something, args = []) {
    try {
        let result = await retrier(something, args, 1, 5)
        console.log("result:", result)
    } catch (error) {
        console.error(error)
    }
}


let tries = 0
function somethingToTry() {
    tries++
    if(tries < 3) return false
    return true
}

function somethingToFail() {
    return false
}

function somethingWithArg (arg) {
    console.log("arg", arg)
    return true
}

function somethingWithArgs(arg1, arg2) {
    console.log("args", arg1, arg2)
    return true
}

function somethingIsTrue() {
    return true
}

// retry_test(somethingToTry)
// retry_test(somethingIsTrue)
// retry_test(somethingToTry)
// retry_test(somethingToFail)
// retry_test(somethingWithArg, "hi")
retry_test(somethingWithArgs, ["hi", "world"])
