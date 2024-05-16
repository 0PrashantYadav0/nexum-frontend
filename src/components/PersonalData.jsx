import React from 'react'
import CreateWorker from "../pages/CreateWorker"
import EditWorker from './EditWorker'

function PersonalData({ worker }) {
  console.log(worker)
  return (
    <div className='flex flex-wrap justify-center'>
      <EditWorker worker={worker} />
    </div>
  )
}

export default PersonalData
