
import express from 'express';
const app = express();
const PORT = 4000;
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js'

const salt = bcrypt.genSaltSync(10);
const secret = 'heladfasdflahrf';

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());

// parsing incoming requests with json payloads, is required when you want your server to be able to handle json data in request bodies.
// when client send data to your server in the form of a json object, this middleware parses the incoming json data and makes it available in the request.body property.

app.use(express.json());

// connecting with database
connectDB();

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})

