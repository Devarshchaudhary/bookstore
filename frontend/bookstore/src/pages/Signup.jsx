import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate()
  // First step: State to hold form values
  const [Values, setValues] = useState({
    username:"",
    email: "",
    password: "",
    address:"",
  });

 // Second step: Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...Values,
      [name]: value,
    });
  }

  // third step perform the submit event, Third step: Handle form submission
  const submit = async()=>{
    try {
      if( 
        Values.username === ""||
        Values.password === ""||
        Values.email === ""||
        Values.address === ""
      ){
        alert("All fields are required")
      }
      else{
       // fouth step conect to the bakcend
       const response = await axios.post("http://localhost:8080/api/v1/sign-up",Values)
       console.log(response.data)
        navigate("/login")
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
  <form  onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
    
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your username"
        required
        value={Values.username}
        onChange={change}
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your password"
        required
        value={Values.password}
        onChange={change}
      />
    </div>

   
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your email"
        required
        value={Values.email}
        onChange={change}
      />
    </div>

    
    <div className="mb-4">
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
      <textarea
        id="address"
        name="address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your address"
        rows="3"
        required
        value={Values.address}
        onChange={change}
      ></textarea>
    </div>

   
    <div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={submit}

      >
        Submit
      </button>
    </div>
  </form>
</div>

  )
}

export default Signup