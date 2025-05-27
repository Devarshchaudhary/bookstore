// user authentication
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const books = require("../models/books")

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null){
        return res.status(401).json({message : "Authentication token required"});
    }

    jwt.verify(token,"bookstore123",(err,User)=>{
        if(err){
            return res
            .status(403)
            .json({message : "token expired . please sing-in again"});

        }
        req.User = User ;
        next();
    })
}




module.exports = {authenticateToken}