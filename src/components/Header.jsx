import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import nexumno from "../assets/nexum-no.png"
import { close, menu } from "../assets";

export default function Header() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className='bg-slate-400 shadow-md px-2 md:px-12'>
      <nav className="w-full flex py-4 justify-between items-center navbar">
      <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap items-center justify-center gap-4'>
            <span className='text-slate-900'>Nexum</span>
          </h1>
        </Link>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
      <ul className="list-none flex justify-end items-start gap-4">
          
            <li className='hidden sm:inline text-slate-700 hover:underline'>
            <Link to='/'>
              Home
              </Link>
            </li>
          
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
          </ul>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[20px] h-[20px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } py-4 absolute top-20 right-0 min-w-[140px] rounded-xl sidebar bg-slate-900 px-3 `}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
          <Link to='/'>
            <li className='sm:inline text-slate-300 hover:underline'>
              Home
            </li>
          </Link>
          {currentUser ?
          <>
            <Link to='/workers'>
              <li className='sm:inline text-slate-300 hover:underline'>
                Workers
              </li>
            </Link>
            <Link to='/hero'>
              <li className='sm:inline text-slate-300 hover:underline'>
                Hero
              </li>
            </Link>
            </>: ''}
          <Link to='/about'>
            <li className='sm:inline text-slate-300 hover:underline'>
              About
            </li>
          </Link>
          <Link to='/contactus'>
            <li className=' text-slate-300 hover:underline'>
              Contact Us
            </li>
          </Link>
          
          </ul>
        </div>
        <Link to='/profile' className='px-4'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover aspect-video'
                src={currentUser.user.photoUrl}
                alt='profile'
              />
            ) : (
              <p className='text-slate-700 hover:underline'> Sign in</p>
            )}
          </Link>
      </div>
    </nav>
    </header>
  );
}
