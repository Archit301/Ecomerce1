import mongoose , { Schema } from "mongoose";


const wishlistSchema=mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        require:true
    },
    note:{
        type:String,
    }
},{timestamps:true})


const Wishlist=mongoose.model("Wishlist",wishlistSchema)
export default Wishlist