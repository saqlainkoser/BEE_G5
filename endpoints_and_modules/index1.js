
const http=require('http');
const fs=require('fs');
const url=require('url');

const hostname='127.0.0.1';
const port=3009;

const server=http.createServer((req,res)=>{

    const parsedURL=url.parse(req.url,true); // /products?1d=2
    console.log(parsedURL.pathname);
    console.log(parsedURL.query.id);

    const products=fs.readFileSync("./products.json","utf-8");
    // all products endpoint
    if(parsedURL.pathname=="/products" && parsedURL.query.id==undefined && req.method=="GET"){
        
        res.end(products);
    }

    //for single data endpoint
    else if(parsedURL.pathname=="/products" && parsedURL.query.id!==undefined && req.method=="GET"){
        // res.end("Single product data");
        console.log(parsedURL);
        let ProductsArray=JSON.parse(products)
        let product=ProductsArray.find((product)=>{
            return product.id==parsedURL.query.id
        })
        // console.log(product);
        if(product!=undefined){
            res.end(JSON.stringify(product));
        }
        else{
            res.end("Product Not Found");
        }
    }

    //third end point for Post method to store data in JSON file
    else if(parsedURL.pathname=="/products" && req.method=="POST"){
        let product="";

        req.on("data",(chunk)=>{
            product=product+chunk;
        });

        req.on("end",()=>{
            // console.log(product);
            //all products
            let ProductsArray=JSON.parse(products);
            // new product
            let newProduct=JSON.parse(product);

            //joining
            ProductsArray.push(newProduct)
            // console.log(ProductsArray);
            fs.writeFile("./products.json",JSON.stringify(ProductsArray),(err)=>{
                if(err==null){
                    res.end("New product is Added");
                }
            })

        })

    }

    //To delete the product from json file
    else if(parsedURL.pathname=="/products" && parsedURL.query.id!=undefined && req.method=="DELETE"){
        // console.log("Delete end point")
        //all products data ko convert - js object
        let ProductsArray=JSON.parse(products);
    
        let Index=ProductsArray.findIndex((product)=>{
            return product.id==parsedURL.query.id
        })

        //splice()
        ProductsArray.splice(Index,1);

        //overridding json file
        fs.writeFile("./products.json",JSON.stringify(ProductsArray),(err)=>{
            if(err==null){
                res.end("Product Deleted");
            }
        })
    }

    //To put or update any product
    else if(parsedURL.pathname=="/products" && parsedURL.query.id!=undefined && req.method=="PUT"){
        // console.log("PUT Method");
        //all data 
        
        //collecting data from FE
        let product="";

        req.on("data",(chunk)=>{
            product=product+chunk;
        });

        req.on("end",()=>{
            let ProductsArray=JSON.parse(products);
             let ProductOBJ=JSON.parse(product) ;
             //index

             
             let Index=ProductsArray.findIndex((product)=>{
                return product.id==parsedURL.query.id
            })

            ProductsArray[Index]=ProductOBJ;
            //overide all data
            fs.writeFile("./products.json",JSON.stringify(ProductsArray),(err)=>{
                if(err==null){
                    res.en
                }
            })


            
        })
        
       
    }






})

server.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}:${port}`)
})