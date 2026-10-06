const mongoose= require("mongoose");


const  productSchema= new mongoose.Schema({
   name: String,
   brand: String,
   category: String,
   price: Number,
   stock: Number,
   tags: [String],

   ratings: {
    average: Number,
    count: Number
  },

  },{ timestamps: true});

const productModel = mongoose.model("products",productSchema);
module.exports=productModel;