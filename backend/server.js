const express= require("express");
const connectDB = require("./config/db");
const productRoute= require("./routes/productRoute")
require("dotenv").config();

const port= process.env.PORT || 5000;

const app= express();
connectDB();

app.use(express.json());




app.use("/api/products",productRoute);

//  app.use("/",(req,res)=>{
//     res.json({message:'server started successfully ', success:true});

// })



app.listen(port, ()=>{
    console.log(`server run at  https://localhost:${port}`);
    
})
 