// import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import mongoose, { Schema } from "mongoose";

const feedbackSchema=new mongoose.Schema({
   user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
  product:{
    type:Schema.Types.ObjectId,
    ref:"Product",
    required:true
  }  ,
  rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
},
    comment:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Feedback=mongoose.model('Feedback',feedbackSchema)
export default Feedback;