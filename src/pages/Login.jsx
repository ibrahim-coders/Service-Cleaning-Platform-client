import Lottie from 'lottie-react';
import { LiaEyeSolid } from 'react-icons/lia';
import { BsEyeSlash } from 'react-icons/bs';

import logings from '../assets/Animation - 1733925332827.json';
import { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../Context/AuthContext';
import toast from 'react-hot-toast';

// import toast from 'react-hot-toast';

const Login = () => {
  // const location = useLocation();

  const navigate = useNavigate();
  // const from = location.state || '/';
  const { UserLogin, singwithGoogle } = useContext(AuthProvider);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const passwordVisibility = () => {
    setShowPasswords(!showPasswords);
  };
  const handleLogin = e => {
    e.preventDefault();
    setError('');

    UserLogin(email, password)
      .then(result => {
        console.log('sign in', result.user);

        toast.success('Successfully login!');
        navigate('/');
        // navigate(from);
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          setError('This email is not registered. Please sign up first.');
        } else if (err.code === 'auth/wrong-password') {
          setError('The password is incorrect. Please try again.');
        } else {
          setError('Login failed. Please try again.');
        }
      });
  };
  const handleGoogleSignIn = () => {
    singwithGoogle()
      .then(result => console.log(result.user))
      .catch(error => console.log(error.message));
  };
  return (
    <div className="flex flex-col items-center md:flex-row md:justify-between justify-center min-h-screen max-w-4xl w-full mx-auto p-4 gap-4">
      {/* Lottie Animation */}
      <div className="w-full">
        <Lottie animationData={logings}></Lottie>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Login
        </h2>
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        >
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Password Field */}
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <div className="relative mb-4">
            <input
              type={showPasswords ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <span
              onClick={passwordVisibility}
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
            >
              {showPasswords ? <LiaEyeSolid /> : <BsEyeSlash />}
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm text-gray-500 py-2">
            Create new account ?
            <Link className="underline pl-2 text-sky-500" to="/register">
              Sign Up
            </Link>
          </p>
        </div>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="border-t w-full border-gray-300"></div>
          <p className="px-4 text-gray-500 text-sm w-full">Or continue with</p>
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
  );
};

export default Login;
