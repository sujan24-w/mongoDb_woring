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



const paginationZodSchema= z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10)

})


module.exports= {productValidateSchema,
    productUpdateSchema,
    paginationZodSchema

};
