const https = require('https');

const start = Date.now();


const doRequest = () => {
    https.request('https://www.google.com', res => {
        res.on('data', () => {})
        res.on('end', () => {
            console.log(Date.now() - start)
        }) 
    }).end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();

// we will notice that all functions is nearlly take the same time and this is a different behaviour from the one we see withh threadpool
// what happens?
//libuv don't handle networking tasks directly it just delegate the request to the OS and OS does the the request.
//and libuv waiting for the OS toemit the response.
// So the OS itself decide to make new thread or not
// Will OS handle these requests there is no blocking of JS code
// everything in this case is done by the OS and nothing touch eventloop or threadpool



// Common questions....
// 1) What function in node srd library use the OS's async features?
// - allmost every thing arround networking for all OS's. some other stuff is OS specific

// 2) How does these OS async stuff fit into the event loop?
// - Tasks using OS are reflected in our pendingOSTasks array