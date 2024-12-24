import logo from '../../assets/house-cleaning-logo-2AKR9B1.jpg';

import { Link, NavLink } from 'react-router-dom';
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
          <span className="font-bold text-2xl">
            <span className="text-green-500 px-2">Service</span>
            <span className="text-sky-600">Cleaning</span>
          </span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/service">Service</NavLink>
          </li>
          {user?.email && (
            <>
              <li>
                <NavLink to="/addService">Add Service</NavLink>
              </li>
              <li>
                <NavLink to="/review">My Review</NavLink>
              </li>
            </>
          )}
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
