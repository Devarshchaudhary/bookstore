const router = require("express").Router();
// check user is allerady exist or not 
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const books = require("../models/books") 

const {authenticateToken} = require("./userauth");


// add books
router.post("/addbooks",authenticateToken,async(req,res)=>{
    try {
        const {url,title,author,price,desc,language} = req.body;
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!=="admin")
        {
            res.status(400).json({message : "user can not have access"})    
        }
        const newbook = new books({
            url : url,
            title : title,
            author : author,
            price : price,
            desc : desc,
            language :language,
        });
        await newbook.save();
        
        res.status(200).json({message : "new book add successfull :)" }) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

// upadte book
router.put("/updatebooks",authenticateToken,async(req,res)=>{
    try {
        const {url,title,author,price,desc,language} = req.body;
        const {bookid} = req.headers;
        await books.findByIdAndUpdate(bookid,{
            url : url,
            title : title,
            author : author,
            price : price,
            desc : desc,
            language :language,},{ new: true })
            
        res.status(200).json({message : "book update successfull :)"}) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

// delete route 
router.delete("/deletebooks",authenticateToken,async(req,res)=>{
    try {
        
        const {bookid} = req.headers;
        await books.findByIdAndDelete(bookid)
            
        res.status(200).json({message : "book delete successfull :)"}) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

// get all books
router.get("/getallbooks",async(req,res)=>{
    try {
        
       const book=  await books.find().sort({createdAt:-1});
            
       return res. json
        ({
            status: " successfull :)",
            data:book,
        }) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

// recently book limt 4
router.get("/getrecentbooks",async(req,res)=>{
    try {
        
       const book=  await books.find().sort({createdAt:-1}).limit(4);
            
       return res. json
        ({
            status: " successfull :)",
            data:book,
        }) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

// get book by id 
router.get("/getbooks/:id",async(req,res)=>{
    try {
        const {id} = req.params;
       const book=  await books.findById(id);
            
       return res. json
        ({
            status: " successfull :)",
            data:book,
        }) 
    } catch (error) {
        
        res.status(500).json({message : "Internal server error"})   
    }
})

module.exports = router;

