import React from 'react'

function Messages({messages}) {
  return (
    <div className='flex flex-wrap'>
      {messages.map((message) => (
        <div className="xl:w-1/3 md:w-1/2 p-4" key={message.id}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Review by : {message.username}</h2>
          <p className="leading-relaxed text-base">Message : {message.message}</p>
          <p className="leading-relaxed text-base">Date : {message.date}</p>
        </div>
      </div>
      ))
      }
    </div>
  )
}

export default Messages
