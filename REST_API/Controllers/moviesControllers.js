const express = require("express");
const fs=require("fs")
const app=express();

//To get data from client
// app.use(express.json())
// const movie = require('./../Models/movieModel.js');
const Movie = require("./../Models/movieModel.js");

exports.getMovies =async (req,res)=>{
 try{
    //Movie is Model of mongodb maded from schema
    const movies=await Movie.find()

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
