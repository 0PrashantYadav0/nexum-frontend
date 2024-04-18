import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function WrokerProtected() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.user === "WORKER" ? <Outlet /> : <Navigate to='/' />;
}
