/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../AuthContext/AuthContext';

const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext)

  const location = useLocation()

  if (loading) return <span className="loading loading-spinner loading-lg"></span>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} />
};

export default PrivateRoute;



