const mongoose = require('mongoose');

// server database se kaise connect karega uska logic likhte h yaha pe 
function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
      .then(()=>{
          console.log("MongoDB connected");
      })
      .catch((err)=>{
        console.log("MongoDB connection error:", err);
      })
}


//hamne launch nahi kia h , vo ham server.js m karnege
module.exports = connectDB;