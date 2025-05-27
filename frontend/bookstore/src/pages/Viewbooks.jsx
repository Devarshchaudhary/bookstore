import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
const Viewbooks = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  console.log(id)
  const [Data, setData] = useState([])

// cheack the user is loggedin or not use of useSelector 
const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
const role = useSelector((state)=> state.auth.role)



  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get(`http://localhost:8080/api/v1/getbooks/${id}`)
      setData(response.data.data);
      
    }
    fetch()
  }, [])

  // add to favrouites 
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  }
  const handleFavrouites = async ()=>{
    const response = await axios.post(`http://localhost:8080/api/v1/addbooktofav`,{},{headers})

    alert(response.data.message)
  
  }

  const handleCart = async ()=>{
    const response = await axios.post(`http://localhost:8080/api/v1/addbooktocart`,{},{headers})
    // alert(response.data.message)
    navigate("/cart")
  }

  const deletBook = async () => {
    const response = await axios.delete(`http://localhost:8080/api/v1/deletebooks`,{headers})
    alert(response.data.message)
    navigate("/All Books")
  }


  return (
    <div className='bg-gray-100 px-10 py-20 flex gap-24 h-screen'>
      {/* <div className='bg-gray-500 h-80 min-w-48 flex justify-center items-center border-2 border-black rounded-sm'><img className='border-2 border-black shadow-2xl rounded-md w-50 h-75' src={Data.url} alt="book image" /></div> */}
      <div className='bg-gray-500 h-80 w-full max-w-xs flex justify-center items-center border-2 border-black rounded-sm'>
  <img
    className='border-2 border-black shadow-2xl rounded-md w-full h-full object-cover'
    src={Data.url}
    alt="book image"
  />
</div>
      <div className='flex flex-col gap-5 text-xl'>
      <div className='font-semibold'>Title: {Data.title}</div>
      <div className='font-semibold'>Author: {Data.author}</div>
      <div className='font-semibold'>Description: {Data.desc}</div>
      <div className='font-semibold'>Language: {Data.language}</div>
      <div className='font-semibold'>Price: {Data.price}</div>

     {isLoggedIn===true && role==="user" &&(
       <div className='flex gap-5' >
       <button className='bg-slate-300 rounded hover:bg-slate-500 duration-300 font-normal w-52' onClick={handleFavrouites}>Add Favroites</button>
       <button className='bg-slate-300 rounded hover:bg-slate-500 duration-300 font-normal w-52'onClick={handleCart}   >Add Cart</button>
     </div>
     )}

{isLoggedIn===true && role==="admin" &&(
       <div className='flex gap-5' >
       <Link to={`/updatebook/${id}`} className='bg-slate-300 rounded hover:bg-slate-500 duration-300 font-normal w-52 p-2' >Update Book</Link>
       <button className='bg-slate-300 rounded hover:bg-slate-500 duration-300 font-normal w-52' onClick={deletBook}>Delete Book</button>
     </div>
     )}
      </div>
    </div>
  )
}

export default Viewbooks