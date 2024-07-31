const express=require("express");

const movieRouter = express.Router()

const moviesControllers = require("./../Controllers/moviesControllers.js")

movieRouter.route("/")
.get(moviesControllers.getMovies)
.post(moviesControllers.createMovie)

movieRouter.route("/:id")
.get(moviesControllers.getMoive)
.patch(moviesControllers.updateMovie)
.delete(moviesControllers.deleteMovie)

module.exports = movieRouter ;
