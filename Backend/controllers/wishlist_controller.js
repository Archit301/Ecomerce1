import Wishlist from "../models/wishlist_model.js";
import { io } from "../index.js";


export const createWishlist=async(req,res)=>{
    try {
  const created=await new Wishlist(req.body)
        await created.save()
        io.emit("wishlistUpdated", { action: "create", data: created });
        res.status(201).json(created) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error adding product to wishlist, please try again later"})     
    }
}


export const getbyuserid=async(req,res)=>{
    const {id}=req.params
    try {
        const result=await Wishlist.find({user:id}).populate({path:"product"});
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching your wishlist, please try again later"})
    }
}

export const updatebyid=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Wishlist.findByIdAndUpdate(id,req.body,{new:true}).populate("product")
        io.emit("wishlistUpdated", { action: "update", data: updated });
        res.status(200).json(updated)   
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating your wishlist, please try again later"})
    }
}


export const deletebyid=async(req,res)=>{
    const { user, product } = req.body;
    try {
        const deleted=await await Wishlist.deleteOne({
            user,      // Replace userId with the actual user ID value
            product // Replace productId with the actual product ID value
          });
        io.emit("wishlistUpdated", { action: "delete", data: deleted });
        return res.status(200).json("Succesfully remove the product from wishlist")
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting that product from wishlist, please try again later"})
    }
}