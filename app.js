const express = require("express")
const path = require("path")
const cors = require("cors")
const userRouter = require("./routers/userRouter")
const toyRouter = require("./routers/toyRouter")
// const mongoose = require("mongoose")

const app = express();

app.use(express.json());

app.use(cors())
app.use(express.static(path.join(__dirname,"public")))

app.use('/api/v1/users',userRouter)
app.use('/api/v1/toys',toyRouter)

app.use((error, req, res, next) => {
    console.log("error from the app=>>>>>", error);
    return res.status(400).send({ msg: error.message });
})
console.log("app is runing");
module.exports.app = app;