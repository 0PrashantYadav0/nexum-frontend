import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';

const FeedbackForm = ({userId, workerId}) => {
  const [feedbackData, setFeedbackData] = useState({
    userId: userId,
    workerId: workerId,
    comment: '',
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  
  const handleStarClick = (rating) => {
    setFeedbackData({ ...feedbackData, rating });
  };

  const handleSubmit = async(e) => {
    console.log(feedbackData)
    e.preventDefault();
    try {
      const res = await axios.post('/api/review/addReview', feedbackData, {
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      console.log(res);
      setFeedbackData({
        message: '',
        rating: 0,
      });
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleStarClick(i)} className="cursor-pointer">
          {feedbackData.rating >= i ? <BsStarFill /> : <BsStar />}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded p-12">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="messcommentage"
            name="comment"
            rows="4"
            placeholder="Your message..."
            value={feedbackData.comment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
            Rating
          </label>
          <div className="flex items-center gap-4 text-3xl">
            {renderStars()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;