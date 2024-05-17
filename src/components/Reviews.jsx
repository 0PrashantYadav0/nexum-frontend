import React from 'react'

function Reviews({reviews}) {
  return (
    <div className='flex flex-wrap'>
      {reviews.length === 0 && <h1 className='h1 text-center'>No Reviews</h1>}
      {reviews.map((review) => (
        <div className="xl:w-1/3 md:w-1/2 p-4" key={review.id}>
        <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Review by : {review.userId}</h2>
          <p className="leading-relaxed text-base">Comment : {review.comment}</p>
          <p className="leading-relaxed text-base">Rating : {review.rating}</p>
        </div>
      </div>
      ))
      }
    </div>
  )
}

export default Reviews
