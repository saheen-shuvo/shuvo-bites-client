/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import authImg from "../../assets/others/authentication2.png";
import SocialLogin from "../../shared/SocialLogin";

const SignIn = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        toast.success("Logged in Successfully.");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.warn("Wrong Credentials. Try again.");
      });
  };

  const handleValidateCaptcha = (e) => {
    e.preventDefault();
    const user_captcha_value = captchaRef.current.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
      toast.success("Captcha Matched! Well done!");
    }
  };

  return (
    <div className="auth-bg hero min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center p-4 lg:gap-28">
      {/* Animation Section */}
      <div className="w-full lg:w-[30%] flex justify-center mt-14 lg:mt-0 mb-6 lg:mb-0">
        <img src={authImg} alt="" />
      </div>

      {/* Form Section */}
      <div className="card  w-full max-w-sm lg:w-[70%] shadow-2xl p-6 bg-base-300 mb-8 lg:mb-0">
        <h1 className="text-center text-3xl font-bold mb-6">Sign in now!</h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  className="text-blue-900 label-text-alt link link-hover"
                  to="/register"
                >
                  Click here
                </Link>
              </p>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input
              type="text"
              name="captcha"
              ref={captchaRef}
              placeholder="type the text above"
              className="input input-bordered"
              required
            />
            {/* USED CAPTCHA: npm install react-simple-captcha */}
            <button
              onClick={handleValidateCaptcha}
              className="btn shadow-sm btn-xs mt-2 w-full"
            >
              Validate
            </button>
          </div>
          <div className="form-control mt-6">
            <button disabled={disabled} className="btn btn-primary w-full">
              Sign in
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
