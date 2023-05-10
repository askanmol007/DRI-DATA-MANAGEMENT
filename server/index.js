import express from "express";
import connectDB from "./utils/connectDb.js";
import dotenv from "dotenv";
import errorMiddleware from './middleware/error.js'
import mainDataRouter from './routes/mainDataRoutes.js'
import userRouter from './routes/userRouts.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from "body-parser";
// ES6 module for dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app
const app=express();
dotenv.config();

// middleware
// app.use(bodyParser());
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// html form for upload file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/upload.html');
});

// routes
app.use('/api/v1/auth',userRouter);
app.use('/api/v1',mainDataRouter);

// app.get('*',(req,res)=>{
//     res.status(400).send('<h1> not found bro</h2>')
// })
// errorMiddleware
app.use(errorMiddleware);

// port and listing
const port=process.env.PORT || 8080
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,()=>console.log(`server is running on ${port}....`))
    } catch (error) {
        console.log(error);
    }
}
start();