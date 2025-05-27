import React, { useState} from "react";
import axios from "axios";
const Addbook = () => {

const [Data, setData] = useState({

url:"",

title:"",

author:"",

price: "",

desc:"",

language:"",

});

const headers = {

id: localStorage.getItem("id"),

authorization: `Bearer ${localStorage.getItem("token")}`, };

const change = (e) => {

const { name, value} = e.target;

setData({...Data, [name]: value });

};
const submit = async () => {
  try{
    if(
      Data.url === ""||
      Data.title === ""||
      Data.author === ""||
      Data.price === ""||
      Data.desc === ""||
      Data.language === ""
    ){
      alert("All fields are required");
    }
    else {
      const response = await axios.post(
        "http://localhost:8080/api/v1/addbooks",
        Data,
        {
          headers
        }
      );
      setData({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:"",
        
        });
        
        alert(response.data.message);
      }
    } 
        catch (error) {
        
        alert(error.response.data.message);
        }
      }
        return (
          <div className="h-full p-6 md:p-4 bg-white"> 
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Add Book
          </h1>
          <div className="p-4 bg-white rounded">
            <div>
              <label htmlFor="url" className="text-black">
                Image
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                placeholder="URL of image"
                name="url"
                required
                value={Data.url}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="title" className="text-black">
                Title of book
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                placeholder="Title of book"
                name="title"
                required
                value={Data.title}
                onChange={change}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="author" className="text-black">
                Author of book
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                placeholder="Author of book"
                name="author"
                required
                value={Data.author}
                onChange={change}
              />
            </div>
    
            <div className="mt-4 flex gap-4">
              <div className="w-3/6">
                <label htmlFor="language" className="text-black">
                  Language
                </label>
                <input
                  type="text"
                  className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                  placeholder="Language of book"
                  name="language"
                  required
                  value={Data.language}
                  onChange={change}
                />
              </div>
              <div className="w-3/6">
                <label htmlFor="price" className="text-black">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                  placeholder="Price of book"
                  name="price"
                  required
                  value={Data.price}
                  onChange={change}
                />
              </div>
            </div>
    
            <div className="mt-4">
              <label htmlFor="desc" className="text-black">
                Description of book
              </label>
              <textarea
                className="w-full mt-2 bg-slate-100 text-black p-2 outline-none"
                rows="5"
                placeholder="Description of book"
                name="desc"
                required
                value={Data.desc}
                onChange={change}
              />
            </div>
    
            <button
              className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
              onClick={submit}
            >
              Add Book
            </button>
          </div>
        </div>
      );
    };

export default Addbook