
const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors')

app.use(cors());

app.get('/test', (req, res) =>{
    res.json(`listeing to post ${PORT}`)
})

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`)
})
