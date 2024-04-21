import User from "../models/usermodel.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

export const getAllUsers = async (req, res, next) => {
    
    try {

        const users = await User.find()
        return next(CreateSuccess(200,'Users get successfully',users))
        
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
        
    }
    
}

export const deleteUser = async (req, res, next) => {
    
    const { id } = req.params
    
    try {

        const deleteUser = await User.findByIdAndDelete({ _id: id })
        return next(CreateSuccess(200,'User deleted Successfully',deleteUser))
        
    } catch (error) {
        return next(CreateError(500, "Internal server error"));
    }
    
}