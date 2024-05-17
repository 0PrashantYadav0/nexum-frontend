import React from 'react'
import { useSelector } from 'react-redux'

function ProfileData({ worker }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="lg:w-full mx-auto flex flex-wrap justify-around bg-bar text-white rounded-lg">
          <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{worker.userName}</h2>
            <h1 className="text-gray-300 text-3xl title-font font-medium mb-1">
              <span className='capitalize px-1'>{worker.firstName}</span>
              <span className='capitalize px-1'>{worker.middleName}</span>
              <span className='capitalize px-1'>{worker.lastName}</span>
            </h1>
            
            <div className='flex flex-row-reverse justify-around'>
            <div className='flex justify-center lg:gap-24 md:flex-row flex-col md:px-12 py-4 md:gap-12 gap-4 rounded-2xl mb-4 px-4'>
            <img alt="ecommerce" className="h-80 object-cover object-center rounded" src={worker.photoUrl} />
            </div>
            <div className="mt-6 items-center pb-5  border-gray-100 rounded-xl">
              <div className=''>
                <p className='text-lg font-semibold'>Skill : </p>
                <p className='px-4 text-gray-300'>{worker.skills}</p>
              </div>
              <div className=''>
                <p className='text-lg font-semibold'>Contact Details</p>
                <p className='px-4 text-gray-300'>{worker.email}</p>
                <p className='px-4 text-gray-300'>{worker.phoneNo}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>Address : </p>
                <p className='px-4 text-gray-300'>Local Address : {worker.address}</p>
                <p className='px-4 text-gray-300'>State : {worker.state} </p>
                <p className='px-4 text-gray-300'>City : {worker.city}</p>
                <p className='px-4 text-gray-300'>Country : {worker.country}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>Exprience : </p>
                <p className='px-4 text-gray-300'>{worker.experience}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>About : </p>
                <p className='px-4 text-gray-300 text-wrap'>{worker.about}</p>
              </div>
            </div>
            </div>
          </div>
          
        </div>
  )
}

export default ProfileData
