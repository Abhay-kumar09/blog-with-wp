import React from 'react'
import SiteHeader from './components/SiteHeader'
import Banner from './components/Banner'



const page = () => {
  return (
    <div className='min-h-screen bg-[url("/home.jpg")] relative'>
      <div className='absolute bg-slate-900 inset-0 z-0 opacity-40'></div>
      <SiteHeader/>
      <Banner/>
 
    </div>
  )
}

export default page