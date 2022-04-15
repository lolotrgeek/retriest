/**
 * Retrying a function `something` with exponential pullback.
 * @param {function} something must return `false` to trigger a retry
 * @param {* | array} args to pass to `something`
 * @param {number} interval seconds
 * @param {number} total_tries 
 * @param {number} retries the current count of retries
 * @returns {* | null} either returns function results or `null` for timeout
 */
async function retrier(something, args = [], interval = 1, total_tries = 10, retries = 0) {
    try {
        return new Promise(async (resolve, reject) => {
            if (typeof interval !== 'number') reject("[retry] failed interval Not number.")
            if (typeof total_tries !== 'number') reject("[retry] failed total_tries Not number.")
            if (retries >= total_tries) return resolve(null)
            if (!Array.isArray(args)) args = [args]
            let result = await something(...args)
            if (result !== false) return resolve(result)
            else if (result === false) {
                retries++
                let pullback = (interval * 1000) * retries
                setTimeout(async () => {
                    console.log(`Retrying ${something.name}! ${retries}.`)
                    resolve(await retrier(something, args, interval, total_tries, retries))
                }, pullback)
            }
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = { retrier }