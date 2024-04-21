import express from 'express'
import { Login, register, registerAdmin, resetPassword, sendEmail } from '../controllers/auth.Controller.js'

const router = express.Router()


router.post('/register', register)
router.post('/login', Login)
//admin register
router.post('/register-admin', registerAdmin)

//send email
router.post("/send-email", sendEmail);

//reset password
router.post("/reset-password", resetPassword);



export default router