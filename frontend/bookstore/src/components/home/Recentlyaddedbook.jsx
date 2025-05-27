import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Bookcard from '../bookcard/Bookcard';
const recentlyaddedbook = (Books) => {
  // fetching the data from the backend
  const [Data, setData] = useState([])
  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get('http://localhost:8080/api/v1/getrecentbooks')
      setData(response.data.data);
      
    }
    fetch()
  }, [])

  
  return (
    <div>
   <h1 className='text-4xl font-semibold mx-8  '> Recently Added Book</h1>
   <div className='m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
    {Data 
    && 
    Data.map((items,i) => (
      <div key={i}>
        <Bookcard data={items} />
      </div>
    ))}
   </div>
  </div>
  )
}

export default recentlyaddedbook