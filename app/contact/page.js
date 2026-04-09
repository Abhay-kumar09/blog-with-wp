import React from 'react'
import Head from 'next/head'
import BannerSecond from '../components/BannerSecond'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact Us - Cool Nomad',
}

const page = () => {
  return (
    <>
      <BannerSecond title={"Contact Us"} />
      <ContactForm />
    </>
  )
}

export default page