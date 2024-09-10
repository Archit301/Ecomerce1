import express, { Router } from "express"
import { createaddress } from "../controllers/address_controller.js";
import { Categoryproduct, CreateProduct, deleteproduct, discountproduct, editProduct, getallproduct, getproductbyid, getProductsInSameCategory, latestproduct, searchproduct, sortcategoryproduct, sortlatestproduct } from "../controllers/product_controlller.js";

const router=express.Router();


router.post('/create',CreateProduct)
router.post('/edit/:id',editProduct)
router.post('/delete/:id',deleteproduct)
router.get('/getallproduct',getallproduct)
router.post('/category',Categoryproduct)
router.get('/getproductbyid/:id',getproductbyid)
router.get('/latest',latestproduct)
router.get('/discount',discountproduct)
router.post('/sortcategoryproduct',sortcategoryproduct)
router.post('/sortlatestproduct',sortlatestproduct)
router.get('/get',searchproduct)
router.get('/getProductsInSameCategory/:id',getProductsInSameCategory)

export default router