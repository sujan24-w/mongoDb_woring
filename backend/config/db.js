const mongoose= require("mongoose");
require("dotenv").config();
const dbURL= process.env.MONGO_URI;
const connectDB= async ()=>{

    try{
       await  mongoose.connect(dbURL)

        console.log("dbConnected successfully");
        
    }catch(error){
        console.log(error.message);
        process.exit(1);
        
    }
    
}

module.exports= connectDB;