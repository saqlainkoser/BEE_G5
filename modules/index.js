console.log("Hello G5");

//Creating a server using HTTP

const http = require('http');

const hostname='127.0.0.1';
const port = 3000;
const data=require('./mymodule');


const server =http.createServer((req,res)=>{
   //c1
    res.statusCode=200;
    //c2
    res.setHeader('Content-Type','text/plain');
    //data
    res.end("Hello World" + data.myDateTime());
})

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
})


