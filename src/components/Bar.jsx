import React from 'react'
import { useNavigate } from 'react-router-dom'

function Bar({text, buttontext, to="/login"}) {
  const navigate =  useNavigate();
  return (
    <>
    <div className='m-16 bg-bar px-12 py-6 rounded-3xl text-white'>
      <p className='text-xs font-normal pt-4'>Request Early Access to Get Started</p>
      <div className='flex justify-between items-center max-md:flex-wrap'>
      <p className='text-xl font-semibold pb-5'>
      {text ? text : "Register Today & start exploring the endless possibilities."}
      </p>
      <button className='bg-black py-4 px-12 font-semibold rounded-full mb-5' onClick={()=> {
              navigate(`${to}`)
              window.scrollTo(0, 0);
            }}>{ buttontext ? buttontext : "Get Started" }</button>
      </div>
    </div>
    </>
  )
}

export default Bar
