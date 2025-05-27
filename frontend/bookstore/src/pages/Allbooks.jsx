import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Bookcard from '../components/bookcard/Bookcard';

const Allbooks = () => {
  const [Data, setData] = useState([])
  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get('http://localhost:8080/api/v1/getallbooks')
      setData(response.data.data);
      console.log(response.data.data)
    }
    fetch()
  }, [])
  return (
    <div>
   <h1 className='text-4xl font-semibold mx-8  '>All Books</h1>
   <div className='m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 '>
    {Data 
    && 
    Data.map((items,i) => (
      <div key={i}>
        <Bookcard data={items} /> {" "}
      </div>
    ))}
   </div>
  </div>
  )
}

export default Allbooks