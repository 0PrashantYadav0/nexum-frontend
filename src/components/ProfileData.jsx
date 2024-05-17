import React from 'react';
import { useSelector } from 'react-redux';

function ProfileData({ worker }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="lg:w-full mx-auto flex flex-wrap justify-around bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 text-white rounded-lg shadow-lg p-8">
      <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-200 tracking-widest">{worker.userName}</h2>
        <h1 className="text-white text-3xl title-font font-bold mb-4">
          <span className='capitalize px-1'>{worker.firstName}</span>
          <span className='capitalize px-1'>{worker.middleName}</span>
          <span className='capitalize px-1'>{worker.lastName}</span>
        </h1>
        
        <div className='flex flex-col lg:flex-row justify-around items-center'>
          <div className='flex justify-center lg:gap-24 md:flex-row flex-col md:px-12 py-4 md:gap-12 gap-4 rounded-2xl mb-4 px-4'>
            <img alt="profile" className="h-80 w-80 object-cover object-center rounded-full border-4 border-white shadow-md" src={worker.photoUrl} />
          </div>
          <div className="mt-6 lg:w-1/2 bg-white bg-opacity-10 p-6 rounded-lg">
            <div className="pb-5 border-gray-100 rounded-xl">
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Skill:</p>
                <p className='px-4 text-gray-200'>{worker.skills}</p>
              </div>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Contact Details</p>
                <p className='px-4 text-gray-200'>{worker.email}</p>
                <p className='px-4 text-gray-200'>{worker.phoneNo}</p>
              </div>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Address:</p>
                <p className='px-4 text-gray-200'>Local Address: {worker.address}</p>
                <p className='px-4 text-gray-200'>State: {worker.state}</p>
                <p className='px-4 text-gray-200'>City: {worker.city}</p>
                <p className='px-4 text-gray-200'>Country: {worker.country}</p>
              </div>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>Experience:</p>
                <p className='px-4 text-gray-200'>{worker.experience}</p>
              </div>
              <div className='mb-4'>
                <p className='text-lg font-semibold'>About:</p>
                <p className='px-4 text-gray-200'>{worker.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
