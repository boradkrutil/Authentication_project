const express = require("express")
const ConnectDB = require("./Connection")
const userController = require("./UserController/UserController")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

app.use(express.json())


ConnectDB()

app.post("/reuser", userController.RegisterUser)
app.post("/login", userController.UserLogin)
app.get("/", (req, res)=> {
    res.send("Hello World")
})
app.listen(5500, (req, res)=> {
    console.log("Server Started");
})