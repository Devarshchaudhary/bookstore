const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors")
const mongoose = require('mongoose');
const Mongo_url = "mongodb://127.0.0.1:27017/bookstore";
const user = require("./models/user");
const order = require("./models/order");
const book = require("./models/books");
const User = require("./routes/user");
const Book = require("./routes/adminbooks");
const fav = require("./routes/favourites");
const Cart = require("./routes/cart");
const Orders = require("./routes/oders")

app.use(cors());
app.use(express.json());
app.use("/api/v1",User);
app.use("/api/v1",Book);
app.use("/api/v1",fav);
app.use("/api/v1",Cart);
app.use("/api/v1",Orders);



main().then(()=>{
    console.log("connection suucesfull :)");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(Mongo_url);

}


app.get("/",(req,res)=>{
    res.send("working properly");
})


app.listen(port,()=>{
    console.log(`listing at ${port} is successfull`);
})
