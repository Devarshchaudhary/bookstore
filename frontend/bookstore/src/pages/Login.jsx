import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // First step: State to hold form values
  const [Values, setValues] = useState({
    username:"",
    password: "",
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
        Values.password === ""
       
        
      ){
        alert("All fields are required")
      }
      else{
       // fouth step conect to the bakcend
       const response = await axios.post("http://localhost:8080/api/v1/sign-in",Values)
      //  console.log(response.data)

      dispatch(authActions.login())
      dispatch(authActions.changeRole(response.data.role))

      // store the data in the localsotreage 
      localStorage.setItem("id",response.data.id)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)

       navigate("/")
      
      }
      
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  return (
    <div className='h-screen p-20'>
          <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow-lg ">
    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
    <form onSubmit={(e) => {
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
        <label htmlFor="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
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
  
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </div>

    </div>
  )
}

export default Login