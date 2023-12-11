import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white p-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2023 Employee Management System. All rights reserved.</p>
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

