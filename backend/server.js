const express= require("express");
const connectDB = require("./config/db");
const productRoute= require("./routes/productRoute")
const pathNotFound = require("./middleware/pathNotFound");
require("dotenv").config();

const port= process.env.PORT || 5000;

const app= express();
connectDB();

app.use(express.json());




app.use("/api/products",productRoute);

app.get("/",(req,res)=>{
    res.send('server started successfully ');
    
})

app.use(pathNotFound)


app.listen(port, ()=>{
    console.log(`server run at  http://localhost:${port}`);
    
})
 