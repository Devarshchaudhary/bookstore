import React from 'react'
import Hero from '../components/home/Hero'
import Recentlyaddedbook from '../components/home/recentlyaddedbook'
const home = () => {
  return (
    <div className='bg-gray-100 '>
      <Hero />
      <Recentlyaddedbook/>
    </div>
  )
}

export default home
