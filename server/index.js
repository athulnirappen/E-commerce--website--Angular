import express from 'express'
import dotenv from 'dotenv'
import connectDb from './Db/connection.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import roleRouter from './routes/role.js'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'



dotenv.config()
connectDb()

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

//router path
app.use('/api/role', roleRouter)
app.use('/api/auth', authRouter)
app.use("/api/user", userRouter);
app.use("/api/product", productRouter)
// app.use('/uploads',express.static('./uploads'))








//response handler middleware

app.use((obj, req, res, next) => {
  const statusCode = obj.status || 500;
  const errorMessage = obj.message || "Something went wrong";
  return res.status(statusCode).json({
    success: [200, 201, 204].some((a) => a === obj.status) ? true : false,
    status: statusCode,
    message: errorMessage,
    data: obj.data,
  });
});







//listen

app.listen(process.env.PORT, () => {
    console.log(`Server running in the port ${process.env.PORT}`);
})