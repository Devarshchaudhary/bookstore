import React from 'react'

const hero = () => {
  return (
    // <div className='flex justify-between'>
    //   <div className='flex-col '>
    // <h1 className='text-5xl font-semibold'>Discover Your Next <br /> Great Read</h1><br />
    // <h1 className='font-medium'>Uncover captivating stories, enriching knowledge, and endless <br />inspiration in our curated collection of books</h1>
    // </div>
    //   <div><img className='h-80 w-auto' src="rb_39027.png" alt="" srcset="" /></div>
    // </div>
    <div className="flex justify-between items-center p-8 bg-gray-100">
  <div className="flex flex-col ">
    <h1 className="text-5xl font-semibold text-gray-800">
      Discover Your Next <br /> Great Read
    </h1>
    <br />
    <h2 className="font-medium text-gray-600 text-lg">
      Uncover captivating stories, enriching knowledge and <br />
      inspiration in our curated collection of books.
    </h2>
  </div>
  <div>
    <img className="h-80 w-auto " src="rb_39027.png" alt="Book Cover" />
  </div>
</div>
  )
}

export default hero
