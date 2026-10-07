//array operators in mongo dbs
/*
$in  match any  value from array   (any1   is ok) 
$all   match all values  (must match all)
$elemMatch-  match  consition inside an array of objects  (like  products items  consitions)
$push- add element in array (duplicate  accepted)
$pull - remove an element 
$addToSet-  add in array  but without  duplicate (IF PRESENT  ALREADY NO ADD  IN ARRAY  SO NO DUPLICATE ACCEPT   ) 
$size    match  the length of array

1. FIND PRODUCT THAT CONTAIN BOTH  NEW AND LIMITED TAGS

 db.products.find({
  tags:{
  $all:["new","limited"]
  }
})

2.   find product   where tag has exactly 2 elemrnts

    db.products.find({
       tags:{$size:2}   
    })

3.product name is either  Fantastic Wooden Ball   Intelligent Steel Chips]
   db.products.find({
  name:{
    $in: ["Intelligent Steel Chips","Licensed Rubber Ball"]
  }
})



//  filter  and   change  
db.products.updateOne({price:18150.85},
{ $set:{
  name:"sujan Panthi",
  brand:"Terminator"},
  $rename:{
    price: "paisa"
  }
  
}
 );



 add     trending on a tags  where     fashon  category
 db.products.updateMany({category:"Fashion"},{
  $addToSet:{
    tags: "trending"
  }
})





db.orders.find( {
  items:{
  $elemMatch:{
    price:{$gt:30000},
    quantity:{$gte:2}
  }},
  paymentMethod:"UPI"
})



//find all orders  where any item price is greater thrn 40k
 db.orders.find(
   {
     items:{
   $elemMatch:{
   price:{$gt:40000}
     }
   }
   
 },{
items:{
   $elemMatch:{
   price:{$gt:40000}
     }
   }
   
 } 



  first is filter and 2nd is projection // without aggregate 



// remove verified  fields from all reviews




















*/
 