import Address from "../models/address_model.js";
import { io } from '../index.js';

export const createaddress=async(req,res)=>{
    try {
        const created=new Address(req.body)
        await created.save()
        io.emit('addressCreated', created);
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Error adding address, please trying again later'})
    }  
}


export const getByUserId=async(req,res)=>{
    try {
        const {id}=req.params
        const results=await Address.find({user:id})
        res.status(200).json(results)
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching addresses, please try again later'})
    }
}


export const updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Address.findByIdAndUpdate(id,req.body,{new:true})
        console.log(updated);
        io.emit('addressUpdated', updated);
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error updating address, please try again later'})
    }
}

export const deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Address.findByIdAndDelete(id)
        io.emit('addressDeleted', id);
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error deleting address, please try again later'})
    }
}