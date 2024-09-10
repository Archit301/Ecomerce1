import express from "express"
import { count, createorder, deleteById, getbuuserandproduct, getByUserId, updateById } from "../controllers/cart_controller.js";

const router=express.Router();


router.post('/create',createorder);
router.get('/getByUserId/:id',getByUserId)
router.post('/getbuuserandproduct',getbuuserandproduct)
router.post('/updateById/:id',updateById)
router.post('/deleteById',deleteById)
router.get('/count/:id',count)



export default router