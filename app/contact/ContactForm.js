"use client";
import { use, useState } from 'react';
import React from 'react';

const ContactForm = () => {
  const [submitStatus, setsubmitStatus] = useState(false);
  const [responseMessage, setresponseMessage] = useState('')
  const [alertColor, setalertColor] = useState('bg-green-500')

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname: e.target.firstName.value,
      email: e.target.email.value,
      message: e.target.message.value
    }

    const jsonData = JSON.stringify(data)

    const res = await fetch('/api/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })

    const result = await res.json();
    console.log(result.data)
    setsubmitStatus(true)
    setresponseMessage(result.data)

    if (!res.ok) {
      setalertColor('bg-red-500')
    } else {
      setalertColor('bg-green-500')
    }
  }

  return (
    <>
      <form className='contact-form mt-4' onSubmit={handlesubmit}>
        <div className='container'>
          <div className='mb-4'>
            <label htmlFor='firstName'>First Name:</label>
            <input type="text" name="firstName" id="firstName" />
          </div>

          <div className='mb-4'>
            <label htmlFor='email'>Email:</label>
            <input type='email' name='email' id='email' />
          </div>

          <div className='mb-4'>
            <label htmlFor='message'>Message:</label>
            <textarea name='message' id="message"></textarea>
          </div>

          <div>
            <button type='submit'>Submit</button>
          </div>
        </div>
      </form>
      {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : null}
    </>
  )
}

const SubmissionAlert = ({ message, alertColor }) => {
  return (
    <div className={`${alertColor} py-2 px-4 mt-4 text-slate-100 rounded-md`}>
      {message}
    </div>
  )
}

export default ContactForm;
