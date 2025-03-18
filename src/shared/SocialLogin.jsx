import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext/AuthContext";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data)
        })
        toast.success("Logged in Successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <button onClick={handleGoogleSignIn} className="btn shadow-sm mb-4 w-full">
      <FcGoogle /> Google
      </button>
    </div>
  );
};

export default SocialLogin;
