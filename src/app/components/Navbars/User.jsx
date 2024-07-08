'use client';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const User = ({ currentUser }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="relative z-30">
      <div
        onClick={toggleMenu}
        className="flex gap-1 items-center xs:p-1 sm:p-2 border-[1px] border-slate-100 rounded-full cursor-pointer hover:shadow-md duration-300 transition text-slate-100"
      >
        <FaUserCircle />
        <AiFillCaretDown />
      </div>
      {open && (
        <div className="absolute rounded-md flex flex-col items-center bg-white shadow-md w-[170px] right-0 top-12 overflow-hidden text-sm text-black cursor-pointer">
          {currentUser ? (
            <div>
              <div className="px-4 py-3">
                <Link href="/orders">Your orders</Link>
              </div>
                <div className="px-4 py-3">
                  <Link href="/admin">Admin Dashboard</Link>
                </div>
            
              <hr />
              <div
                onClick={() => {
                  toggleMenu();
                  signOut();
                }}
                className="px-4 py-3 cursor-pointer"
              >
                LogOut
              </div>
            </div>
          ) : (
            <div>
              <div className="px-4 py-3">
                <Link href="/login">Login</Link>
              </div>
              <div className="px-4 py-3">
                <Link href="/register">Register</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default User;
