const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    user :{
        type : mongoose.Types.ObjectId,
        ref : "user",
    },
    book:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "books",
    }],
    status :{
        type:String,
        default : "order placed",
        enum : ["order placed", "out for delivery", "delivered", "canceled"]
    },
    title :{
        type : String,
        required : true,
       },
    price :{
        type : Number,
        required : true,
       },
},
{timestamps:true}
)
module.exports = mongoose.model("order",order);