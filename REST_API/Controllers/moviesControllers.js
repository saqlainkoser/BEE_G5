const express = require("express");
const fs=require("fs")
const app=express();

//To get data from client
// app.use(express.json())
// const movie = require('./../Models/movieModel.js');
const Movie = require("./../Models/movieModel.js");

exports.getMovies = (req,res)=>{
 
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

exports.updateMovie = (req,res)=>{
  

}

exports.getMoive =  (req,res)=>{
   
}

exports.deleteMovie = (req,res)=>{
   
}
