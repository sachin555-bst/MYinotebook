const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"

//  const connectToMongo =()=>{

//     mongoose.connect(mongoURI,()=>{
//         console.log("connected to mongo successfullly")
//     })

//  }

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
  
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
  }
 module.exports= connectToMongo;