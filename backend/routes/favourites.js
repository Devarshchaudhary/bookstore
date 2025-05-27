const router = require("express").Router();
// check user is allerady exist or not 
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticateToken } = require("./userauth");

// add book to the favouites 
router.post("/addbooktofav" ,  async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isbookfav = userData.favourites.includes(bookid);
        if(isbookfav){
            return res.status(200).json({message : "Book is already added in the favourites"})
        }
        await User.findByIdAndUpdate(id,{ $push :{favourites:bookid}})
        return res.status(200).json({message : "book is added into the favourites"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// delete the book form the favourites 
router.put("/removebooktofav" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isbookfav = userData.favourites.includes(bookid);
        if(isbookfav){
            await User.findByIdAndUpdate(id,{ $pull :{favourites:bookid}})

        }
        return res.status(200).json({message : "book is removed form the favourites"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// get all favouties book for particular user
router.get("/getbooktofav" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const isbookfav = userData.favourites;
            return res.json(
                {
                    status:"success",
                    data:isbookfav
                }
        )
        
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})




module.exports = router;

