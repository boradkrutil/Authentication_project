const { default: mongoose, connect } = require("mongoose");

async function ConnectDB(){
    try {
        await mongoose.connect("mongodb+srv://krutilborad2020:Krutil1230@cluster0.zvzj0ir.mongodb.net/")
        console.log("connect db");
    } catch (error) {
        console.log(error);
       console.log("db connection error");   
    }
}

module.exports = ConnectDB