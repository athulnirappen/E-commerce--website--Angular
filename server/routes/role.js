import express from 'express'
import { createRole, deleteRole, getAllroles, updateRole } from '../controllers/role.Controller.js'

const router = express.Router()

router.post('/create', createRole)
router.get('/get-roles', getAllroles)
router.put('/update-role/:id', updateRole)
router.delete('/delete-role/:id',deleteRole)






export default router