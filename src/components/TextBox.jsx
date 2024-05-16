import React from 'react'

function TextBox() {
  return (
    <div className='bg-custom m-20 p-12 shadow-2xl max-md:m-8 rounded-lg'>
      <div className='flex justify-between items-start max-md:flex-wrap'>
        <div>
          <div className='bg-bar w-20 rounded-lg h-1'/>
          <h1 className='py-1'>What is Nexum</h1>
        </div>
        <p className='text-[#1c3146] text-start w-[60%] py-1 max-md:w-full px-2'>Nexum is your go-to platform for connecting daily wage workers with job opportunities. We offer a streamlined experience where individuals can easily find short-term employment in various industries. From construction to event management, our platform simplifies the job search process for workers and helps employers quickly fill their staffing needs. With Nexum, you can explore new opportunities and unlock your potential in the world of daily wage work.</p>
      </div>
      <div className='flex justify-between items-center py-12 max-md:flex-wrap'>
    <p className='bg-text text-5xl font-semibold w-1/2 max-md:w-full py-6'>
        Explore Limitless Possibilities
    </p>
    <p className='bg-text text-2xl font-normal'>
        Dive into the Library
    </p>
</div>
<div>
    <div className='flex gap-4 max-md:flex-wrap'>
        <div className=''>
            <div className='bg-bar w-20 rounded-lg h-1'/>
            <p className='font-bold py-1'>Resource Hub</p>
            <p className='text-[#1c3146] text-start py-1'>Our resource hub serves as a comprehensive toolkit, offering a wealth of information and tools to empower users in their pursuits. From tutorials and guides to templates and tips, unlock the resources you need to succeed.</p>
        </div>
        <div className=''>
            <div className='bg-bar w-20 rounded-lg h-1'/>
            <p className='font-bold py-1'>Community Forum</p>
            <p className='text-[#1c3146] text-start py-1'>Join our vibrant community forum, where users come together to share insights, ask questions, and collaborate on projects. Connect with like-minded individuals, exchange ideas, and expand your network in an engaging and supportive environment.</p>
        </div>
        <div className=''>
            <div className='bg-bar w-20 rounded-lg h-1'/>
            <p className='font-bold py-1'>Skill Development</p>
            <p className='text-[#1c3146] text-start py-1'>Embark on a journey of skill development with our curated educational resources. From online courses and workshops to skill assessments and certifications, empower yourself to learn, grow, and excel in your chosen field.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default TextBox
