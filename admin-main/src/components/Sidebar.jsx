import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800  text-white p-5 h-[100vw]">
      <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
      <ul>
        <li className="mb-3">
          <Link
            to="/"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 hover:text-yellow-300 transition-all duration-300"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/add"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 hover:text-yellow-300 transition-all duration-300"
          >
           Add Product
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/products"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 hover:text-yellow-300 transition-all duration-300"
          >
            Products
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/orders"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 hover:text-yellow-300 transition-all duration-300"
          >
            Orders
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/users"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 hover:text-yellow-300 transition-all duration-300"
          >
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
