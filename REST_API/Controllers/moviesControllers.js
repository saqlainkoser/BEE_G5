const express = require("express");
const fs=require("fs")
const app=express();

//To get data from client
app.use(express.json())


//Fetching all data from JSON
let movies=JSON.parse(fs.readFileSync("./data/movies.json"))

//getMovies
//createMovie
//getMovie
//updateMovie
//deleteMovie 

exports.getMovies = (req,res)=>{
    // console.log("Files Served");
    res.status(200).json({
        status:"success",
        data:{
            movies:movies
        }
    });

}

exports.createMovie = (req,res)=>{
    let id=movies[movies.length -1].id+1 ;
    let newMovie= Object.assign({id:id},req.body)
    movies.push(newMovie);

    // res.status(200).json(movies)
    //Appending on Current data 
    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"success",
            data:{
                movie:newMovie
            }
        })
    })

}

exports.updateMovie = (req,res)=>{
    const id=req.params.id *1 ;  // string - number   ==== 1 
    let movieToUpdate = movies.find(el=>el.id===id);  //{"id":1,"name":"Die Hard","releaseYear":2000,"duration":90} 
    //HADLING ERROR
    if(!movieToUpdate){
        return res.status(404).json({
            status:"fail",
            message:"Movie with ID " + id + "is not found"
        })
    }


    //Finding index of that data which we want to update
    let Index=movies.indexOf(movieToUpdate)  //0

    //TO update data inside single data 
    Object.assign(movieToUpdate,req.body)
    movies[Index]=movieToUpdate
    //TO override the file
    

    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieToUpdate
            }
        })
    })

}

exports.getMoive =  (req,res)=>{
    const id=req.params.id *1 ;
    let movie = movies.find(el=>el.id===id); 

    res.status(200).json({
        status : "success",
        data :{
            movie:movie
        }
    })

}

exports.deleteMovie = (req,res)=>{
    const id=req.params.id *1 ;
    let movieToDelete = movies.find(el=>el.id===id);
    let Index=movies.indexOf(movieToDelete)  ;
    movies.splice(Index,1);
    
    //Override the remaining data

    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:"Movie Deleted"
            }
        })
    })
}
