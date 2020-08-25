// we can find pbkdf2 in lib -> internal -> crypto
// acully pbkdf2 take your inputs and forward to c++ side PBKDF2

/*
    your JS code  ---->
    -> Node's JS side (lib folder) 
    -> connect c++ side by process.binding 
    -> conver values between JS and C++ using V8 
    ->  c++ side in (src folder) 
    -> access OS using (libuv)

 */