import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../../store/auth'
import { useNavigate } from 'react-router-dom' 
const sidebar = ({data}) => {

 const dispatch = useDispatch();
const navigate = useNavigate();
const role = useSelector((state)=> state.auth.role) 
  return (
<div className='m-20 bg-slate-200 w-64  rounded-lg shadow-lg text-center'>
    <div className='flex flex-col justify-center gap-4 px-7 py-6 items-center bg-slate-200 rounded-lg shadow-xl'>
        <img src="avtar.jpg" className='h-20 w-20 rounded-full border-4 border-white shadow-md' alt="User  Avatar" />
        <p className='text-lg font-semibold text-gray-800'>{data.username}</p>
        <p className='text-sm text-gray-600'>{data._id}</p>
    </div>
    
    {role ==="user" && <div className="flex flex-col space-y-4 p-6">
        <Link 
            to="/profile" 
            className=" hover:text-blue-800 font-semibold transition duration-200"
        >
            Favorites
        </Link>

        <Link 
            to="/profile/orderhistory" 
            className=" hover:text-blue-800 font-semibold transition duration-200"
        >
            Order History
        </Link>
    </div>}

    {role ==="admin" && <div className="flex flex-col space-y-4 p-6">
        <Link 
            to="/profile" 
            className=" hover:text-blue-800 font-semibold transition duration-200"
        >
            All Order
        </Link>

        <Link 
            to="/profile/Addbook" 
            className=" hover:text-blue-800 font-semibold transition duration-200"
        >
            Add Book
        </Link>
    </div>}
    <div>
      <button  
      onClick={()=>{
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        navigate("/")
      }}
      >
        Logout
      </button>
    </div>
</div>  )
}

export default sidebar