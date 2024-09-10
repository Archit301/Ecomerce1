import express from "express"
import { create, deleteblog, getblogbyid, getlatestblog, updateblog } from "../controllers/blog_controller.js";

const router=express.Router()


router.post('/create',create);
router.post('/update',updateblog)
router.post('/deletebyid',deleteblog)
router.get('/getlatest',getlatestblog)
router.get('/getblogbyid/:id',getblogbyid)


export default router