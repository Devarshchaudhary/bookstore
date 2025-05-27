const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
   url :{
    type : String,
    default : "https://archive.ulpan.com/wp-content/uploads/2011/05/clip-art-book.jpg",
    
   },
   title :{
    type : String,
    required : true,
   },
   author :{
    type : String,
    required : true,
   },
   price :{
    type : Number,
    required : true,
   },
   desc :{
    type : String,
    required : true,
   },
   language :{
    type : String,
    required : true,
   },

},
{timestamps:true}
)
module.exports = mongoose.model("books",book);