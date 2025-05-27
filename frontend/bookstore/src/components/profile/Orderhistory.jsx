import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Orderhistory = () => {
  const {id} = useParams();
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`, 
   
  }

  const [orderData, setorderData] = useState()
  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get(`http://localhost:8080/api/v1/getorderhistory`,{headers})
      setorderData(response.data.data);
      console.log(response.data.data)
      console.log(orderData)
    }
    fetch()
  }, [])
  return (
   
   <>
    {/* {orderData && orderData.length>0 &&(
      <div className='flex flex-col gap-6'>
        <div>
          <h1>Your Order History</h1>
        </div>
        <div  className='flex'>
          <div>
            <h1>Sr.</h1>
          </div>
          <div>
            <h1>Books.</h1>
          </div>
          <div>
            <h1>Title</h1>
          </div>
          <div>
            <h1>Price</h1>
          </div>
          <div>
            <h1>Status</h1>
          </div>
          <div>
            <h1> Payment Mode</h1>
          </div>
        </div>

      </div> */}
      
    {/* )} */}
      
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Order History</h1>
      {orderData && orderData.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-4 border-b-2 border-gray-300 py-2">
              <div className="font-semibold">Sr.</div>
              <div className="font-semibold">Title</div>
              <div className="font-semibold">Price</div>
              <div className="font-semibold">Status</div>
              <div className="font-semibold">Payment Mode</div>
            </div>
            
            {orderData.map((items, index) => (
              <div key={index} className="grid grid-cols-6 gap-4 border-b py-2">
                <div>{index + 1}</div>
               
                <div>{items.title}</div>
                <div>₹ {items.price}</div>
                <div>{items.status}</div> {/* Adjust based on your data structure */}
                <div>COD</div> {/* Adjust based on your data structure */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
    </>
   
    
    
  )
}

export default Orderhistory