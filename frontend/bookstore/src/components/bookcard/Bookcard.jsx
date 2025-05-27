import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Bookcard = ({ data, favrouitesbook }) => {
  
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  }
 

  const handleRemove = async()=>{
    const response = await axios.put('http://localhost:8080/api/v1/removebooktofav',{},{headers})

    alert(response.data.message);
  }

  const handleCart = async ()=>{
    const response = await axios.post(`http://localhost:8080/api/v1/addbooktocart`,{},{headers})
    alert(response.data.message)
    navigate("/cart")
  }

  return (
    <div className="flex flex-col items-center border-slate-200 border-2 rounded-lg w-64 h-100"> {/* Set fixed width and height */}
      <Link to={`/viewbook/${data._id}`}>
        <div className="h-full w-full p-4  flex flex-col items-center justify-between">
          <img 
            src={data.url || "default-url.jpg"} 
            alt={data.title} 
            className="h-40 w-40 object-cover rounded-md"
          />
          <h2 className="text-lg font-semibold mt-4 text-gray-800">{data.title}</h2>
          <p className="text-sm text-gray-600">{data.author}</p>
          <p className="text-md font-semibold text-gray-800">Price: ₹ {data.price}</p>
        </div>
      </Link>
      {favrouitesbook && (
        <>
        <button 
          className="bg-slate-300 font-semibold rounded  hover:bg-slate-400 transition duration-200 mb-3" 
          onClick={handleRemove}
        >
          Remove from Favorites
        </button>

         <button className='bg-slate-300 rounded hover:bg-slate-500 duration-300 font-normal w-52 mb-2'onClick={handleCart}   >Add Cart</button>
        
        </>
        
      )}
    </div>
  );
}

export default Bookcard;