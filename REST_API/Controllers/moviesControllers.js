const express = require("express");
const fs=require("fs")
const app=express();

//To get data from client
// app.use(express.json())
// const movie = require('./../Models/movieModel.js');


const Movie = require("./../Models/movieModel.js");
const Apifeatures = require("../Utils/ApiFeatures.js");

exports.getHighestRated = (req,res,next) =>{
    req.query.limit= '5',
    req.query.sort = '-ratings';
    next();
}


exports.getMovies =async (req,res)=>{
 try{
    //Calling ApiFeatures 
    const features = new Apifeatures(Movie.find(),req.query)
    .filter().sort().limitFields().paginate()
    
    let movies = await features.query;


    //FILTER
    //Movie is Model of mongodb maded from schema
    // console.log(req.query);
    // console.log({...req.query});
    // const movies=await Movie.find({ duration: { $gte: '130' } })
    
    //Second Way
   

    

    // //Limiting Fields
    // if(req.query.fields){
    //    const fields =  req.query.fields.split(",").join(" ");
    //    //"name duration ratings"
    //    console.log(req.query.fields.split(",").join(" "));
    //    query = query.select(fields);
    // }

    // //Pagination
    // const page=req.query.page*1 || 1 ;
    // const limit=req.query.limit*1 || 10 ;

    // // p-0 s-0 , p-1 s-10 d- 11-20 , p-2 s-20 d 21-30
    // const skip = (page -1)* limit;

    // query = query.skip(skip).limit(limit)
    
    // let movies= await query;


    res.status(200).json({
        status:"success",
        length:movies.length,
        data:{
            movies:movies
        }
    })
 }catch(err){
    res.status(400).json({
        status:"fail",
        message:err.message
    })
 }

}

exports.createMovie =async (req,res)=>{
    try{
        const movie =await Movie.create(req.body)
        // console.log(movie);
        res.status(201).json({
            status:"success",
            data:{
                movie:movie
            }
        })
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}

exports.updateMovie =async (req,res)=>{
  try{
    const updateMovie= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true ,runValidators:true})
    res.status(200).json({
        status:"success",
        data:{
            movie:updateMovie
        }
    })

  }catch(err){
    res.status(400).json({
        status:"fail",
        message:err.message
    })
  }

}

exports.getMoive =async (req,res)=>{
   try{
    const movie= await Movie.find({_id:req.params.id});
    res.status(200).json({
        status:"success",
        data:{
            movie:movie
        }
    })
   }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
   }
}

exports.deleteMovie = (req,res)=>{
   
}



exports.getMoviesStats =async (req,res) =>{
    try{
        //Aggregation function is used to take min max average sum etc
        const stats = await Movie.aggregate([
            //STAGE 1 
            {$match:{ratings:{$gte :4}}},

            //STAGE 2
            {$group : {
                _id :'$releaseYear',
                avgRating:{$avg : '$ratings'},
                avgPrice:{$avg:'$price'},
                minPrice:{$min:'$price'},
                maxPrice:{$max:'$price'},
                totalPrice:{$sum:'$price'},
                movieCount:{$sum:1}
            }},

            //STAGE 3
            {$sort :{minPrice:1}}

        ])

        res.status(200).json({
            status:"success",
            count:stats.length,
            data:{
                stats
            }
        })



    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}


//Movies by Genres 
exports.getMoviesByGenres = async(req,res) =>{
    try{
        const movies = await Movie.aggregate([
            //STAGE 1
            {$unwind : "$genres"},
            //STAGE 2
            {$group : {
                _id:"$genres",
                movieCount:{$sum : 1},
                movies:{$push : '$name'}
            }},
            //STAGE 3
            {$addFields :{genres: "$_id"}},
            //STAGE 4
            {$project:{_id:0}}
        ])
        
        res.status(200).json({
            status:"success",
            count:movies.length,
            data:{
                movies
            }
        })


        
    }catch(err){
        res.status(400).json({
            status:"fail",
            message:err.message
        })
    }
}