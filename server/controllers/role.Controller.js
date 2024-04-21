import Role from "../models/rolemodel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== " ") {
      const newRole = new Role(req.body);
      await newRole.save();
      return next(CreateSuccess(200, "Role is created", newRole));
    } else {
      return next(CreateError(402, "Bad request"));
    }
  } catch (error) {
    return next(CreateError(500, "Internel Server error"));
  }
};

export const updateRole = async (req, res, next) => {
  const { role } = req.body;
  const { id } = req.params;
  try {
    const updateRole = await Role.findByIdAndUpdate(
      { _id: id },
      { role },
      { new: true }
      );
      return next(CreateSuccess(200, "Role is updated", updateRole));
    
  } catch (error) {
    return next(CreateError(500, "Internel Server error"));
  }
};

export const getAllroles = async (req, res, next) => {
  try {
      const roles = await Role.find();
      return next(CreateSuccess(200, "all roles", roles));
   
  } catch (error) {
    return next(CreateError(500, "Internel Server error"));
  }
};

export const deleteRole = async (req, res, next) => {
  const { id } = req.params;
  try {
      const removedRole = await Role.findByIdAndDelete({ _id: id });
      return next(CreateSuccess(200, "Role is deleted", removedRole));
   
  } catch (error) {
    return next(CreateError(500, "Internel Server error"));
  }
};
