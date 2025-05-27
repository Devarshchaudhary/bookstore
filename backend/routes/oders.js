const router = require("express").Router();
// check user is allerady exist or not 
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Order = require("../models/order");
const Book = require("../models/books")
const { authenticateToken } = require("./userauth");
const books = require("../models/books");
// const order = require("../models/order");
 
// placed order 
router.post("/placedorder" ,async(req,res)=>{
    
    try {
        const {id} = req.headers;
         const { bookid } = req.params;
        const {order} = req.body;
        
        // apply for loop for order
        for(const orderData of order){
            const bookDetails = await Book.findById(orderData._id);
            if (!bookDetails) {
                return res.status(404).json({ message: "Book not found", bookId: orderData._id }); // Handle missing book
              } 
            const newOrder = new Order({
                user : id,
                book : [orderData._id],
                title : bookDetails.title,  // Store title
                price : bookDetails.price, // Store price
            })
            const orderdatafromdb = await newOrder.save();

            // saving order in the user model 
            await User.findByIdAndUpdate(id,{
                $push:{orders : orderdatafromdb._id}
            })

            // clearing for the cart 
            await User.findByIdAndUpdate(id,{
                $pull:{cart : orderData._id}
            })
        }
        return res.json({
            status:"succes",
            message:"oder palced successfully"
        })

    } catch (error) {
        res.status(500).json({message : "Internal server error" , error: error.message })
    }
})



router.get("/getorderhistory" ,async(req, res) => {
    try {
        
        const {id} = req.headers;
        // Find user by ID and populate orders and books
        const userData = await User.findById(id).populate({
            path : 'orders',
            populate :{ path : 'book'
             }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Orders with populated books: ", userData.orders);

        const ordersData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred" });
    }
});

// get all order ---- Admin 
router.get("/getallorder" ,async(req, res) => {
try {
    const userData = await Order.find().
    populate({path:"book"})
    .populate({path:"user"})
    .sort({createdAt :  -1})
    return res.json({
        status:"success",
        data:userData
    })
} catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Occurred" });
}
})

//update order 
router.put("/updateorder/:id",authenticateToken,async(req,res)=>{
    try {

        const {id} = req.params;

        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"success",
            message:"Status update successfully"
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error Occurred" });
    }
})



module.exports = router;