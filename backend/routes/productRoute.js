const router= require("express").Router();
const productModel = require("../models/product");
const {allProducts,
     getOneProduct,
     createProduct,
     updateProduct,
     deleteProduct
}= require("../controller/productController")


router.get("/", allProducts);
router.get("/:id",  getOneProduct);
router.post("/add",  createProduct);
router.patch("/:id",  updateProduct );
router.delete("/:id", deleteProduct)




module.exports= router; 