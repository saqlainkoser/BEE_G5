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
    console.log("some error has occured" + err);
})

//schema  --> model --> CRUD
const movieSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required field!'],
        unique:true,
        trim:true
    },
    description:{
        type:String,
        required:[true,'Description is required field']
    },
    duration:{
        type:Number,
        required:[true,'Duration is required field!']
    },
    ratings:{
        type:Number,
    },
    totalRatings:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required:[true , "Release Year is required field!"]
    },
    realeaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    genres:{
        type:[String],
        required:[true , "Genres is required field!"]
    },
    directors:{
        type:[String],
        required:[true , "Directors is required field!"]
    },
    actors:{
        type:[String],
        required:[true , "Actors is required field!"]
    },
    coverImage:{
        type:[String],
        required:[true , "Cover Image is required field!"]
    },
    price:{
        type:Number,
        required:[true , "Cover Image is required field!"]
    }
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