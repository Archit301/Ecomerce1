import Order from "../models/order_models.js";


export const createorder=async(req,res)=>{
    try {
        const created=new Order(req.body)
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error creating an order, please trying again later'})  
    }
}


export const getbyuserid=async(req,res)=>{
    try {
        const {id}=req.params
        const results=await Order.find({user:id})
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error fetching orders, please trying again later'})   
    }
}


export const getall=async(req,res)=>{
    try {
        const results=await Order.find()
        res.status(200).json(results)  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching orders, please try again later'})   
    }
}



export const updatebyid=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Order.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating order, please try again later'})
    }
}