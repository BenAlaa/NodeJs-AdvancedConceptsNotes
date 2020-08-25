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
