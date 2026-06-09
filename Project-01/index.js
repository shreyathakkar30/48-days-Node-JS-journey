const express = require("express");
const {connectMongoDB} = require("./connection");
const userRouter = require('./routes/user')
const {logReqRes}= require("./Middlewares")
const app = express();
const port = 8000;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() => console.log("MongoDB connected"));

// Middleware -plugin
app.use(express.urlencoded({ extended: false}))

app.use(logReqRes("log.txt"))

app.use("/api/users", userRouter);

app.listen(port, () => console.log(`Server Started at PORT ${port}`))