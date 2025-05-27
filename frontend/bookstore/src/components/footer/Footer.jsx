import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
const Footer = () => {

  const navigate = useNavigate();
  return (
    // 
    //   <h1 className='text-2xl h-10 items-center px-3 text-center'>All Right Are Reserved @2022</h1>
    // </div>
    <>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap- p-5 bg-slate-200">
    
   
    <div>
      <h2 class="text-lg font-semibold text-black mb-4">About Us</h2>
      <p class="text-sm text-gray-500">
        Welcome to Bookish Bliss, your ultimate online bookstore for bestsellers, classics, and everything in between. Explore a world of knowledge and stories!
      </p>
    </div>


    <div>
      <h2 class="text-lg font-semibold text-black mb-4">Quick Links</h2>
      <ul class="space-y-2 text-sm">
        <li><a href="/" class="hover:text-gray-400">Home</a></li>
        
        <li><a href="/All Books" class="hover:text-gray-400">All Books</a></li>
        <li><a href="/cart" class="hover:text-gray-400">Cart</a></li>
     
      </ul>
    </div>

  
    <div>
      <h2 class="text-lg font-semibold text-black mb-4">Contact Us</h2>
      <ul class="space-y-2 text-sm">
        <li>Email: <a href="mailto:support@booknest.com" class="hover:text-gray-400">bookstore123@gmail.com</a></li>
        <li>Phone: <a href="tel:+123456789" class="hover:text-gray-400">+91 9210254182</a></li>
      </ul>
    </div>

   
   

  </div>

 
  <div class="border-t border-gray-700 pb-3 pt-3 text-center">
    <p class="text-sm text-gray-400">&copy; 2025 Bookish Bliss. All Rights Reserved.</p>
  </div>
  </>
  )
}

export default Footer
