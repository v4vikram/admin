import React from "react";
import { Eye, EyeOff } from "lucide-react";

const ShowHidePassword = ({showPassword, setShowPassword}) => {
  return (
    <div
      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <EyeOff className="text-gray-600 w-5 h-5" />
      ) : (
        <Eye className="text-gray-600 w-5 h-5" />
      )}
    </div>
  );
};

export default ShowHidePassword;
