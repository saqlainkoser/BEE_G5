//Server static file in express js 

const express=require("express");

const app=express();
//to serve statics files in Express use build in middleware static
app.use(express.static("./public"));

app.get("/",(req,res)=>{
    console.log("Files Served");
    // res.send("Files Served")
})

app.listen(8887);