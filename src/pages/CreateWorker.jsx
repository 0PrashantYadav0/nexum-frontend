import { useState, useEffect, useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';

export default function CreateListing() {
  const {currentUser} = useSelector((state) => state.user);
  const user = currentUser.user;
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const images = [];
  const [formData, setFormData] = useState({
    aadharNo: '',
    address: '',
    city: '',
    country: '',
    email: '',
    experience: '',
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    phoneNo: '',
    photoUrl: user.photoUrl,
    rating: '',
    skills: '',
    state: '',
    userName: ''
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState();
  const [error, setError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + images.length < 7) {
      console.log(images)
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          images.push(...urls);
          setImageUploadError(false);
          console.log(urls)
          console.log(images[0])
          setFormData({...formData, photoUrl: images[0]})
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
    console.log(images, "images")
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      photoUrl: "",
    });
    //empty the array
    images.splice(0, images.length);
  };


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
      setFormData({
        ...formData,
        photoUrl: images[0],
      })
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
              value={user.username}
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
              value={user.email}
            />
            <input
              type='number'
              placeholder='Phone Number'
              className='mx-4 border p-3 rounded-lg'
              id='phoneNo'
              required
              onChange={handleChange}
              value={user.phoneNumber}
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
            <div className='p-4'>
              <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                  Images:
                  <span className='font-normal text-gray-600 ml-2'>
                    The first image will be the cover (max 6)
                  </span>
                </p>
                <div className='flex gap-4'>
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className='p-3 border border-gray-300 rounded w-full'
                    type='file'
                    id='images'
                    accept='image/*'
                    multiple
                  />
                  <button
                    type='button'
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
                <p className='text-red-700 text-sm'>
                  {imageUploadError && imageUploadError}
                </p>
                {formData.photoUrl &&
                    <div
                      className='flex justify-between p-3 border items-center'
                    >
                      <img
                        src={formData.photoUrl}
                        alt='listing image'
                        className='w-20 h-20 object-contain rounded-lg aspect-video'
                      />
                      <button
                        type='button'
                        onClick={() => handleRemoveImage()}
                        className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                      >
                        Delete
                      </button>
                    </div>
                  }
                <button
                  disabled={loading || uploading}
                  className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                  onClick={handleSubmit}
                >
                  {loading ? 'Creating...' : 'Create listing'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
