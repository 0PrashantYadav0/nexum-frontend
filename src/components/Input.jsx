import React from 'react'

function Input({id, label, className, ...props}) {
  return (
    <div className='mx-4 flex flex-col'>
      <label className='px-6' htmlFor={id}>{label}</label>
      <input
              className={`${className} mx-5`}
              id={id}
              {...props}
            />
    </div>
  )
}

export default (Input)
