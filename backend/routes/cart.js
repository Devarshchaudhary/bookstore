const router = require("express").Router();
// check user is allerady exist or not 
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticateToken } = require("./userauth");

// add book to the cart
router.post("/addbooktocart" , authenticateToken , async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isbookcart = userData.cart.includes(bookid);
        if(isbookcart){
            return res.status(200).json({message : "Book is already added in the cart"})
        }
        await User.findByIdAndUpdate(id,{ $push :{cart:bookid}})
        return res.status(200).json({message : "book is added into the cart"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// delete the book form the cart 
router.delete("/removebooktocart/:bookid" , async(req,res)=>{
    try {
        const { bookid } = req.params;
        const {id} = req.headers;
        const userData = await User.findById(id);
        const isbookcart = userData.cart.includes(bookid);
        if(isbookcart){
            await User.findByIdAndUpdate(id,{ $pull :{cart:bookid}})

        }
        return res.status(200).json({message : "book is removed form the cart"})
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// get all cart book for particular user
router.get("/getbooktocart" ,  async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const isbookcart = userData.cart;
            return res.json(
                {
                    status:"success",
                    data:isbookcart
                }
        )
        
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})




module.exports = router;

