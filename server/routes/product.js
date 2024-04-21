import express from 'express'
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../controllers/product.Controller.js'
// import multerConfig from '../utils/multerMiddleware.js'



const router = express.Router()


router.post('/add-product', addProduct)
router.get('/get-products', getProducts)
router.get('/get-single-product/:id',getSingleProduct)
router.put("/edit-product/:id",  updateProduct);
router.delete('/delete-product/:id',deleteProduct)




export default router