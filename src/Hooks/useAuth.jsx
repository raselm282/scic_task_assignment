import { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';

const useAuth = () => {
    const auth = useContext(AuthContext)
  return auth
};

export default useAuth;