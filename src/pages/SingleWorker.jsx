import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FeedbackForm from '../components/FeedBackForm';
import { useSelector } from 'react-redux';
import { BsStarFill } from 'react-icons/bs';
import Input from '../components/Input';


//TODO: Implement SingleWorker
function SingleWorker() {
  //get worker id from url
  const workerId = window.location.pathname.split("/")[2]
  const [worker, setWorker] = useState({});
  const { currentUser } = useSelector(state=>state.user)
  const date = new Date;
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState({
    message:'',
    date: String(date),
    userId: String(currentUser.user.id),
    workerId: workerId,
    username: currentUser.user.username,
  })

  const getWorkerById = async () => {
    try {
      const res = await axios.get(`/api/worker/getWorkerById/${workerId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setWorker(res.data.data[0])
      console.log(worker)
    } catch (error) {
      console.log(error)
    }
  }

  const totalRating = (reviews) => {
    let totalRating = 0;
    let count = reviews.length;
    reviews.map((review) => {
      totalRating+=review.rating
    })
    return (totalRating/count).toFixed(2);
  }

  const handleMessageSubmit = () => {
    console.log(message)
    axios.post('/api/message/addMessage', message)
    .then((response) => {
      setMessage({});
    })
    .catch((error) => {
      console.log(error)
    })
  
  }

  const [reviews, setReviews] = useState([{}]);
  const getAllReview = async () => {
    try {
      const res = await axios.get(`/api/review/getReviewByWorkerId/${workerId}`);
      setReviews(res.data.data);
      console.log(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllReview();
    getWorkerById();
  }, []);

  useEffect(() => {
    setRating(totalRating(reviews));
  }
  , [reviews]);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <h1 className='text-3xl text-center text-violet-900 font-bold py-6'>Personal Worker Portfolio</h1>
      <div className="container px-5 mx-auto">
        <div className="lg:w-full mx-auto flex flex-wrap">
          <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font capitalize text-gray-500 tracking-widest">{worker.userName}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              <span className='capitalize px-1'>{worker.firstName}</span>
              <span className='capitalize px-1'>{worker.middleName}</span>
              <span className='capitalize px-1'>{worker.lastName}</span>
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">Rating : {rating}</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <span className="text-gray-600 ml-3">Total Reviews : {reviews.length}</span>
              </span>
            </div>
            <div className='flex justify-center lg:gap-24 md:flex-row flex-col bg-gray-200 md:px-12 py-4 md:gap-12 gap-4 rounded-2xl mb-4 px-4'>
            <div className="mt-6 items-center pb-5 border-b-2 border-gray-100 rounded-xl">
            <img alt="ecommerce" className="h-80 object-cover object-center rounded" src={worker.photoUrl} />
            </div>
            <div className="mt-6 items-center pb-5 border-b-2 border-gray-100 rounded-xl">
              <div className=''>
                <p className='text-lg font-semibold'>Skill : </p>
                <p className='px-4 text-gray-900'>{worker.skills}</p>
              </div>
              <div className=''>
                <p className='text-lg font-semibold'>Contact Details</p>
                <p className='px-4 text-gray-900'>{worker.email}</p>
                <p className='px-4 text-gray-900'>{worker.phoneNo}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>Address : </p>
                <p className='px-4 text-gray-900'>Local Address : {worker.address}</p>
                <p className='px-4 text-gray-900'>State : {worker.state} </p>
                <p className='px-4 text-gray-900'>City : {worker.city}</p>
                <p className='px-4 text-gray-900'>Country : {worker.country}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>Exprience : </p>
                <p className='px-4 text-gray-900'>{worker.experience}</p>
              </div>
              <div>
                <p className='text-lg font-semibold'>About : </p>
                <p className='px-4 text-gray-900 text-wrap'>{worker.about}</p>
              </div>
            </div>
            </div>
            <div className='pb-4'>
                <p className='text-lg font-semibold'>Reviews : </p>
                {reviews.map((review, index) => (
                  <div key={index} className='flex gap-2'>
                    <p className='px-4 text-gray-900'><span className='text-sm'>Comment : </span> {review.comment}</p>
                    <p>Rating : {review.rating}</p>
                  </div>
                ))}
                {reviews.length === 0 ? <p>Sorry... No reviews yet.</p> : ""}
            </div>
            <div className="relative mb-4">
              <p className='text-xl font-bold pb-4'>Send Message to Worker</p>
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Message</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out mb-4 mx-0" onChange={(e)=>setMessage({...message, message: e.target.value })}/>
              <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg" onClick={handleMessageSubmit}>Send</button>
            </div>

          </div>
          
        </div>
        <div className='py-4'>
        <p className='py-4 text-center font-bold text-2xl'>Review</p>
        <FeedbackForm workerId={workerId} userId={currentUser.user.id}/>
        </div>
        <div className="flex gap-6 md:flex-row flex-col container px-5 py-24 mx-auto lg:w-4/5">
          <div className='sm:w-1/2 w-full'>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleWorker;
