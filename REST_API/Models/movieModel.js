//nodejs - mongodb -> mongoose
//importing library for mongodb
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:"./config.env"}) // to connect config
const fs = require('fs');


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
    },
    createdBy : String
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

//Virtual Field
movieSchema.virtual('durationInHours').get(function(){
    return this.duration/60 ;
})

//Document Middleware
//isse ppehle doc pre mid
// save
//isse baad doc pst mid


movieSchema.pre('save',function(next){
    this.createdBy = "Shaan";
    next();
})

movieSchema.post('save',function(doc,next){
const content = `A new movie document with name ${doc.name} has been 
created by ${doc.createdBy}`;
fs.writeFileSync('./Log/log.txt',content,{flag:'a'},(err)=>{
    console.log(err.message);
})
 next();   
})


// Query Middle
movieSchema.pre(/^find/,function(next){
    this.find({releaseYear :{$lte:'2024'}})
    next()
})


//Aggregation Middleware
movieSchema.pre('aggregate',function(next){
    console.log(this.pipeline().unshift(
        {$match:{releaseYear:{$lte :2024}}}
    ))
    next();
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