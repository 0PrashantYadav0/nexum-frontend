import { useState, useEffect, useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {useSelector } from 'react-redux';

export default function CreateListing() {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    aadharNo : '',
    address : '', 
    city : '',
    country: '',
    email: '',
    experience: '',
    firstName: '',
    lastName : '',
    middleName : '',
    password : '',
    phoneNo : '',
    photoUrl : '',
    rating : '',
    skills : '', 
    state : '',
    userName: ''
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState();
  const [error, setError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file) => {
    // const storage = getStorage(app);
    // const fileName = new Date().getTime() + file.name;
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     setFilePerc(Math.round(progress));
    //   },
    //   (error) => {
    //     setFileUploadError(true);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
    //       setFormData({ ...formData, photoUrl: downloadURL })
    //     );
    //   }
    // );
  };

  useEffect(() => {
    if (files) {
      handleFileUpload(files);
    }
  }, [files]);


  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      setLoading(true);
      setError(false);
      const res = await fetch('/api/worker/addWorker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto flex flex-col'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Worker
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4'>
          <div>
          <input
            type='text'
            placeholder='Username'
            className='mx-4 border p-3 rounded-lg'
            id='userName'
            required
            onChange={handleChange}
            value={formData.userName}
          />
          <input
            type='text'
            placeholder='First Name'
            className='mx-4 border p-3 rounded-lg'
            id='firstName'
            required
            onChange={handleChange}
            value={formData.firstName}
          />
          <input
            type='text'
            placeholder='Middle Name'
            className='mx-4 border p-3 rounded-lg'
            id='middleName'
            onChange={handleChange}
            value={formData.middleName}
          />
          </div>
          <div>
          <input
            type='text'
            placeholder='Last Name'
            className='mx-4 border p-3 rounded-lg'
            id='lastName'
            required
            onChange={handleChange}
            value={formData.lastName}
          />
          <input
            type='text'
            placeholder='Email'
            className='mx-4 border p-3 rounded-lg'
            id='email'
            required
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type='number'
            placeholder='Phone Number'
            className='mx-4 border p-3 rounded-lg'
            id='phoneNo'
            required
            onChange={handleChange}
            value={formData.phoneNo}
          />
          </div>
          <div>
          <input
            type='text'
            placeholder='Address'
            className='mx-4 border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type='text'
            placeholder='city'
            className='mx-4 border p-3 rounded-lg'
            id='city'
            required
            onChange={handleChange}
            value={formData.city}
          />
          <input
            type='text'
            placeholder='state'
            className='mx-4 border p-3 rounded-lg'
            id='state'
            required
            onChange={handleChange}
            value={formData.state}
          />
          </div>
          <div>
          <input
            type='text'
            placeholder='Country'
            className='mx-4 border p-3 rounded-lg'
            id='country'
            required
            onChange={handleChange}
            value={formData.country}
          />
          <input
            type='text'
            placeholder='Aadhar Number'
            className='mx-4 border p-3 rounded-lg'
            id='aadharNo'
            required
            onChange={handleChange}
            value={formData.aadharNo}
          />
          <input
            type='text'
            placeholder='Skills'
            className='mx-4 border p-3 rounded-lg'
            id='skills'
            required
            onChange={handleChange}
            value={formData.skills}
          />
          </div>
          <input
            type='text'
            placeholder='Experience'
            className='mx-4 border p-3 rounded-lg'
            id='experience'
            required
            onChange={handleChange}
            value={formData.experience}
          />
          <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold p-4'>
            Profile Photo:
          </p>
          <div className='flex gap-4'>
            {/* <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            /> */}
            
          </div>
          <div className='p-4'>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          <input
          onChange={(e) => setFiles(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1O7rnEprg-fBF7vHgs7fdrV721LHfAHlhoLIG2gK59Q&s"}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover aspect-video cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
          <button
            disabled={loading || uploading}
            type='submit'
            onClick={handleSubmit}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-4'
          >
            {loading ? 'Creating...' : 'Create Worker'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </div>
        </div>
      </form>
    </main>
  );
}
