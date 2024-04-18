import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateWorker';
import AuthLayout from "./components/AuthLayout"
import ContactUs from './pages/ContactUs';
import WrokerProtected from './components/WorkerProtected';

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
        <Route path='/worker-signin' element={<WrokerProtected><CreateListing /></WrokerProtected>} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
