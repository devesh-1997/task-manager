const express = require('express');
const app = new express();
require('dotenv').config();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const port = process.env.PORT || 3000;


app.use(express.json())//for parsing req.body
app.use(express.static('./public'));


app.use('/api/v1/tasks',tasks);
app.use(notFound)
app.use(errorHandler)


const start = async()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(port,()=>{console.log(`task manager listening on port ${port}`)})//only listen on port if connected to DB
  }catch(err){
    console.log(err);
  }
}

start();

