process.env.UV_THREADPOOL_SIZE = 1
const crypto = require('crypto');
const express = require('express')
const app = express();

const cluster = require('cluster');

// Is the file being executed in the master mode
if (cluster.isMaster) {
    // Cause cluster.js to be executed "again" but in child mode
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
 
} else {
    // I'm a child, I'm going to act like a server and do nothing else 
    // const doWork = (duration) => {
    //     const start = Date.now();
    //     while (Date.now() - start < duration) {
    //         // do something
    //     }
    // }
    app.get('/', (req, res) => {
        // this will block the entire eventloop and the entire server will do nothing else for 5 secs
        // doWork(5000)   
        crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
            res.send('Hi there')
        })
    })
    app.get('/fast', (req, res) => {
        res.send('That was fast')
    })
    app.listen(3000)
}