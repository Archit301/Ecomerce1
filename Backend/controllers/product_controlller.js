import Product from "../models/Product_models.js";
import mongoose from 'mongoose';
import { io } from '../index.js';


export const CreateProduct=async(req,res,next)=>{
    //const {name,description,category,price,countInStock,status,userId,avatar}=req.body;
    try {
    // const product= new Product({name,description,category,price,countInStock,status,userId,avatar})
    const product= new Product(req.body)
    await product.save()
    io.emit('productCreated', product); 
    res.status(201).json("Product created Successfully")
    } catch (error) {
        next(error);
    }
}

export const editProduct=async(req,res)=>{
  const { id } = req.params;
  console.log('Received ID:', id);
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
      const updatedproduct=await Product.findByIdAndUpdate(
        id, 
        req.body, 
        {
          new: true,          // Return the updated product
          runValidators: true // Run schema validations
        }
      );
    if (!updatedproduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      io.emit('productUpdated', updatedproduct); 
      //const { password, ...rest } = updatedUser._doc;  
      res.status(200).json(updatedproduct);
      } catch (error) {
        console.error('Error updating product:', error.message); // Log the error message
        console.error('Full error object:', error); // Log the full error object for more details
        res.status(500).json({ message: 'Error updating product', error: error.message });
      }
    }


    export const deleteproduct=async(req,res,next)=>{
        const {id}=req.params;
      try{
     if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: 'Invalid ID format' });
     }
    const user = await   Product.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const result = await  Product.findByIdAndDelete(id);
    io.emit('productDeleted', id);
    res.status(200).json({ message: 'Product has been deleted' });
} catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
}

    }


export const getallproduct=async(req,res)=>{
  try { 
    const product=await Product.find();
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}


export  const Categoryproduct=async(req,res)=>{
  console.log(req.body)
try {
  const product=await Product.find(req.body);
  await  res.status(200).json(product)
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
}

export const getproductbyid=async(req,res)=>{
  const {id}=req.params;
  console.log(id)
  var _id=id;
  try {
    const product=await Product.findById(id);
    await  res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
} 

// ////////////////////////////////      sort and filter////////////////////////////

export const latestproduct=async(req,res)=>{
  try {
    const product=await Product.find()
                               .sort({createdAt:-1})
                               .limit(10)
    await res.status(200).json(product)             
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const discountproduct=async(req,res)=>{
  try {
    const product=await Product.find({discountproduct: { $ne: 0 }})
                               .limit(10)
    if(product)   
  {
   await res.status(200).json(product)        
   }                 
    else{
      await res.status(200).json("No Discount product available") 
    }               
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const sortcategoryproduct=async(req,res)=>{
const {category,filter}=req.body;
try { 
  if(filter=="price-low-high"){
    if(category!=="all"){
    const product=await Product.find({category:category})
                               .sort({price:1})
    await res.status(200).json(product)
    }
    else{
      const product=await Product.find()
                                 .sort({price:1})
      await res.status(200).json(product)
    }
                              }
  else {
    if(category!=="all"){
    const product=await Product.find({category:category})
                               .sort({price:-1})
    await res.status(200).json(product)
  }    
  else{
    const product=await Product.find()
    .sort({price:-1})
     await res.status(200).json(product)
  }  
} 
}catch (error) {
  res.status(500).json({ message: 'Server error' });
}
}

export const sortlatestproduct=async(req,res)=>{
  const {category}=req.body;
  // console.log(category)
  try {
    if(category!=="all"){
      const product=await Product.find({category:category})
                                 .sort({createdAt:-1})
      await res.status(200).json(product)
      }
      else{
        const product=await Product.find()
                                   .sort({createdAt:-1})
        await res.status(200).json(product)    
      }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}




// ////////////////////////// search/////////////////////

export const searchproduct=async(req,res,next)=>{
  try {
  const limit=parseInt(req.query.limit)||0
  const startIndex = parseInt(req.query.startIndex) || 0;
  const searchTerm = req.query.searchTerm || '';
  const sort = req.query.sort || 'createdAt';
  const order = req.query.order === 'asc' ? 1 : -1; // Ensure order is either 1 or -1
  const category = req.query.category; 

  const query = {
    name: { $regex: searchTerm, $options: 'i' }
  }
  if (category && ['Electronics','Clothing','Accessories','Sports','Others'].includes(category)) {
    query.category = category;
  }

  const product=await Product.find(query)
                             .sort({ [sort]: order })
                             .limit(limit)
                            .skip(startIndex);
return res.status(200).json(tickets);
  } catch (error) {
    next(error); 
  }
}

// export const buyproduct=async(req,res,next)=>{
//     const { productId, userId,paymentId } = req.body;
// //   console.log(ticketId);
//   // console.log("Payment id wahs",paymentId)
//     try {
//       // Find the ticket
//       const product = await Product.findById(productIdId)
  
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
//       if(product.status==='expired'||product.status==='sold out'){
//         return res.status(400).json({ error: 'This Product is currently is unavailable' });;
//       }
  
//       // Check if the user has already purchased the ticket
//       if (product.purchasedBy.includes(userId)) {
//         return res.status(400).json({ error: 'You have already purchased this product' });
//       }
  
//       // Check if seats are available
//       if (product.countInStock <= 0) {
//         return res.status(400).json({ error: 'No product available' });
//       }
   
//       const purchase = new Purchase({ ticketId, userId,paymentId });
//       await purchase.save();
  
//       // Update ticket to decrease seat count
//       product.countInStock -= 1;
//       if(product.countInStock==0){
//         product.status="sold out"
//       }
//        product.purchasedBy.push(purchase._id);
//       await product.save();
   
//       io.emit('productPurchased', { productId, userId });
//       res.status(200).send('Product purchased successfully.');
//     } catch (error) {
//       console.log(error)
//       res.status(500).json({ error: 'Server error' });
//     }
// }


// /////////////  related product /////////////

export const getProductsInSameCategory=async(req,res,next)=>{
  console.log(req.params);
  const { id } = req.params; // Destructure id from req.params
  console.log(id);
  try {
    const product = await Product.findById(id).select('category');    
    if (!product) {
   return   res.status(200).json("Product not found")
    }
    const productsInCategory = await Product.find({
      category: product.category,
      _id: { $ne: id } // Exclude the product with the provided id
    }).limit(4);
    res.status(200).json(productsInCategory)
  } catch (error) {
    next(error)
  }
}