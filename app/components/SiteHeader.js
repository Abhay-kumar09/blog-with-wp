import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SiteHeader = ({ className}) => {
    return (
        <header className='fixed top-0 left-0 w-full z-20 '>
            <div className='container'>
                <div className='wrapper flex flex-wrap justify-between items-center'>
                    <div className='logo-area max-w-45 w-full h-30'>
                        <Link href={'/'} className='flex justify-center'>
                            <Image src='/CoolNomad.svg' alt='Logo' width={180} height={120} />
                        </Link>
                    </div>
                    <nav className='text-slate-100'>
                        <ul className='flex justify-center gap-8'>
                            <li><Link href={'/'} className='hover:text-yellow-400 text-white  duration-300 transition-all ease-in-out'>Home</Link></li>
                            <li><Link href={'/blog'} className='hover:text-yellow-400 text-white  duration-300 transition-all ease-in-out'>Blog</Link></li>
                            <li><Link href={'/about'} className='hover:text-yellow-400 text-white  duration-300 transition-all ease-in-out'>About</Link></li>
                            <li><Link href={'/contact'} className='hover:text-yellow-400 text-white  duration-300 transition-all ease-in-out'>Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default SiteHeader