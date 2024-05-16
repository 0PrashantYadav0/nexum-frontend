import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  removeWorkerStatus,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import Input from '../components/Input';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post('/api/login', formData, {
        headers: {
        'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      if(data.user === null){
        dispatch(signInFailure('Invalid credentials'));
        throw new Error('Invalid credentials');
      }
      if(data.token){
        document.cookie = `token=${data.token}`;
      }
      dispatch(signInSuccess(data));
      dispatch(removeWorkerStatus())
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          type='username'
          placeholder='username'
          label='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
          required
        />
        <Input
          type='password'
          placeholder='password'
          label='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 mx-8 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 mx-8'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      <div className='mx-8'>
      {error && <p className='text-red-500 mt-5'>Error in Login....Please check username and password again</p>}
      </div>
    </div>
  );
}
