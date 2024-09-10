import Cart from "../models/cart_models.js";
import { io } from "../index.js";




export const createorder=async(req,res)=>{
    try {
        const created=await new Cart(req.body).populate({path:"product"});
        await created.save()
        io.emit("cartUpdated", created);
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding product to cart, please trying again later'})
    }
}


export const getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const result = await Cart.find({ user: id }).populate({path:"product"});

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

export const getbuuserandproduct=async(req,res)=>{
    const {userId,productId}=req.body
    try {
        const {id}=req.params
        const result = await Cart.find({ user: userId, product: productId }).populate({path:"product"});
         if(result.length>0){
        res.status(200).json("Item added to cart already")
         }
         else{
            res.status(200).json("Item doesn't added to cart ")     
         }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching cart items, please trying again later'})
    }
}

export const updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product"});
        io.emit("cartUpdated", updated);
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error updating cart items, please trying again later'})
    }
}

export const deleteById=async(req,res)=>{
    try {
        const { user, product } = req.body;
        const deleted=await Cart.deleteOne({
            user,      // Replace userId with the actual user ID value
            product // Replace productId with the actual product ID value
          });
        io.emit("cartCleared", { user });
        res.status(200).json("Succesfully remove the product from cart")
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error deleting cart item, please trying again later'})
    }
}


export const deletebyuserid=async(req,res)=>{
    try {
      
        await Cart.deleteMany({user:id}).populate({path:"product"})
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Some Error occured while resetting your cart"})    
    }
}


export const count=async(req,res,next)=>{
    const {id}=req.params
    try {
        const count=await Cart.countDocuments({ user:id})
        res.status(200).json({ count});
    } catch (error) {
      next(error)  
    }
}