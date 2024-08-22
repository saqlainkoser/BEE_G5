//REST API using express

const authRouter = require('./Routes/authRouter.js')

const express=require("express");
const app=express();
const moiveRouter = require('./Routes/moviesRouter.js')
//To get data from client
app.use(express.json())

app.use("/api/v1/movies",moiveRouter);
app.use("/api/v1/users",authRouter);

module.exports = app;