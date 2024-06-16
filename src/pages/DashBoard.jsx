import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import ProfileData from '../components/ProfileData';
import Reviews from '../components/Reviews';
import Messages from '../components/Messages';
import PersonalData from '../components/PersonalData';


function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [worker, setWorker] = useState({});
  const [profileData, setProfileData] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [messages, setMessages] = useState(false);
  const [personalData, setPersonalData] = useState(false);

  const getWorkerById = async () => {
    try {
      const token = `Bearer ${currentUser.token}`;
      const res = await axios.get(`/api/worker/show/getWorkerById/${currentUser.user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': String(token),
        },
      });
      setWorker(res.data.data[0])
    } catch (error) {
    }
  }

  const [reviewsData, setReviewsData] = useState([{}]);
  const getAllReview = async () => {
    try {
      const token = `Bearer ${currentUser.token}`;
      const res = await axios.get(`/api/review/getReviewByWorkerId/${currentUser.user.id}`,{
        headers: {
          'Authorization': String(token),
        },
      });
      setReviewsData(res.data.data);
    } catch (error) {
    }
  }

  const [messagesData, setMessagesData] = useState([{}]);
  const getAllMessages = async () => {
    try {
      const token = `Bearer ${currentUser.token}`;
      const res = await axios.get(`/api/message/getMessageByWorkerId/${currentUser.user.id}`,{
        headers: {
          'Authorization': String(token),
        },
      },
    );
      setMessagesData(res.data.data);
    } catch (error) {
    }
  }

  useEffect(() => {
    getAllReview();
    getWorkerById();
    getAllMessages();
  }, []);

  function profileChange() {
    setProfileData(true);
    setReviews(false);
    setMessages(false);
    setPersonalData(false);
  }

  function reviewsChange() {
    setProfileData(false);
    setReviews(true);
    setMessages(false);
    setPersonalData(false);
  }

  function messagesChange() {
    setProfileData(false);
    setReviews(false);
    setMessages(true);
    setPersonalData(false);
  }

  function personalDataChange() {
    setProfileData(false);
    setReviews(false);
    setMessages(false);
    setPersonalData(true);
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <div className="flex mx-auto flex-wrap mb-20">
          <a className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none ${profileData ? "bg-gray-100 border-indigo-500 text-indigo-500 " : ""} tracking-wider rounded-t`}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg><button onClick={profileChange}>Profile</button>
          </a>
          <a className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider  ${reviews ? "bg-gray-100 border-indigo-500 text-indigo-500 " : ""}`}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg><button onClick={reviewsChange}>Reviews</button>
          </a>
          <a className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider  ${messages ? "bg-gray-100 border-indigo-500 text-indigo-500 " : ""}`}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="3"></circle>
              <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
            </svg><button onClick={messagesChange}>Messages</button>
          </a>
          <a className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider  ${personalData ? "bg-gray-100 border-indigo-500 text-indigo-500 " : ""}`}>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg><button onClick={personalDataChange}>Personal Data</button>
          </a>
        </div>
        {profileData && <ProfileData worker={worker}/>}
        {reviews && <Reviews reviews={reviewsData}/>}
        {messages && <Messages messages={messagesData}/>}
        {personalData && <PersonalData worker={worker}/>}
      </div>
    </section>
  );
};


export default Dashboard;
