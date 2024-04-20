import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import nexumno from "../assets/nexum-no.png"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  const MenuBlock = ({ toggleMenu }) => {
    return (
      <div className='absolute right-0 top-14 hidden max-lg:block z-20'>
        {toggleMenu && <div className='bg-gray-400 p-8 text-end flex flex-col justify-end items-end '>
          <Link to='/'>
            <li className='text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          {currentUser ?
          <>
            <Link to='/workers'>
              <li className=' text-slate-700 hover:underline'>
                Workers
              </li>
            </Link>
            <Link to='/hero'>
              <li className=' text-slate-700 hover:underline'>
                Hero
              </li>
            </Link>
            </>: ''}
          <Link to='/about'>
            <li className=' text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/contactus'>
            <li className=' text-slate-700 hover:underline'>
              Contact Us
            </li>
          </Link>
        </div>}
      </div>
    )
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap items-center justify-center gap-4'>
            <img src={nexumno} alt=""  className='h-10'/>
            <span className='text-slate-500'>Nexum</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          {currentUser ?
          <>
            <Link to='/workers'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                Workers
              </li>
            </Link>
            <Link to='/hero'>
              <li className='hidden sm:inline text-slate-700 hover:underline'>
                Hero
              </li>
            </Link>
            </>: ''}
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/contactus'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>
              Contact Us
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover aspect-video'
                src={currentUser.user.photoUrl}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
          <div className='px-4'>
            {toggleMenu ? (
              <RiCloseLine
                className='sm:hidden block'
                color="#000"
                size={27}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            ) : (
              <RiMenu3Line
                className='sm:hidden block'
                color="#000"
                size={27}
                onClick={() => setToggleMenu((prev) => !prev)}
              />
            )}
          </div>
          <MenuBlock toggleMenu={toggleMenu} />
        </ul>
      </div>
    </header>
  );
}
