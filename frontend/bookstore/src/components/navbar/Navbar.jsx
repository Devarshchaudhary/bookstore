import React from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
const navbar = () => {
  const links=[     // create the link in the react and twinland css 
    {
      title:"Home",
      link:"/",
    },
    
    {
      title:"All Books",
      link:"/All Books",
    },
    {
      title:"Cart",
      link:"/cart",
    },
    {
      title:"Profile",
      link:"/profile",
    },
    {
      title:"Admin profile",
      link:"/profile",
    },
  ];
//   const state = useSelector((state) => state);
// console.log(state);   this both line of code create the unneaceasry error in the console 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false)
  {
    links.splice(-3,3)
  }
  if (isLoggedIn === true && role === "user")
    {
      links.splice(4,1)
    }
  if (isLoggedIn === true && role === "admin")
    {
      links.splice(-3,2)
    }
  return (  
  <div className='bg-purple-100 flex justify-between h-10 px-5 py-2 items-center'>
  <div className='flex gap-4 items-center'>
    <img className='h-7' src="book-stack.png" alt="Book Stack" />
    <h1 className='text-2xl text-black font-semibold font-serif'>Bookish Bliss</h1>
  </div>
  <div className='booksotrelink flex gap-3'>
    {
      links.map((item, i) => (
        <Link to={item.link}
        className='hover:text-red-950 transition-all duration-300 cursor-pointer font-semibold'
        key={i}
        >
        {item.title}
        </Link>
      ))
    }
  </div>

  
    {/* // when user is not login or signup */}

   {/* <div className='flex gap-4'>
    <Link to="/login" className='border border-black rounded-md px-2 py-1 hover:bg-gray-200 transition duration-300'>
      Login
    </Link>
    <Link to="/signup" className='border border-black rounded-md px-2 py-1 hover:bg-gray-200 transition duration-300'>
      Sign Up
    </Link>
  </div>  */}



  {/* // when user is login */}

  {isLoggedIn === false && 
  (
      <div className='flex gap-4'>
      <Link to="/login" className='border border-black rounded-md px-2 py-1 hover:bg-gray-200 transition duration-300'>
        Login
      </Link>
      <Link to="/signup" className='border border-black rounded-md px-2 py-1 hover:bg-gray-200 transition duration-300'>
        Sign Up
      </Link>
    </div>
  
  )}


  

</div>
)

}


export default navbar