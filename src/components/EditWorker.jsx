import { useState, useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeWorkerStatus } from '../redux/user/userSlice';
import Input from './Input';

function EditWorker({worker}) {
  const {currentUser} = useSelector((state) => state.user);
  const [success, setSuccess] = useState("");
  const user = currentUser.user;
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const images = [];
  const [formData, setFormData] = useState({
  aadharNo: worker.aadharNo,
  about: worker.about,
  address: worker.address,
  city: worker.city,
  country: worker.country,
  email: worker.email,
  experience: worker.experience,
  firstName: worker.firstName,
  lastName: worker.lastName,
  middleName: worker.middleName,
  phoneNo: worker.phoneNo,
  photoUrl: worker.photoUrl,
  skills: worker.skills,
  state: worker.state,
  userId: worker.userId,
  userName: worker.userName,
})

const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filePerc, setFilePerc] = useState();
  const [error, setError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const res = await fetch('/api/worker/auth/updateWorker', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      setSuccess(data.message);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <main className='p-3 max-w-4xl mx-auto flex flex-col'>
      <h1 className='text-3xl font-semibold text-center'>
        Update Worker
      </h1>
      <p className='text-blue-800 text-center py-2'>{success}</p>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div>
        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
            <Input
              type='text'
              placeholder='Username'
              label='Username'
              className='mx-4 border p-3 rounded-lg'
              id='userName'
              value={formData.userName}
              required
              readOnly
            />
            <Input
              type='text'
              placeholder='First Name'
              label='First Name'
              className='mx-4 border p-3 rounded-lg'
              id='firstName'
              required
              onChange={handleChange}
              value={formData.firstName}
            />
            <Input
              type='text'
              placeholder='Middle Name'
              label='Middle Name'
              className='mx-4 border p-3 rounded-lg'
              id='middleName'
              onChange={handleChange}
              value={formData.middleName}
            />
            <Input
              type='text'
              placeholder='Last Name'
              label='Last Name'
              className='mx-4 border p-3 rounded-lg'
              id='lastName'
              required
              onChange={handleChange}
              value={formData.lastName}
            />
            <Input
              type='text'
              placeholder='Email'
              label='Email'
              className='mx-4 border p-3 rounded-lg'
              id='email'
              required
              onChange={handleChange}
              value={formData.email}
            />
            <Input
              type='number'
              placeholder='Phone Number'
              label='Phone Number'
              className='mx-4 border p-3 rounded-lg'
              id='phoneNo'
              required
              onChange={handleChange}
              value={formData.phoneNo}
            />
            <Input
              type='text'
              placeholder='Address'
              label='Address'
              className='mx-4 border p-3 rounded-lg'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />
            <Input
              type='text'
              placeholder='city'
              label='City'
              className='mx-4 border p-3 rounded-lg'
              id='city'
              required
              onChange={handleChange}
              value={formData.city}
            />
            <Input
              type='text'
              placeholder='state'
              label='State'
              className='mx-4 border p-3 rounded-lg'
              id='state'
              required
              onChange={handleChange}
              value={formData.state}
            />
            <Input
              type='text'
              placeholder='Country'
              label='Country'
              className='mx-4 border p-3 rounded-lg'
              id='country'
              required
              onChange={handleChange}
              value={formData.country}
            />
            <Input
              type='text'
              placeholder='Aadhar Number'
              label='Aadhar Number'
              className='mx-4 border p-3 rounded-lg'
              id='aadharNo'
              required
              onChange={handleChange}
              value={formData.aadharNo}
            />
            <Input
              type='text'
              placeholder='Skills'
              label='Skills'
              className='mx-4 border p-3 rounded-lg'
              id='skills'
              required
              onChange={handleChange}
              value={formData.skills}
            />
          <Input
            type='text'
            placeholder='Experience'
            label='Experience'
            className='mx-4 border p-3 rounded-lg'
            id='experience'
            required
            onChange={handleChange}
            value={formData.experience}
          />
          </div>
          <div className='flex mx-4 flex-col my-4'>
            <label htmlFor="about">About</label>
          <textarea
            type='text'
            placeholder='About'
            label='About'
            className='border p-3 rounded-lg h-32 w-full'
            id='about'
            required
            onChange={handleChange}
            value={formData.about}
          />
          </div>
          <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold p-4'>
              Profile Photo:
            </p>
            <div className='px-4'>
              <div className='flex flex-col flex-1 gap-4'>
                <div className='flex gap-4'>
                  <Input
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
                  {loading ? 'Updating...' : 'Upadate Worker'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}

export default EditWorker
