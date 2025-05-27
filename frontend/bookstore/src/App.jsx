import React from 'react'
import Home from './pages/home'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { Routes,Route} from 'react-router-dom'
import Allbooks from './pages/Allbooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Viewbooks from './pages/Viewbooks'
import Allorder from './/pages/Allorder'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import { useEffect } from 'react'
import Favorites from './components/profile/Favorites'
import Orderhistory from './components/profile/Orderhistory'
import Addbook from './pages/Addbook'
import Updatebook from './pages/Updatebook'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state)=> state.auth.role)

  useEffect(() => {
    
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }

  }, [])
  
  return (
  <>    
  <Navbar />
    <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route  path='/All Books' element={<Allbooks />}/>
    <Route exact path='/login' element={<Login />}/>
    <Route exact path='/signup' element={<Signup />}/>
    <Route exact path='/updatebook/:id' element={<Updatebook />}/>
    <Route exact path='/cart' element={<Cart />}/>
    <Route exact path='/profile' element={<Profile />}>
    {role ==="user" ?(<Route index element={<Favorites/>}/>):(<Route index element={<Allorder/>}/>)}
    {role ==="admin" &&( <Route exact path='/profile/Addbook' element={<Addbook />}/>)}

    <Route exact path='/profile/orderhistory' element={<Orderhistory />}/>
    </Route>
    <Route exact path='/viewbook/:id' element={<Viewbooks />}/>

    </Routes>
    <Footer />
    </>

  )
}

export default App
