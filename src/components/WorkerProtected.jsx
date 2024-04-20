import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function WrokerProtected() {
  const { currentUser } = useSelector((state) => state.user);
  if(!currentUser) return <Navigate to='/sign-in' />;
  return currentUser.user.role === "WORK" ? <Outlet /> : <Navigate to='/' />;
}
