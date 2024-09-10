import express from "express"
import { createWishlist, deletebyid, getbyuserid, updatebyid } from "../controllers/wishlist_controller.js"



const router=express.Router()

router.post('/create',createWishlist);
router.get('/getbyuserid/:id',getbyuserid)
router.post('/updatebyid/:id',updatebyid)
router.post('/deletebyid',deletebyid)



export default router