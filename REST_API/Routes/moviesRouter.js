const express=require("express");

const movieRouter = express.Router()

const moviesControllers = require("./../Controllers/moviesControllers.js")

/// For Aliasing Route for top 5 movies
movieRouter.route('/higest-reated').get(moviesControllers.getHighestRated,moviesControllers.getMovies)

movieRouter.route("/")
.get(moviesControllers.getMovies)
.post(moviesControllers.createMovie)
    
movieRouter.route("/:id")
.get(moviesControllers.getMoive)
.patch(moviesControllers.updateMovie)
.delete(moviesControllers.deleteMovie)

module.exports = movieRouter ;
