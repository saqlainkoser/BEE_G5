//REST API using express

const express=require("express");
const app=express();
const moiveRouter = require('./Routes/moviesRouter.js')
//To get data from client
app.use(express.json())

app.use("/api/v1/movies",moiveRouter);

module.exports = app;