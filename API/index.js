
import express from 'express';
const app = express();
const PORT = 4000;
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js'
import userRouter from './routes/userRoutes.js';
import blogRouter from './routes/blogPostRoutes.js';


app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/auth', userRouter);
app.use('/api/blog', blogRouter);


// connecting with database
connectDB();

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})

