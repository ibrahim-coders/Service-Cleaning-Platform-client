import { useContext, useState } from 'react';
import { BsEyeSlash } from 'react-icons/bs';
import { LiaEyeSolid } from 'react-icons/lia';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AuthProvider } from '../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.console';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const { createNewUser, singwithGoogle } = useContext(AuthProvider);
  const location = useLocation();

  const navigate = useNavigate();
  const from = location.state || '/';

  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const passwordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handelRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    // console.log(name, email, password, photoURL);

    setError('');
    if (!email) {
      setError('Email is required!');
      return;
    }
    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must include at least one lowercase letter.');
      return;
    }

    if (!/\d/.test(password)) {
      setError('Password must include at least one number.');
      return;
    }

    createNewUser(email, password)
      .then(result => {
        console.log('User created:', result.user);
        toast.success('Registration successful!');
        // Update user profile
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL,
        });
      })
      .then(() => {
        navigate(from);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError(
            'This email is already in use. Please use a different email.'
          );
        } else if (error.code === 'auth/weak-password') {
          setError('Password must be at least 6 characters long.');
        } else {
          setError('An error occurred. Please try again.');
        }
        console.error('Error:', error.message);
      });
  };

  const handleGoogleSignIn = () => {
    singwithGoogle()
      .then(result => {
        console.log(result.user);
        toast.success('Registration successful!');
        navigate(from);
      })

      .catch(error => console.log(error.message));
  };
  return (
    <div>
      <Helmet>
        <title>Service| Register</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-4xl w-full mx-auto p-4 gap-4">
        {/* Lottie Animation */}
        <dotlottie-player
          src="https://lottie.host/bd34159c-d9cc-438f-b95c-8b6bcf85be7d/AzewCBnRkN.lottie"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop
          autoplay
          className="mb-8 md:mb-0 md:mr-6"
        ></dotlottie-player>

        {/* Registration Form */}
        <div className=" shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
          {/* Registration Form */}
          <form onSubmit={handelRegister} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3  focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block  text-sm font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3  focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="photoURL" className="block font-medium mb-2">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your photo URL"
              />
            </div>
            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block  text-sm font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
                <span
                  onClick={passwordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
                >
                  {showPasswords ? <LiaEyeSolid /> : <BsEyeSlash />}
                </span>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Register
            </button>
          </form>
          {/* Divider */}
          <p className="text-center text-sm  mt-4">
            I already have an account ?
            <Link className="underline pl-2 text-sky-600" to="/login">
              Login
            </Link>
          </p>
          <div className="flex items-center my-6">
            <div className="border-t w-full border-gray-300"></div>
            <p className="px-4  text-sm w-full">Or continue with</p>
            <div className="border-t w-full border-gray-300"></div>
          </div>
          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 w-full px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-lg font-medium">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
