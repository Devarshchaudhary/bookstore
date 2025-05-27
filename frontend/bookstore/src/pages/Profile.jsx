import React, { useState } from 'react'
import Sidebar from '../components/profile/sidebar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import  axios  from 'axios'
const Profile = () => {
  
  const [Profile ,setProfile] = useState([])

  // const isLoggedin = useSelector();
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

 

  useEffect(() => {
    
    const fetch = async()=>{
      
      const response = await axios.get(`http://localhost:8080/api/v1/get-user-information`,{headers})
      setProfile(response.data)
    }
    fetch()

  }, [])
  

  return (
    <div className='h-full flex'>
      {Profile &&(
        <>
        <div>
      <Sidebar data={Profile}/>
      </div>

      <div className='p-20'>
        <Outlet />
      </div>
        </>
      )}
      
   
    </div>
    
    
  )
}

export default Profile