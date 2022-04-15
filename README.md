# Retriest
Retry a function until success or timeout. Good for api calls.

## Usage
```
await retrier(functionToRetry, args = [], interval, total_tries, retries)
```