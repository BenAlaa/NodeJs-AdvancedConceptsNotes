// eventloop is the core of any nodejs programm running
// every program has just one eventloop

// how eventloop works?
// eventloop is woking as while loop
// every iyeration is called 'tick'




// node myFile.js
myFiles.runContent();


// these arrayes are created the program starts
// new timers, tasks or operations are recorded from myFile running
const pendingTimers = [];
const pendingOSTasks = [];
const pendingLongOperations = [];



// there is a function that check if the while loop continue or not
const shouldContinue = () => {
    // node have three checks
    // 1. any pending setTimeOut, setInterval, setImmediate?
    // 2. any pending os tasks: (like http server listening to port)
    // 3. any pending long running operations (like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingLongOperations.length

}

// the entire body is executed in one tick
while (shouldContinue()) {
    // 1) Node looks at pending timers and see if any functions are ready to be called, setTimeOut and setInterval


    // 2) Node looks at pending OSTasks and pending operations and calls relevant callbacks

    // 3) Pause execution. continue when..
    //      - a new pending OSTask is done
    //      - a new pending operation is done 
    //      - a new pending time is about to completeHandle any 'close' event

    // 4) Node looks at timers call any setImmediate
    
    // 5) Handle any 'close' event
}





// exit and back to terminal

