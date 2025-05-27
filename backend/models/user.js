const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username:{
            type : String,
            require : true,
            unique : true,
        },

        email:{
            type : String,
            require : true,
            unique : true,
        },

        password:{
            type : String,
            require : true,
        },

        address:{
            type : String,
            require : true,
        },

        avtar:{
            type : String,
            default : "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg"
        },

        role:{
            type : String,
            default : "user",
            enum : ["user","admin"],
        },

        favourites : [
            {
                type : mongoose.Types.ObjectId,
                ref : "books",
            }
        ],

        cart : [
            {
                type : mongoose.Types.ObjectId,
                ref : "books",
            }
        ],

        orders : [
            {
                type : mongoose.Types.ObjectId,
                ref : "order",
                
            }
        ],

    },
    {timestamps : true}
)

module.exports = mongoose.model("user",User);
