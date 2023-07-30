"use client";

import Link from "next/link";

import { AiFillHome } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { BsFillBoxSeamFill } from "react-icons/bs";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="text-center bg-white">
        <nav className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-4xl pl-2">
              <i className="text-black">
                <AiFillHome />
              </i>
              <i>
                <AiFillShopping />
              </i>
              <i>
                <BsFillBoxSeamFill />
              </i>
            </div>

            <div className="flex items-center space-x-2 pr-2">
              <span>User</span>
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>{" "}
            </div>
          </div>
        </nav>
      </div>
    </nav>
  );
}
