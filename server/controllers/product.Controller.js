import Product from "../models/Productmodel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

// add product

export const addProduct = async (req, res, next) => {
  const { Id, productName, image, price, category, description } = req.body;

  try {
    const newProduct = new Product({
      Id,
      productName,
      image,
      price,
      category,
      description,
    });

    await newProduct.save();
    return next(CreateSuccess(200, "Product Add Successfully", newProduct));
  } catch (error) {
    return next(CreateError(500, "Internal Server  Error"));
  }
};

//get products

export const getProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    return next(CreateSuccess(200, " All Products ", allProducts));
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
};

//get single product

export const getSingleProduct = async (req, res, next) => {
  
  const { id } = req.params
  
  try {

    const singleProduct = await Product.findOne({ _id:id })
    return next(CreateSuccess(200,"single product",singleProduct))
    
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
  
}

//edit product

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { Id, productName, image, price, category, description } = req.body;
  // const file = req.file ? req.file.filename : image;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { Id, productName, image, price, category, description },
      { new: true }
    );

    await updateProduct.save();

    return next(
      CreateSuccess(200, "Product updated Successfully", updateProduct)
    );
  } catch (error) {
    console.log(error);
    return next(CreateError(500, "Internal Server Error"));
  }
};

//delete product

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const removeProduct = await Product.findByIdAndDelete({ _id: id });
    return next(
      CreateSuccess(200, "Product deleted successfully", removeProduct)
    );
  } catch (error) {
    return next(CreateError(500, "Internal Server Error"));
  }
  
};
