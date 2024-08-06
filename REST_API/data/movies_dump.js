//IMPORTING LIABRARIES AND FILES
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs')
const Movie=require('./../Models/movieModel.js');
dotenv.config({path:"./config.env"});



// CONNECT TO MONGODB
mongoose.connect(process.env.CONN_STR)
    .then((conn)=>{
        console.log("DB Connection successfull"); 
    }).catch((err)=>{
        console.log("Some error has occured " + err); 
    })

//READING JSON FILE
let movies=JSON.parse(fs.readFileSync("./data/movies.json","utf-8"))
// console.log(movies)

//DELETING ALL DATA FROM MONGODB
const deleteMovies = async() =>{
    try{
       await Movie.deleteMany()
       console.log("Data deleted Successfully");
    }catch(err){
        console.log(err.message)
    }
}

//TO Upload data from JSON
const importMovies = async() =>{
    try{
        await Movie.create(movies);
        console.log("Data successfully Uploaded");
    }catch(err){
        console.log(err.message)
    }
}

console.log(process.argv)

if(process.argv[2]=="--import"){
    importMovies() 
}
if(process.argv[2]=="--delete"){
    deleteMovies()
}