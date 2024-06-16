import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

function Worker() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/worker/show/getWorker", {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setData(res.data.data.reverse());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const totalRating = (reviews) => {
    let totalRating = 0;
    let count = reviews.length;
    reviews.map((review) => {
      totalRating+=review.rating
    })
    return (totalRating/count).toFixed(2);
  }


  return (
    <section className="text-gray-100 body-font">
      <h1 className="text-3xl text-center bg-text font-semibold my-7">Workers</h1>
      { data.length > 0 ? 
      <div className="container px-5 py-4 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  gap-6">
          {data.map((worker) => (
            <Link to={`/worker/${worker.userId}`} key={worker.userId} className="p-4 w-full bg-card rounded-xl flex-col justify-center items-center px-6 py-4 flex">
            <div className="block relative h-60 rounded overflow-hidden">
              <img alt="photoUrl" className="h-full block" src={worker.photoUrl} />
            </div>
            <div className='w-full'>
            <p className='text-lg pt-2 text-start capitalize'>{(worker.firstName ? worker.firstName : "") + " " + (worker.middleName ? worker.middleName : "") + " " + (worker.lastName ? worker.lastName : "")}</p>
              <div className='flex justify-between'>
              <p className="mt-1 text-sm text-gray-200">Skills : {worker.skills}</p>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div> :
      loading ? <p className="text-3xl text-center font-semibold my-7">Loading...</p> 
      : <p className="text-3xl text-center font-semibold my-7">No Workers Found</p>}
    </section>
  )
}

export default Worker
