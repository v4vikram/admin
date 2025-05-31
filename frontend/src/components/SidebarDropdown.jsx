import React, { useState } from "react";
import { ChevronDown, ChevronUp, Circle } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarDropdown = ({ label, Icon, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-sm text-font-200">
      {/* Parent menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-2 py-2 hover:bg-border-gray text-left rounded-sm"
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon size={16} />}
          {label}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown links */}
      {isOpen && (
        <div className="py-2 space-y-2">
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className=" text-[#afb9cf] hover:text-blue-400 global-t px-2 flex items-center gap-4"
            >
              <Circle size={11} className="text-icon-gray" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
