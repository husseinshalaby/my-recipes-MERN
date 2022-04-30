const express = require('express');
const app = express();
const port = 5000;
const connectDb = require('./db/connect');
var cors = require('cors')
const path = require('path')

app.use(cors())
//Require dotenv
require('dotenv').config();

//req router
const router = require('./routes/crud');

//Middleware
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*')

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Import Router Middlewares
//Route
app.use('/api/recipes', router)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html'))
    })
}
//Connection
const start = async () =>{
    try {
        await connectDb(process.env.MONGO_CONNECT);
        app.listen(port,(req, res) =>{
            console.log('You are listening to port :', port);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
