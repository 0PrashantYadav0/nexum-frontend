import React from 'react'
import CreateWorker from "../pages/CreateWorker"
import EditWorker from './EditWorker'

function PersonalData({ worker }) {
  console.log(worker)
  return (
    <div className='flex flex-wrap justify-center'>
      <div className="xl:w-1/3 md:w-1/2 p-4" >
        <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Aadhar Number</h2>
          <p className="leading-relaxed text-base">{worker.aadharNo} </p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4" >
        <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Creation Date</h2>
          <p className="leading-relaxed text-base">{worker.createdDate} </p>
        </div>
      </div>
      <EditWorker worker={worker} />
    </div>
  )
}

export default PersonalData
