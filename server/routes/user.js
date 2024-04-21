import express from 'express'
import { deleteUser, getAllUsers } from '../controllers/user.Controller.js'



const router = express.Router()

router.get("/get-users",  getAllUsers);
router.delete("/delete-user/:id", deleteUser);







export default router