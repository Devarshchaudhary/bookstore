import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
    bookid : id 
  }
  const [cartSection ,setCart] = useState();
  const [Total ,setTotal] = useState(0);


  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get(`http://localhost:8080/api/v1/getbooktocart`,{headers})
      setCart(response.data.data);
      
    }
    fetch()
  }, [cartSection])

  const handleremovecart = async(bookid)=>{
    const response = await axios.delete(`http://localhost:8080/api/v1/removebooktocart/${bookid}`,{headers})
    alert(response.data.message);
    console.log(response.data)
  }
  
  // total amount and place order 
  useEffect(() => {
    if(cartSection && cartSection.length > 0){
      let Total = 0;
      cartSection.map((items)=>{
        Total += items.price;
      })
      setTotal(Total);
      Total=0;
    }
   
  }, [cartSection])
  
// place order 
const placeorder = async()=>{
  try {
    const response = await axios.post(`http://localhost:8080/api/v1/placedorder`,{order: cartSection},{headers})
    alert(response.data.message);
    console.log(response.data)
    navigate("/profile/orderhistory");
  } catch (error) {
    console.log(error)
  }
}



  return (
    <>
 <div className="p-4 h-min-h-screen">
  <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
  {cartSection && cartSection.length > 0 ? (
    <div className="flex flex-col gap-6">
      {cartSection.map((items, i) => (
      <div 
          key={i} 
          className="flex items-center gap-14 border p-4 rounded-lg shadow-md bg-white"
          style={{ minWidth: "300px" }} // Optional for consistent item width
      >
          <img
            src={items.url || "default-image.jpg"}
            alt="Book cover"
            className="h-28 w-32 object-cover rounded-md"
          />
      <div className='flex gap-24 '>
            <h1 className="text-lg font-semibold">{items.title}</h1>
            <p className="text-sm text-gray-600">{items.author}</p>
            <p className="text-md font-medium">Price: ₹ {items.price}</p>

            <div className='bg-slate-300 rounded-md w-48 text-center font-medium hover:bg-slate-400 '>
        <button onClick={ ()=> handleremovecart(items._id)}>
          Remove From the Cart 
        </button>
      </div> 
      </div>
      </div>
      ))}
    {cartSection && cartSection.length > 0 &&(
        <div className="p-5 bg-white rounded-lg shadow-lg border border-gray-300 max-w-md flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Total Amount</h1>
    
        <div className="flex flex-col gap-5 justify-between items-center bg-gray-100 p-4 rounded-lg">
          <div>
            <h1 className="text-lg font-medium text-gray-700">{cartSection.length} Books</h1>
          </div>
          <div>
            <h1 className="text-lg font-medium text-gray-900">₹ {Total}</h1>
          </div>
        </div>
        <div className='bg-slate-200 rounded-md text-center w-24 flex justify-center mx-auto hover:bg-slate-300'>
          <button onClick={placeorder}>
            Place Order
          </button>
        </div>
      </div>)}

     </div>


  ) : (
    <p className="text-xl text-gray-500">Your cart is empty.</p>
  )}
</div>
    </>

  );
  
};

export default Cart