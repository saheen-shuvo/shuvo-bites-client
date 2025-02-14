/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  // getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    setLoading(true);
    toast.success("Logged Out Successfully");
    return signOut(auth);
  };

  const signInWithGoogle = () => {
    setLoading(true);

    return (
    signInWithPopup(auth, googleProvider)
    )
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        // Get token and store client
        const userInfo = {email: currentUser.email};
        axiosPublic.post('/jwt', userInfo)
        .then(res => {
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        })
      }
      else{
        // Do Something
        localStorage.removeItem('access-token');
        setLoading(false);
      }

      console.log("State Captured for =", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
