const productModel= require("../models/product");
const {productValidateSchema,
  productUpdateSchema,
paginationZodSchema}= require("../zodValidate/productValidate")



const allProducts= async (req, res)=>{
   
  const  filter={};
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

    const category= result.data?.category;
    const brand= result.data?.brand;
    const tags= result.data?.tags;
    const ratings= result.data?.ratings;
     const minPrice = result.data?.minPrice;
     const maxPrice = result.data?.maxPrice;
    //minPrice, maxPrice,minRating, stock price sort 
    console.log(category,brand,tags,ratings);
    
    if(category){
     
      filter.category= {$regex: category, $options: "i"}
    };

     if(brand){
      filter.brand= {$regex: brand, $options: "i"} 
    };
    
    if(tags){
      filter.tags= {$regex: tags, $options: "i"}

      } 

if (minPrice !== undefined || maxPrice !== undefined) {
  filter.price = {};

  if (minPrice !== undefined) {
    filter.price.$gte = minPrice;
  }

  if (maxPrice !== undefined) {
    filter.price.$lte = maxPrice;
  }
}
    

   let  shortOption= {};

     if(ratings==="high"){
      shortOption={"ratings.average": -1}
     }
     if(ratings==="low"){
      shortOption={"ratings.average": 1}
     }



    console.log(filter);
    console.log(shortOption);
    
     
  //test
  // http://localhost:5000/api/products?minPrice=10000&maxPrice=50000&ratings=high&tags=limited&category=sport
    try{
       const skip =  (page-1) *limit 
        const product= await productModel.find(filter).sort(shortOption).skip(skip).limit(limit);
         if(product.length<=0){
          return  res.status(404).json({message:"no product availables"})


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