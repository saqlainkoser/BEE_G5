
//Creating a server using HTTP

const http = require('http');

const hostname='127.0.0.1';
const port = 3001;

const server =http.createServer((req,res)=>{
    console.log(req.url);
    console.log(req.method);
    //data
    res.end("Hello World");
})

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`);
})

