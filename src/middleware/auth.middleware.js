import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

async function isAuthnticate(req,res) {
    const{token} = req.cookie||req.headers["Authorization"].split(" ")[1]
    if(!token) return res.status(400).json({message:"no token found"})
        const decode = jwt.verify(token,process.env.SECRET_TOKEN_KEY)
        if(decode){
            const user = await User.findById(decode.userId)
            if(!user)return res.status(404).json({message:"Invalid Token or expired token"})
                
        }
}