
import React from 'react';
import { Sprout, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-kisan-dark-brown text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Sprout className="h-8 w-8 text-kisan-light" />
              <span className="ml-2 text-xl font-poppins font-bold">
                Kisan-<span className="text-kisan-light">Sathi</span>
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering farmers with AI for smart and sustainable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-kisan-light">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-kisan-light">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-kisan-light">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/weather" className="text-gray-300 hover:text-kisan-light">Weather Forecast</Link>
              </li>
              <li>
                <Link to="/disease-prediction" className="text-gray-300 hover:text-kisan-light">Disease Prediction</Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-300 hover:text-kisan-light">Scheme Notifications</Link>
              </li>
              <li>
                <Link to="/market-prices" className="text-gray-300 hover:text-kisan-light">Market Prices</Link>
              </li>
              <li>
                <Link to="/knowledge-hub" className="text-gray-300 hover:text-kisan-light">Crop Knowledge Hub</Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-kisan-light">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-kisan-light">Farming Tips</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-kisan-light">Research Papers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-kisan-light">Government Policies</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-kisan-light">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-poppins font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-kisan-light" />
                <span className="text-gray-300">
                  123 Farming Street, Agricultural District, New Delhi, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-kisan-light" />
                <span className="text-gray-300">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-kisan-light" />
                <span className="text-gray-300">info@kisansathi.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Kisan-Sathi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
