import React from 'react'
import shoe_image from '../assests/Shoe.jpg'
const MainDiv = () => {

  return (
    <div className="flex w-full">  
      <div className="w-3/5 m-0 p-0 bg-red-200">
        Div 1
      </div>
      <div className="w-2/5 m-0 p-0 bg-blue-200">
        <img 
          src={shoe_image}
          alt="Example" 
          className="w-[100%] h-auto object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center  ">
            <h1 className="text-white text-2xl">Overlay Text</h1>
        </div>
      </div>
    </div>
    

  )
}

export default MainDiv