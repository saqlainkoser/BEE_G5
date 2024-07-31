//Ejs Install
//npm install ejs - tamplate engine

//configure
//app.set("view engine","ejs")


//Make a folder named - views

//add an ejs file named - index.ejs

//do render in place of send










const express=require('express')



const app=express()

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index",{name:"shaan"});
})

app.listen(9090)