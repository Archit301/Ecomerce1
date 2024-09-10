import express from "express"
import { createfeedback, deleteById, getbyproductid, updateById } from "../controllers/review_controller.js";



const router=express.Router();


router.post('/create',createfeedback);
router.get('/getbyproductid/:id',getbyproductid)
router.post('/updateById/:id',updateById)
router.delete('/deleteById/:id',deleteById)



export default router