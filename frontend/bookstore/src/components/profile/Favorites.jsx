import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
  import Bookcard from '../bookcard/Bookcard'
const Favorites = () => {
  
  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    
  }
  const [favrouitesbook, setFavrouites] = useState()
  useEffect(() => {
    const fetch = async()=>{
      
      const response = await axios.get('http://localhost:8080/api/v1/getbooktofav',{headers})
      setFavrouites(response.data.data);
      console.log(response.data.data)
    }
    fetch()
  }, [favrouitesbook])


  return (
    <div className=" p-4 ">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Favorites</h2>
    
    <div className="flex gap-5 flex-wrap">

      {/* when there is no book added in the fav */}
   {/* {favrouitesbook.length === 0 &&(
    <div className='font-semibold text-xl'>No Favrouites books</div>
   )}    */} 
  {favrouitesbook &&
    favrouitesbook.map((items, i) => (
      <div key={i} className="flex justify-center ">
        <div className="w-64 h-80">
          <Bookcard data={items} favrouitesbook={true}/>
        </div>
      </div>
    ))}
</div>

</div>
  )
}

export default Favorites