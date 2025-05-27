const router = require("express").Router();
// check user is allerady exist or not 
const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userauth")

//sign-up
router.post("/sign-up",async(req,res)=>{
    try {
        const {username,email,password,address} = req.body;
        
        // check usrename length is grater then 4
        if(username.length <4)
        {
            return res.status(200).json({message : "length should be greater then 3"})
        }

        // check username already exist ?
        const existingUsername = await User.findOne({username : username});
        if(existingUsername){
            return res.status(400).json({message : "username is allready exist"})
        }

        // check email already exist ?
        const existingemail = await User.findOne({email : email});
        if(existingemail){
            return res.status(400).json({message : "email is allready exist"})
        }

        // check password length 
        if(password.length <6)
            {
                return res.status(200).json({message : "length should be greater then 6"})
            }

        // using bcrypt to hide password using hash
        const hassPass = await bcrypt.hash(password,10);
        // creat the new user 
        
        const newUser = new User({
            username : username,
            email:email,
            password:hassPass,
            address:address,
        });

        await newUser.save();
        return res.status(200).json({message : "successfull"})

    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// sign-in
router.post("/sign-in",async(req,res)=>{
    try {
        const  {username , password} = req.body;

        // username is exist or not 
        const existingUser = await User.findOne({username})
        if(!existingUser){
            res.status(400).json({message : "invalid credentials"})
        }

        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data)
            {
                // code for jsonwebtoken 
                const authClaims = [
                    {name:existingUser.username},
                    {role:existingUser.role},
                ]
                const token = jwt.sign({authClaims}, "bookstore123",{expiresIn:"30d"})
                res.status(200).json(
                {
                    id : existingUser._id , 
                    role : existingUser.role , 
                    token:token ,
                })
            }
            else{
                res.status(400).json({message : "invalid credentials"})
            }
        })
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
    }
})

// get user information


router.get("/get-user-information", async (req, res) => {
    try {
      const userId = req.headers.id; // Assuming id is in the header
  
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: "User ID is missing" });
      }
  
      const user = await User.findById(userId).select("-password"); // Assuming Mongoose //hiding password
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

//   update address 
  router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers.id;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address : address},{ new: true })
        return res.status(200).json({ message: "address update successfull" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
  })



module.exports = router;