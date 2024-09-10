import Feedback from "../models/feedback_model.js";
import { io } from '../index.js';

export const createfeedback=async(req,res)=>{
    try {

        const created=await new Feedback(req.body).populate({path:'user',select:"-password"})
        await created.save()
        io.emit('feedbackCreated', created);
        res.status(201).json(created)   
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error posting review, please trying again later'})   
    }
}

export const getbyproductid=async(req,res)=>{
    try {
        const {id}=req.params    
        const totalDocs=await Feedback.find({product:id}).countDocuments().exec()
        const result=await Feedback.find({product:id}).populate('user').exec()

        res.set("X-total-Count",totalDocs)
        res.status(200).json(result)    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting reviews for this product, please try again later'})    
    }
}


export const  updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Feedback.findByIdAndUpdate(id,req.body,{new:true}).populate('user')
        io.emit('feedbackUpdated', updated);
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating review, please try again later'})
    }
}

export const deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Feedback.findByIdAndDelete(id)
        io.emit('feedbackDeleted', id); 
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting review, please try again later'})
    }
}