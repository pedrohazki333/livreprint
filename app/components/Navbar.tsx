"use client";

//import React, { useState } from "react";
//import Link from "next/link";
//import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <nav className="fixed w-full bg-emerald-600/50 backdrop-blur-md z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-lg font-bold text-gray-100">livreprint</h1>
          </div>
          {/* <div className="hidden md:flex space-x-4">
            <a href="\" className="text-sm text-gray-100 hover:text-gray-400">
              Home
            </a>
            <a
              href="\about"
              className="text-sm text-gray-100 hover:text-gray-400"
            >
              About
            </a>
            <a
              href="\services"
              className="text-sm text-gray-100 hover:text-gray-400"
            >
              Services
            </a>
            <a
              href="\blog"
              className="text-sm text-gray-100 hover:text-gray-400"
            >
              Blog
            </a>
            <a
              href="\contact"
              className="text-sm text-gray-100 hover:text-gray-400"
            >
              Contact
            </a>
          </div> */}
          {/* <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div> */}
        </div>
      </div>

      {/* {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-purple/10 backdrop-blur-md shadow-md"
        >
          <div className="px-4 py-2 space-y-2">
            <Link
              href="\"
              className="block text-sm text-gray-200 hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              href="\about"
              className="block text-sm text-gray-200 hover:text-gray-400"
            >
              About
            </Link>
            <Link
              href="\services"
              className="block text-sm text-gray-200 hover:text-gray-400"
            >
              Services
            </Link>
            <Link
              href="\blog"
              className="block text-sm text-gray-200 hover:text-gray-400"
            >
              Blog
            </Link>
            <Link
              href="\contact"
              className="block text-sm text-gray-200 hover:text-gray-400"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )} */}
    </nav>
  );
};

export default Navbar;
