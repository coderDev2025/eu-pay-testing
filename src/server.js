import express from "express"
import cors from "cors"
import userRoute from "./routes/user.routes.js"

const app = express()


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    maxAge:360000,
    credentials:true
}))

app.use("/api/user",userRoute)


app.use((err,req,res,next)=>{
   if(err){
    const msg = err.message|| " error while completing the request"
    return res.status(500).json({message:msg})
   }
   else{
    next()
   }
})

export default app;