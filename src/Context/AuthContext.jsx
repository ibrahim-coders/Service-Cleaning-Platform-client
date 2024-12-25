import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.console';
import axios from 'axios';

export const AuthProvider = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //login
  const UserLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //google
  const provider = new GoogleAuthProvider();
  const singwithGoogle = () => {
    setLoading(true);

    return signInWithPopup(auth, provider);
  };
  //signout
  const signOutUser = () => {
    setLoading(false);

    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser);
      if (currentUser?.email) {
        setUser(currentUser);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser.email },
          { withCredentials: true }
        );
        console.log(data);
      } else {
        setUser(currentUser);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/logout`,
          {
            withCredentials: true,
          }
        );
        console.log('Logout Response:', data);
      }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    createNewUser,
    user,
    loading,
    UserLogin,
    singwithGoogle,
    signOutUser,
  };
  return (
    <div>
      <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
    </div>
  );
};

export default AuthContext;
