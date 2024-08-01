//nodejs - mongodb -> mongoose
//importing library for mongodb
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"}) // to connect config

//to connect mongodb using mongoose
mongoose.connect(process.env.CONN_STR)
.then((conn)=>{
    console.log("DB Connection Successfull");
}).catch((err)=>{
    console.log("some error has occured");
})

//schema  --> model --> CRUD
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    description:String,
    duration:Number,
    ratings:Number
})

//model
const Movie=mongoose.model("movies",movieSchema);

//using this model we do CRUD operation
// const testMovie=new movie({
//     name:"Test Movie2",
//     description:"test Description",
//     duration:5,
//     ratings:3.4
// })

// testMovie.save()

module.exports = Movie;