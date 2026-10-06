const productModel= require("../models/product");
const {productValidateSchema,
  productUpdateSchema,
paginationZodSchema}= require("../zodValidate/productValidate")
const allProducts= async (req, res)=>{
   

  const result= paginationZodSchema.safeParse(req.query);
      if(!result.success){
         return res.status(400).json({
          success: false,
          errors: result.error.issues
        });
        }
  
  const {page, limit}= result.data;
  console.log(`page==${page}  `);
    console.log(`limit==${limit}  `);
   
    try{
       const skip =  (page-1) *limit 
        const product= await productModel.find().skip(skip).limit(limit);
         if(!product){
          res.status(404).json({message:"no product availables"})


         }
         res.status(200).json({product,
            success:true});

    }catch(error){
     res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
    }
};

const  getOneProduct=  async (req,res)=>{

    const productId= req.params.id;

     try{
        const product= await productModel.findById(productId);
         if(!product){
          res.status(404).json({message:"no product availables with given id "})
         }
         res.status(200).json({product,
            success:true});

    }catch(error){
     res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
    }


};

const   createProduct= async (req,res)=>{
    
    try{
  const result= productValidateSchema.safeParse(req.body);
  if (!result.success) {
  return res.status(400).json({
    success: false,
    errors: result.error.issues
  });
}
 const product = await productModel.create(result.data);
     
     res.status(201).json({ 
        success: true,
         product
         });

    }catch(error){
         res.status(500).json({
      success: false,
      message: "failed to create/post product",
      error: error.message
    });
    }
}


const  updateProduct = async (req,res)=>{
         
  const productId =req.params.id;
     try{
      const  result = productUpdateSchema.safeParse(req.body);
      if(!result.success){
        return res.status(400).json({
    success: false,
    errors: result.error.issues
  });
      }
      const {data}= result;
    const product= await productModel.findByIdAndUpdate(
      productId,
      { $set: data},
      {new:true, runValidators:true}
    );
    
    if(!product){
       res.status(404).json({message:"no product availables with given id to update "})
    }
      return res.status(200).json({product,success:true});
    }catch(error){
          res.status(500).json({
      success: false,
      message: "failed to update product",
      error: error.message
    });
    }
};
  


 const    deleteProduct= async (req,res)=>{
   const productId= req.params.id;

    try{

      const product= await productModel.findByIdAndDelete(productId);
      
      if (!product) {
  return res.status(404).json({
    message: "Product not found"
  });
}

return res.status(200).json({
  message: "Product deleted successfully",
  product
});

    }catch(error){
          res.status(500).json({
      success: false,
      message: "failed to delete product",
      error: error.message
    });
    }
    
 }


 const productsCountTotal = async (req,res)=>{
  const totalDocs= await productModel.countDocuments();
  res.send({totalDocs,message:"total document  present", success: false})
 }

module.exports= {allProducts,
     getOneProduct,
     createProduct,
      updateProduct,
   deleteProduct,
   productsCountTotal

}