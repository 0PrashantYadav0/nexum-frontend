import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateWorker from './pages/CreateWorker';
import AuthLayout from "./components/AuthLayout"
import ContactUs from './pages/ContactUs';
import DashBoard from './pages/DashBoard';
import WrokerProtected from './components/WorkerProtected';
import Worker from './pages/Worker';
import SingleWorker from './pages/SingleWorker';
import Footer from './components/Footer';
import Hero from './pages/Hero';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<AuthLayout authentication={false}><SignIn /></AuthLayout>} />
        <Route path='/sign-up' element={<AuthLayout authentication={false}><SignUp /></AuthLayout>} />
        <Route path='/about' element={<About />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route element= {<WrokerProtected/>}>
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/worker-form' element={<CreateWorker/>}/>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/workers' element={<Worker />} />
          <Route path='/hero' element={<Hero />} />
          <Route path='/worker/:id' element={<SingleWorker />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
