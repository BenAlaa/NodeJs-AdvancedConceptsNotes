process.env.UV_THREADPOOL_SIZE = 5
const crypto = require('crypto')

const start = Date.now()
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('1:-', Date.now() - start)

})
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('2:-', Date.now() - start)

})

// note that when we execute these two functions we will find that they took nearlly the same time.
// that mean crypto module isn't single threaded

// libuv has another resposibility for some function in standard library
// for some function libuv need to do expensive calculations outside the enventloop entirly instide there is something called 'thread pool'
// Thread Pool: is a series of threads to running computitoining expensive tasks
// by default libuv create 4 threads in the thread pool
// by using thread pool eventloop didn't need to wait until these expensive function are executed





// lets add more functionand check the results
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('3:-', Date.now() - start)

})
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('4:-', Date.now() - start)

})
crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
    console.log('5:-', Date.now() - start)

})


// we will find that the 4th function nearlly take the same time but the 5th function take more time than the others
// why this happen?
// because thread pool have 4 threads by default so each thread execute one function and the last function will wait till threade is free
// so it will take longer time

// note that threadpool talk to OS Schedular so it can send operation to CPU

// We can change the number of threads in threadpool by accessing the process varialbles 
// process.env.UV_THREADPOOL_SIZE

// if we set number of threads to 2
// we will find that 2 function will take the same time and be executed first
// then another two function will be executed after within the same time
// finally the last function will be executed


// if we set number of threads to 5 all functions will be executed at the same time




// Common questions
// 1. Can we use threadpool for javascript code or only nodeJS functions can use it?
//  we can write custom js code that can use threadpool

//2. What function inside nodeJS std library use threadpool?
//  all 'fs' functions, some 'crypto' function depends on your OS.

// 3. How does this threadpool stuff fit in the eventloop?
// tasks running in the threadpool considered pending long running operations in eventloop 

