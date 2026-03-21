import React from 'react'

const BannerSecond = () => {
  return (
      <section className='h-[50vh] bannersecond min-h-80  bg-[url("/home.jpg")] relative flex flex-wrap items-center'>
         <div className='absolute bg-slate-900 inset-0 z-0 opacity-40'></div>
         <div className='container'>
             <h1 className='text-6xl text-center text-slate-100 relative z-10 py-8'>Blog</h1>
             <p className='relative z-10 text-center text-slate-200 text-2xl'>Read our latest articles</p>
         </div>
      </section>
  )
}

export default BannerSecond