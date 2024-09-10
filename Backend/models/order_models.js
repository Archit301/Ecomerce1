import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
  item:{
  type:[Schema.Types.Mixed],
  required:true
  },
  address:{
    type:[Schema.Types.Mixed],
    required:true  
  },
  purchase:{
    
  }
  }, { timestamps: true });
  
  const Order= mongoose.model('Order', orderSchema);
  export default Order