
const express = require('express');
const app = express();
const PORT = 4000;
const User = require('./Models/User')
const cors = require('cors')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'heladfasdflahrf';

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(cookieParser());

// parsing incoming requests with json payloads, is required when you want your server to be able to handle json data in request bodies.
// when client send data to your server in the form of a json object, this middleware parses the incoming json data and makes it available in the request.body property.

app.use(express.json());

// connecting with database
mongoose.connect('mongodb+srv://pawanb78:7hFIvWaVCvHqqjKM@cluster0.76ssb5e.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) =>{
    // requesting username and password from body
    const {username, password} = req.body;
    try{
    const userDoc = await User.create({
        username,
        password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc);
    } catch(e){
        res.status(400).json(e);
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({ username: username });
        if (!userDoc) {
            return res.status(400).json('User not found');
        }
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json('ok');
            });
        } else {
            res.status(400).json('Wrong credentials');
        }
    } catch (e) {
        res.status(500).json('Internal Server Error');
    }
});

app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    jwt.verify(token,secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info);
    })
    res.json(req.cookies);
})

app.post('/logout', (req, res) =>{
    res.cookie('token', '').json('ok');
})

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})
// 7hFIvWaVCvHqqjKM
// connection string mongodb => mongodb+srv://pawanb78:7hFIvWaVCvHqqjKM@cluster0.76ssb5e.mongodb.net/?retryWrites=true&w=majority