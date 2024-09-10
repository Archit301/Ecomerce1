import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    brand:{
        type:String,
        required:true
    },
    discountPercentage: {
        type: Number,
        default: -1,
    },
    status:{
        type:String,
        enum:['available','sold out','expired'],
        default:'available',
    },
    category:{
      type:String,
      enum:['Electronics','Clothing','Accessories','Sports','Others'],
      required:true
    },
    userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'User',
   required:true
    },
    avatar:{
        type:Array,
      //  required:true
    },
    feedback:[
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback'
  }
    ],
},{timestamps:true})


const Product=mongoose.model('Product',productSchema)
export default Product