const bcrypt = require("bcrypt");
const userModel = require("../UserModel/UserModel");
const jwt = require("jsonwebtoken")

class UserController{

    async RegisterUser(req, res){
        try {
            const {password} = req.body
            if(!password) return res.status(400).send({message:"Missing Dependency"})
            const enpassword = bcrypt.hashSync(password, 8)  
            if(!enpassword) return res.status(400).send({message:"Missing Dependency (password)"})
            req.body.password = enpassword
           let result = await userModel.CreateUser(req.body)
            if(!result) return  res.status(500).send({message:"Somthing Wemt wrong"}) 
             result = result._doc
             delete result.password  
            let token = jwt.sign(result, process.env.JWT_SECRET ,{
                expiresIn:"30d"
            })
            if(!token) return  res.status(500).send({message:"Somthing Wemt wrong"}) 
            return res.status(200).send({message:"Success", data:result, token :token}) 
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Servre error"})
        }
    }


    async UserLogin(req,res){
        try {
            const{email,password} = req.body
            if(!email || !password)return res.status(4000).send({message:"Missing Dependency"})
            let result = await userModel.model.findOne({email:email})  
            if(!result) return res.status(500).send({message:"Invalid Email"})
             result = result._doc
            if(!bcrypt.compareSync(password, result.password)){
                return res.status(500).send({message:"password is incorrecr"})
            }
            delete result.password
            const token = jwt.sign(result, process.env.JWT_SECRET, {
                expiresIn:"30d"
            })
            result ={
                firstname : result.firstname,
                lastname : result.lastname,
                email: result.email
            }
            if(!token)return res.status(500).send({message:"Somthing Went Wrong"})
            return res.status(200).send({message:"Success", userinfo:result, token :token})    

        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal Servre error"})
        }
    }
}


const userController = new UserController()
module.exports = userController