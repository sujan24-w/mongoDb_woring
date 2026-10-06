const {z}= require("zod");

const productValidateSchema = z.object({
   name:z.string().min(3).max(100),
    brand:z.string().min(3).max(100),
    category:z.string().min(3).max(100),
    stock:z.number().int().min(0),
    price:z.number().positive(),
    tags: z.array(z.string()),
   

});

const   productUpdateSchema= productValidateSchema.partial();

module.exports= {productValidateSchema,
    productUpdateSchema,

};
