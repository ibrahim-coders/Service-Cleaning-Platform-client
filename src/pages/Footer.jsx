import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/house-cleaning-logo-2AKR9B1.jpg';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <div className="flex-1 mb-6 md:mb-0">
          <Link to="/" className="flex gap-2 items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={logo}
              alt="Work_Cleaning Logo"
            />
            <span className="font-bold text-lg">Work_Cleaning</span>
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-wrap justify-center space-y-6 md:space-y-0 md:space-x-12 md:flex-row">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <Link to="/about-us" className="text-white hover:text-blue-500">
              About Us
            </Link>
            <Link to="/terms-of-use" className="text-white hover:text-blue-500">
              Terms of Use
            </Link>
            <Link to="/services" className="text-white hover:text-blue-500">
              Our Services
            </Link>
            <Link to="/help" className="text-white hover:text-blue-500">
              Help & FAQs
            </Link>
            <Link to="/blog" className="text-white hover:text-blue-500">
              Blog
            </Link>
            <Link to="/contact-us" className="text-white hover:text-blue-500">
              Contact Us
            </Link>
          </div>

          {/* Our Services Section */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <Link
              to="/home-cleaning"
              className="text-white hover:text-green-500"
            >
              Home Cleaning
            </Link>
            <Link
              to="/office-cleaning"
              className="text-white hover:text-green-500"
            >
              Office Cleaning
            </Link>
            <Link
              to="/kitchen-cleaning"
              className="text-white hover:text-green-500"
            >
              Kitchen Cleaning
            </Link>
            <Link
              to="/window-cleaning"
              className="text-white hover:text-green-500"
            >
              Window Cleaning
            </Link>
            <Link
              to="/bathroom-cleaning"
              className="text-white hover:text-green-500"
            >
              Bathroom Cleaning
            </Link>
            <Link
              to="/wall-cleaning"
              className="text-white hover:text-green-500"
            >
              Wall Cleaning
            </Link>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} House Cleaning Service. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
