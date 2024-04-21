import Role from "../models/rolemodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/usermodel.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import Token from "../models/Tokenmodel.js";
import nodemailer from 'nodemailer'




//user register
export const register = async (req, res, next) => {
  const role = await Role.find({ role: "User" });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    roles: role,
  });
  await newUser.save();
  return next(CreateSuccess(200, "User registered successfully", newUser));
};


//user login

export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "role"
    );

    const { roles } = user;
    if (!user) {
      return next(CreateError(402, "User is not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(CreateError(401, "Password incorrect"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: roles },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 200,
      message: "Login success!!",
      user,
    });
  } catch (error) {
    return next(CreateError(500, "Internal Server error"));
  }
};


//registr admin

export const registerAdmin = async (req, res, next) => {
  const role = await Role.find({});
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
    isAdmin: true,
    roles: role,
  });

  await newUser.save();
  return next(CreateSuccess(200, "Admin registered Successfully"));
};




//send email

export const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });

  if (!user) {
    return next(CreateError(404, "User not found to reset the email"));
  }

  const payload = {
    email: user.email,
  };

  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiryTime,
  });
  const newToken = new Token({
    userId: user._id,
    token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "athulthomas001798@gmail.com",
      pass: "alymncmtycaxsnfd ",
    },
  });

  let mailDetails = {
    from: "athulthomas001798@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
    <html>
    <head>
    <title>Password Reset Request</title>
    
    </head>
    <body>
    <h1>Password Reset Request</h1>
    <p>Dear ${user.username},</p>
    <p>We have received a request to reset password in your account in our website.To complete the reset process please click on the button below </p>
    <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color:#4CAF50;color:white;padding:14px 20px; border:none; cursor:pointer;border-radius:4px;">Reset Password</button></a>
    <p>Please not that this link is only valid for 5 mins. If you did not requesta a password reset,Please disregard this message</p>
    <p>Thank You</p>
    <p>Let's Program Team</p>
    </body>
    </html>`,
  };
  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(
        CreateError(500, "Something went wrong while sending the email")
      );
    } else {
      await newToken.save();
      return next(CreateSuccess(200, "Mail send successfully"));
    }
  });
};



//reset password

export const resetPassword = async (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      return next(CreateError(500, "Reset Link is expired"));
    } else {
      const response = data;
      const user = await User.findOne({
        email: { $regex: "^" + response.email + "$", $options: "i" },
      });
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);
      user.password = encryptedPassword;

      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );
        return next(CreateSuccess(200, "Password Reset Success!!"));
      } catch (error) {
        return next(
          CreateError(500, "Something went wrong while resetting the password")
        );
      }
    }
  });
};
