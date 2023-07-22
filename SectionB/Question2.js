// There is an API that one must call to get data. The trouble is it will not let you cross
// the limit of call - say 15 calls per minute. If you cross the limit, the system penalises
// you by one additional minute of penalty where you can not make any call. Here is
// how the API looks like: function string call_me(string input).

// Propose a solution by which:
// 1. You would be able to use the API within the safe limit.
// 2. What happens if you are supposed to call the API 20 times per minute? Is
// there any way to accomplish this?
// 3. If you were the API designer, what would you do to implement this
// behaviour?

// To ensure we stay within the safe limit of 15 calls per minute and handle the penalty,
// we can use a rate-limiting mechanism and a queue to manage the API calls.
// Here's a solution

class APICaller {
    constructor() {
        this.callQueue = [];
        this.isCalling = false;
        this.callLimit = 15;
        this.callCounter = 0;
        this.penaltyTime = 0; // Penalty time in milliseconds
    }

    async call_me(input) {
        if (this.isCalling || this.callCounter >= this.callLimit) {
            // If we are currently making calls or have reached the limit, add the call to the queue
            return new Promise((resolve, reject) => {
                this.callQueue.push({ input, resolve, reject });
            });
        }

        this.isCalling = true;
        this.callCounter++;

        // Simulate the API call, replace the setTimeout with the actual API call
        return new Promise((resolve, reject) => {
            setTimeout(
                () => {
                    this.isCalling = false;
                    this.callCounter--;

                    // Check if there are calls in the queue
                    if (this.callQueue.length > 0) {
                        // Process the next call from the queue
                        const nextCall = this.callQueue.shift();
                        this.call_me(nextCall.input)
                            .then(nextCall.resolve)
                            .catch(nextCall.reject);
                    }

                    resolve(`API response for: ${input}`);
                },
                this.penaltyTime > 0 ? this.penaltyTime : 1000
            ); // Simulate the API response time with 1 second
        });
    }
}

// Now, let's use this APICaller class to handle the API calls:

async function exampleUsage() {
    const apiCaller = new APICaller();
    const callsPerMinute = 20;
    const totalTime = 60 * 1000; // 1 minute in milliseconds
    const callInterval = totalTime / callsPerMinute;

    for (let i = 0; i < callsPerMinute; i++) {
        apiCaller
            .call_me(`Call ${i}`)
            .then((response) => console.log(response))
            .catch((error) => console.error(error));

        await new Promise((resolve) => setTimeout(resolve, callInterval));
    }
}

exampleUsage();
