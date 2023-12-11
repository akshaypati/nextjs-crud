import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 text-white p-4">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center">
          <FaHome className="text-2xl mr-2" />
          <h1 className="text-3xl font-extrabold tracking-tight">Employee Management System</h1>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <FaSearch className="ml-2 text-2xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
