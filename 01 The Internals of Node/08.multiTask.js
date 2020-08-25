const https = require('https');
const crypto = require('crypto');
const fs = require('fs')

const start = Date.now();



const doRequest = () => {
    https.request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log('Request:-', Date.now() - start)
        }) 
    }).end();
}
const doHash = () => {
    crypto.pbkdf2('a','b',100000, 512, 'sha512', () => {
        console.log('Hash:-', Date.now() - start)
    
    })
}

doRequest()

fs.readFile('08.multiTask.js', 'utf8', () => {
    console.log('FS:-', Date.now() - start)
});


doHash()
doHash()
doHash()
doHash()


// we will see that network request always is executed first

// note as we said
// - all fs module use threadpool
// - http request use OS directly
// - pbkdf2 function also use threadpool

// but how reading file process happen
// 1- we call fs.readFile
// 2- node get some 'stats' on the file (requires HD access)
// 3- HD accessed, 'stats' returned
// 4- Node request to read the file.
// 5- HD accessed, file content streams back to node.
// 6- node return file content to us


// So

// the http request executed directly using the OS
// we have 5 functions everyone asigned to thread as we have 5 threads in the threadpool
//
