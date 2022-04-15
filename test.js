const { retrier } = require("./main")


/**
 * Test retrying something with pullback
 * @param {function} something 
 */
 async function retry_test(something, args = []) {
    try {
        let result = await retrier(something, args, 1, 5)
        console.log(`${something.name} result:`, result)
        return result
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

function somethingIsNull(){
    return null
}
let null_tries = 0
function somethingToNull() {
    null_tries++
    if(null_tries < 3) return false
    return null
}

async function multiTry(){
    let tried = await retry_test(somethingToTry)
    if (tried === true){
        await retry_test(somethingToNull)
        return "PASS"
    }
    else return "FAIL"
}

// retry_test(somethingToTry)
// retry_test(somethingIsTrue)
// retry_test(somethingToTry)
// retry_test(somethingToFail)
// retry_test(somethingIsNull)
// retry_test(somethingToNull)
// retry_test(somethingWithArg, "hi")
// retry_test(somethingWithArgs, ["hi", "world"])
retry_test(multiTry)
