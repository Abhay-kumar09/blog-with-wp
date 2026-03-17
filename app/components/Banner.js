import React from 'react'
import Link from 'next/link'

const Banner = () => {
    return (
        <section className='banner min-h-220 flex flex-wrap items-center'>
            <div className='container'>
                <div className='min-h-50vh flex flex-col items-center justify-center z-10 relative'>
                    <h1 className='text-6xl text-center text-slate-100'>Welcome to <span className='text-yellow-400'>
                        CoolNomad
                    </span> Travel Blog</h1>
                    <div className='mt-20'>
                        <Link href={'/blog'} className='text-3xl text-slate-800 bg-slate-100 border py-3 px-4 hover:bg-yellow-300 transition-all duration-300 ease-in-out rounded-lg'>
                            Read Blog
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner