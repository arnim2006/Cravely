// create server
const express = require('express');
const cookieParser = require('cookie-parser');  // we are usign this as a middleware
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const cors = require('cors');

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieParser());    // middleware cookieParser
app.use(express.json());   // middleware so that we can use req.body

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use('/api/auth',authRoutes);  // iss line se hamne server ko bataya ki hamare application m authention related API exist karti hai , iske bina hamara server toh chal jayega lekin jab ham unn API se related kuch bhi karne ki koshish karenge toh fir NOT Found ka error aajayega
// hamko hamesha authentication se related jo bhi kaam h usse pehle "api/auth" ye prefix lagana zaroori hai url mai 
// ye prefix lagana zaroori nahi hai but production mai aise hee hota hai 

app.use('/api/food', foodRoutes);

app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;