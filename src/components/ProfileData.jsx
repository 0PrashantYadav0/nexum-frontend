import React from 'react'
import { useSelector } from 'react-redux'

function ProfileData({ worker }) {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)
  return (
    <div className="text-gray-600 flex justify-center body-font">
      <img className="w-1/3 h-full block mx-auto mb-10 object-cover object-center rounded" alt="hero" src={worker.photoUrl || currentUser.user.photoUrl} />
      <div className="w-1/2 grid grid-cols-2 mt-6 pb-5 border-b-2 border-gray-100 rounded-xl">
        <div className="p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Skill</h2>
            <p className="leading-relaxed text-base">{worker.skills}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exprience</h2>
            <p className="leading-relaxed text-base">{worker.experience}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Contact Details</h2>
            <p className="leading-relaxed text-base">Email : {worker.email}</p>
            <p className="leading-relaxed text-base">Phone Number : {worker.phoneNo}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">About</h2>
            <p className="leading-relaxed text-base">{worker.about}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Address</h2>
            <p className="leading-relaxed text-base">Local Address : {worker.address}</p>
            <p className="leading-relaxed text-base">State : {worker.state}</p>
            <p className="leading-relaxed text-base">City : {worker.city}</p>
            <p className="leading-relaxed text-base">Country : {worker.country}</p>
          </div>
        </div>
        
        
      </div>

    </div>
  )
}

export default ProfileData
