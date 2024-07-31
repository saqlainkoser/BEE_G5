
const http=require('http');
const fs=require('fs');
const url=require('url');


const hostname='127.0.0.1';
const port=3003;

const server=http.createServer((req,res)=>{

    const parsedURL=url.parse(req.url,true); // /products?1d=2
    console.log(parsedURL.pathname);
    console.log(parsedURL.query.id);


    if(req.url=="/products" && req.method=="GET"){
       fs.readFile("./products.json","utf-8",(err,data)=>{
        if(err==null){
            res.end(data)
        }
        else{
            res.end("Somthing wrong");
        }
       })

    }
 
})

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`)
})