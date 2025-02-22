/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  // getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import AuthContext from './AuthContext'
import { auth } from '../Firebase/firebase.init'
// import useAxiosPublic from '../Hooks/useAxiosPublic'
// import AuthContext from './AuthContext'
// import axios from 'axios'

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
//   const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginWithEmailPassword = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
      // phoneNumber: phone,
      // address: address,
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      // console.log('CurrentUser-->', currentUser)
        setUser(currentUser)
    //   if (currentUser) {
    //     // get token and store client
    //     const userInfo = { email: currentUser.email };
    //     axiosPublic.post('/jwt', userInfo)
    //         .then(res => {
    //             if (res.data.token) {
    //                 localStorage.setItem('access-token', res.data.token);
    //                 setLoading(false);
    //             }
    //         })
    // }
    // else {
    //     // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
    //     localStorage.removeItem('access-token');
    //     setLoading(false);
    // }
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    signOutUser,
    createUser,
    updateUserInfo,
    loginWithGoogle,
    loginWithEmailPassword
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
