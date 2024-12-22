import logo from '../../assets/house-cleaning-logo-2AKR9B1.jpg';

import { Link } from 'react-router-dom';
import { AuthProvider } from '../../Context/AuthContext';
import { useContext } from 'react';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthProvider);
  const handleSignout = () => {
    signOutUser()
      .then(result => console.log(result.user))
      .catch(error => {
        console.log(error.mesages);
      });
  };
  return (
    <div className="navbar   shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-10 h-10  rounded-full" src={logo} alt="" />
          <span className="font-bold">House_Cleaning </span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/service">Service</Link>
          </li>
          <li>
            <Link to="/addService">Add Service</Link>
          </li>
        </ul>
        {user ? (
          <div className="dropdown dropdown-end z-10">
            <div
              tabIndex={0}
              role="button"
              aria-label="User Menu"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                title={user?.displayName || 'User'}
                className="w-10 rounded-full"
              >
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile"
                  src={user?.photoURL || '/default-avatar.png'}
                  className="border border-green-600"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <button
                  onClick={handleSignout}
                  className="btn bg-warning text-black"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn bg-warning text-black">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
