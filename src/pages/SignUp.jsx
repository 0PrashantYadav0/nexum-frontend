import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  setWorkerStatus,
} from '../redux/user/userSlice';
import Input from '../components/Input';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    photoUrl: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('/api/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      console.log(res)
      console.log(data)
      if (data.token === null) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      if(data.token){
        document.cookie = `token=${data.token}`;
      }
      dispatch(signInSuccess(data));
      if(formData.role === "WORK"){
        dispatch(setWorkerStatus());
        navigate('/worker-form');
      }
      else navigate('/');
    } catch (error) {
      setLoading(false);
      dispatch(signInFailure(error.message));
      setError(error.message);
    }
  };

  const handleCheckChange = (e) => {
    if(e.target.checked){
      setFormData({...formData, role:"WORK"})
    }else{
      setFormData({...formData, role:"USER"})
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          type='text'
          placeholder='username'
          label='Username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <Input
          type='email'
          placeholder='email'
          label='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <Input
          type='password'
          placeholder='password'
          label='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mx-8 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth role={formData.role}/>
        <div className='flex gap-4 px-8'>
        <p className='text-lg'>Sign In as Worker : </p>
          <input type="checkbox" value={"WORKER"} onChange={handleCheckChange} onAbort={()=>setFormData({...formData, role:"USER"})}/>
        </div>
      </form>
      <div className='flex gap-2 mt-5 mx-8'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      <div className='mx-8'>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
    </div>
  );
}
