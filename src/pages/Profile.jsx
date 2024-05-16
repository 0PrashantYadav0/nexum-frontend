import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({email: currentUser.user.email, username: currentUser.user.username, phoneNumber: currentUser.user.phoneNumber, password: "", photoUrl: currentUser.user.photoUrl});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photoUrl: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const token = `Bearer ${currentUser.token}`;
      const res = await axios.post(`/api/update/${currentUser.user.id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': String(token),
        },
      });
      const data = res.data;
      console.log(res.data)
      if (data.token === null) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const token = `Bearer ${currentUser.token}`;
      
      const res = await axios.get('/api/logout', {
        headers: {
          'Authorization': String(token),
        },
      });
      // const data = await res.json();
      if(res.status == 200){
        dispatch(signOutUserSuccess());
        navigate('/sign-in')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto pb-24'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.photoUrl || currentUser.user.photoUrl}
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
        <Input
          type='text'
          placeholder='username'
          label='Username'
          defaultValue={currentUser.user.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <Input
          type='email'
          placeholder='email'
          label='Email'
          id='email'
          defaultValue={currentUser.user.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Phone Number'
          label='Phone Number'
          id='phoneNumber'
          defaultValue={currentUser.user.phoneNumber}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <Input
          type='password'
          placeholder='password'
          label='Password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 mx-9'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5 mx-9'>
        <span
          className='text-blue-700 cursor-pointer'
        >
          {currentUser.user.role === 'WORK' ? <Link to={"/dashboard"}> Visit Your DashBoard </Link> : <Link to={"/workers"}> Hire new Worker </Link> }
        </span>
        <button onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </button>
      </div>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  );
}