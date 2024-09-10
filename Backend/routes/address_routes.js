import express from "express"
import { createaddress, deleteById, getByUserId, updateById } from "../controllers/address_controller.js";


const router=express.Router();


router.post('/create',createaddress);
router.get('/getByUserId/:id',getByUserId)
router.post('/updateById/:id',updateById)
router.delete('/deleteById/:id',deleteById)



export default router