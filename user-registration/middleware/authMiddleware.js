const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const authMiddleware=async(req, res, next)=>{
    const token=req.cookies.token;
    
    if(!token) return res.status(401).json({message: "Unauthorized"});

    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");
        next();
    }catch(error){
        res.status(401).json({message: "Invalid token"});
    }
};

module.exports={authMiddleware};