import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

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
      console.log(res.data.data);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {data.map((worker) => (
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full" key={worker.userId}>
              <a class="block relative h-48 rounded overflow-hidden">
                <img alt="photoUrl" class="object-cover object-center w-full h-full block" src={worker.photoUrl}/>
              </a>
              <div class="mt-4">
                <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1 capitalize">{(worker.firstName? worker.firstName : "") +" "+ (worker.middleName? worker.middleName : "") + " "+(worker.lastName? worker.lastName : "")}</h3>
                <p class="text-gray-900 title-font text-md font-medium">Email : {worker.email}</p>
                <p class="text-gray-900 title-font text-md font-medium">Phone Number : {worker.phoneNo}</p>
                <p class="mt-1 text-gray-900">Skills : {worker.skills}</p>
                <p class="mt-1 text-sm">Rating : {worker.rating}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>
    </>
  );
}
