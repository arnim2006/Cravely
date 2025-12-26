// routers ke logics yaha honge , bascically jo bhi ham callback ke andaer likhte the vo yaha hoga 

const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const {fullName,email,password}=req.body;  // req.boy is fetching the data from frontend in readable manner

    const isUserAlreadyExist = await userModel.findOne({      // email ke basis pe dekh rahe hai ki user exist karta hai ya nahi
        email
    })

    if(isUserAlreadyExist){
          return res.status(400).json({
            message: "User already exists"
        })
    }

    // agar user pehle se nahi h registered then ab apan ye sab karte hai:
     const hashedPassword = await bcrypt.hash(password, 10);     // we have to do this to protect the user's account
    
     // register hogaya user
     const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    // creating token
    const token = jwt.sign({
        id: user._id,        // jo user upper apan ne create kia hai uski id de rahe hai kyuki id unique hoti hai
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    // here status code is 201 because new resource create ho raha hai
    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}



async function loginUser(req, res) {

    const { email, password } = req.body;
    //email ke basis pe dekh rahe hai ki user exist karta hai ya nahi
    const user = await userModel.findOne({
        email
    })

    if (!user) {   // agar koi bhi use exist nahi karta then 
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // now agar user exist karta hai the ye sab karenge:

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {   // agar password galat daal dia
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

     // agar password bhi sahi daala hai then token generate karenge
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)  // response ko cookie m store kar rahe hai

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}



function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}






async function registerFoodPartner(req, res) {

    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food partner account already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    })

}




async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}


function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food partner logged out successfully"
    });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}