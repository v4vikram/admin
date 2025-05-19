import React, { useState, useRef, useEffect } from "react";
import { UserCircle, ChevronDown, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-"
      >
        <UserCircle className="w-5 h-5 text-icon-gray cursor-pointer" />
        <span className="text-icon-gray font-medium"></span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-secondary-gray border border-border-gray rounded-md shadow-lg z-50">
          <button className="flex items-center w-full px-4 py-2 text-sm text-icon-gray hover:bg-hover-bg cursor-pointer">
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-icon-graytext-icon-gray text-icon-gray hover:bg-hover-bg cursor-pointer"
            onClick={() => dispatch(logout())}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDropdown;
