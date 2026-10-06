const router= require("express").Router();
const productModel = require("../models/product");
const {allProducts,
     getOneProduct,
     createProduct,
     updateProduct,
     deleteProduct,
     productsCountTotal
}= require("../controller/productController")


router.get("/", allProducts); // products?page=1&limit=10
router.get("/:id",  getOneProduct);
router.post("/add",  createProduct);
router.patch("/:id",  updateProduct );
router.delete("/:id", deleteProduct)

router.get("/productCount", productsCountTotal);




module.exports= router; 