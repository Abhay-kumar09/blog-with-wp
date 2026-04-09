import React from 'react'

const Intro = ({ eyebrow, title }) => {
  return (
    <section className='intro py-8'>
      <div className='container'>
        <div className='wrapper relative max-w-[60%]'>
          {eyebrow && (
            <span className='text-[16px] eyebrow'>
              {eyebrow}
            </span>
          )}

          {title && (
            <h2 className='text-[40px] font-bold mt-1.5 leading-[1.3]'>
              {title}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}

export default Intro