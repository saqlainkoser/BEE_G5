const express=require('express');
const { model } = require('mongoose');
// const http=require('http')
const app=express();

//middleware

app.use((req,res,next)=>{
    console.log("THis is my middleware #1");
    next()
})

app.use((req,res,next)=>{
    console.log("THis is my middleware #2");
    next()
})


app.get("/",(req,res)=>{
    res.send("Hello Express");
})


app.get("/products",(req,res)=>{
    res.send("This is products page");
})

//DYNAMIC ROUTING me req object me params

app.get("/products/iphone/:model",(req,res)=>{
    res.send(`THis is ${req.params.model} page`);
})

app.get("/services",(req,res)=>{
    res.send("Hello services");
})

app.listen(4040)


// /products/iphone/iphone12 - 
// THis is iphone12 page
// /products/iphone/iphone13
// /products/iphone/iphone14
