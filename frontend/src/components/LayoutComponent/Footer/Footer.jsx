import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Import specific icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-800 text-white p-4'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 flex flex-col space-y-6 mb-6 md:mb-0">
            <div>
              <h3 className="text-lg font-bold">Vapor Vault</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold">About Us</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <ul className="flex space-x-4 md:justify-start mt-1">
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faYoutube} className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faTiktok} className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faXTwitter} className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                  <FontAwesomeIcon icon={faFacebookF} className="w-8 h-8" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p>&copy; {currentYear} Vapor Vault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
