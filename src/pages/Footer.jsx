import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/house-cleaning-logo-2AKR9B1.jpg';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content p-10">
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
        <p>
          We're your trusted a cleaning <br /> company, dedicated to any kind{' '}
          <br /> of a consistently delivering exceptional <br /> all category
          good cleaning service.
        </p>
      </div>
      <nav>
        <h6 className="footer-title"> About Us</h6>
        <a className="link link-hover">Terms of Use</a>
        <a className="link link-hover"> Our Services</a>
        <a className="link link-hover"> Help & FAQs</a>
        <a className="link link-hover"> Blog</a>
        <a className="link link-hover"> Contact Us</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover"> Office Cleaning</a>
        <a className="link link-hover"> Kitchen Cleaning</a>
        <a className="link link-hover"> Window Cleaning</a>
        <a className="link link-hover"> Wall Cleaning</a>
      </nav>
      <nav>
        <h6 className="footer-title"> Social</h6>
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 transition"
            aria-label="Facebook"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
