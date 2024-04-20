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
      const res = await axios.get("/api/worker/getWorker", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(res.data.data);
      setLoading(false);
      console.log(data)
    } catch (error) {
      setLoading(false);
      setError(error.message);
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(data)

  return (
    <section className="text-gray-600 body-font">
      <h1 className="text-3xl text-center font-semibold my-7">Workers</h1>
      { data.length > 0 ? 
      <div className="container px-5 py-4 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1  gap-6">
          {data.map((worker) => (
            <Link to={`/worker/${worker.userId}`} key={worker.userId} className="p-4 w-full bg-gray-300 rounded-xl flex-col justify-center items-center px-6 py-4 flex">
            {console.log(worker)}
            <div className='flex justify-start'>
            <p className='text-balance py-1 text-start capitalize'>{worker.userName}</p>
            </div>
            <div className="block relative h-60 rounded overflow-hidden">
              <img alt="photoUrl" className="h-full block" src={worker.photoUrl} />
            </div>
            <div className="mt-4">
              <p className="text-gray-900 title-font text-md font-medium">{(worker.firstName ? worker.firstName : "") + " " + (worker.middleName ? worker.middleName : "") + " " + (worker.lastName ? worker.lastName : "")}</p>
              <p className="mt-1 text-sm text-gray-900">Skills : {worker.skills}</p>
              <p className="mt-1 text-sm text-gray-900">Rating : {worker.rating}</p>
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
