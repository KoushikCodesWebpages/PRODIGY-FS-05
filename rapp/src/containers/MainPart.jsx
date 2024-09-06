import React from 'react'
import MainDiv from '../components/MainDiv'
import ProductList from '../components/ProductList'



const MainPart = () => {
  return (
    <div className="flex items-center justify-center">
        <div className="bg-slate-100 w-[80%] shadow-lg mt-32 relative z-30 h-auto">
            <MainDiv />
            <ProductList />

        </div>
    </div>
  )
}

export default MainPart