import { useNavigate } from "react-router-dom";
import nexum from "../assets/nexum-no.png";
import { useSelector } from "react-redux";
import people from "../assets/people.png";
// import Links from "../Links";


function MainHeader() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <div className="flex px-16 pt-12 max-lg:flex-wrap-reverse max-md:p-2 ">
      <div className="px-4">
        <h1 className='bg-text text-7xl font-semibold py-8 text-start max-lg:text-4xl text-gray-600'><strong className="text-gray-800">Nexum</strong><br/>Discover Your Next Opportunity Today!</h1>
        <p className="text-gray-800 mb-7">
        At NEXUM, we connect daily wage workers with meaningful job opportunities across various industries. Our platform offers a user-friendly experience, ensuring easy navigation and secure payments. Join us to explore, engage, and thrive in the world of daily wage work.
        </p>
        <div>
        <div className="py-2 flex">
          <img src={people} alt="poeple" className="max-md:w-full"/>
          <p className="text-white py-2 pl-2 text-sm max-md:text-xs">Connect with lots and lots of peoples....</p>
        </div>
        </div>
      </div>
      <div className="w-full">
        <img src={nexum} alt="ai" className="w-full rounded-lg"/>
      </div>
    </div>
    {/* <Links />  */}
    
    </>
  )
}

export default MainHeader
