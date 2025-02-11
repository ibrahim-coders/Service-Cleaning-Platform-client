import { Link, NavLink } from 'react-router-dom';
import { AuthProvider } from '../../Context/AuthContext';
import { useContext, useState } from 'react';
import logo from '../../assets/house-cleaning-logo-2AKR9B1.jpg';
import Switch from 'react-switch';
const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { user, signOutUser, theme, setTheme, toggleTheme } =
    useContext(AuthProvider);

  const handleSignout = () => {
    signOutUser()
      .then(result => console.log('Signed out:', result.user))
      .catch(error => {
        console.error('Sign-out error:', error.message);
      });
  };

  const toggleButtonClasses = isToggleOpen
    ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0'
    : '';

  const menuClasses = isToggleOpen
    ? 'visible opacity-100 backdrop-blur-sm'
    : 'invisible opacity-0';

  return (
    <header className="relative  z-20 w-full border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="relative mx-auto max-w-full lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/* Logo */}
          <div className="flex-1 mt-2 ">
            <Link to="/" className="flex  gap-2 items-center ml-10">
              <img
                className="w-10 h-10 rounded-full "
                src={logo}
                alt="Service Cleaning Logo"
              />
            </Link>
            <span className=" text-2xl">
              <span className="text-green-500 px-2">Service</span>
              <span className="text-sky-600">Clean</span>
            </span>
          </div>

          {/* Toggle Button */}
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden ${toggleButtonClasses}`}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? 'true' : 'false'}
            aria-controls="navbar-menu"
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>

          {/* Navigation Menu */}
          <ul
            id="navbar-menu"
            role="menubar"
            aria-label="Select page"
            className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0 lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0 lg:pt-0 lg:opacity-100 ${menuClasses}`}
          >
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-4 transition-colors duration-300 lg:px-3 ${
                    isActive ? 'text-emerald-600' : 'hover:text-emerald-500'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  `flex items-center gap-2 py-4 transition-colors duration-300 lg:px-3 ${
                    isActive ? 'text-emerald-600' : 'hover:text-emerald-500'
                  }`
                }
              >
                Service
              </NavLink>
            </li>
            {user?.email && (
              <li role="none" className="flex items-stretch">
                <NavLink
                  to="/addService"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-4 transition-colors duration-300 lg:px-3 ${
                      isActive ? 'text-emerald-600' : 'hover:text-emerald-500'
                    }`
                  }
                >
                  Add Service
                </NavLink>
              </li>
            )}
            {user?.email && (
              <li role="none" className="flex items-stretch">
                <NavLink
                  to="/myservice"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-4 transition-colors duration-300 lg:px-3 ${
                      isActive ? 'text-emerald-600' : 'hover:text-emerald-500'
                    }`
                  }
                >
                  My Service
                </NavLink>
              </li>
            )}
            {user?.email && (
              <li role="none" className="flex items-stretch">
                <NavLink
                  to="/review"
                  className={({ isActive }) =>
                    `flex items-center gap-2 py-4 transition-colors duration-300 lg:px-3 pr-4 ${
                      isActive ? 'text-emerald-600' : 'hover:text-emerald-500'
                    }`
                  }
                >
                  My Review
                </NavLink>
              </li>
            )}
          </ul>
          <button className="mx-2">
            <Switch onChange={toggleTheme} checked={theme === 'dark'} />
          </button>

          {/* Auth Buttons */}
          <div className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
            {user && (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div title={user?.displayName} className="w-10 rounded-full">
                    <img
                      referrerPolicy="no-referrer"
                      alt="User Profile Photo"
                      src={user?.photoURL}
                      className=" border-green-600"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="mt-2">
                    <button
                      onClick={handleSignout}
                      className="bg-gray-200 block text-center"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {!user && (
              <Link to="/login" className="btn bg-warning text-black">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
