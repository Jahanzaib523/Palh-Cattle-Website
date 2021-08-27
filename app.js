const express = require('express');
const morgan = require('morgan');
//const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const CattleRoutes = require('./API/Routes/cattles');
const ContactRoutes = require('./API/Routes/contact');

//Connection with MongoDB. The password is given too.
mongoose.connect('mongodb+srv://nodejsrestapi:' + process.env.MONGO_ATLAS_PW +'@cluster0.gjkln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
//Removes Depreciation.
mongoose.Promise = global.Promise;

app.use('/uploads', express.static('uploads'));
//Morgan shows the log content in the console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Handling the CORS errors
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '192.168.252.37');
   res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Authroization, Content-Type, Accept, ');
   res.header('Access-Control-Allow-Origin', '*');
   
   if(req.method === 'OPTIONS')
   {
     res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json({});
   } 
   next();
});

//Routes which are handling requests.
app.use('/cattles', CattleRoutes);
app.use('/contact', ContactRoutes);

//Error Handling
app.use((req, res, next) => {
    const error = new Error('Error Occured!');
    error.status = 404;
    next(error);
}); 

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
     error: {
       message: error.message
     }
  });
});

module.exports = app;
