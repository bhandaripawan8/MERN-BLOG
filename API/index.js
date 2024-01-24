
const express = require('express');
const app = express();
const PORT = 4000;
const User = require('./Models/User')
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors());

// parsing incoming requests with json payloads, is required when you want your server to be able to handle json data in request bodies.
// when client send data to your server in the form of a json object, this middleware parses the incoming json data and makes it available in the request.body property.

app.use(express.json());

// connecting with database
mongoose.connect('mongodb+srv://pawanb78:7hFIvWaVCvHqqjKM@cluster0.76ssb5e.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) =>{
    // requesting username and password from body
    const {username, password} = req.body;
    try{
    const userDoc = await User.create({username,password})
    res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
})

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})
// 7hFIvWaVCvHqqjKM
// connection string mongodb => mongodb+srv://pawanb78:7hFIvWaVCvHqqjKM@cluster0.76ssb5e.mongodb.net/?retryWrites=true&w=majority