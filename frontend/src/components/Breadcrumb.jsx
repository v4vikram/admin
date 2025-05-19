import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ paths }) => {
  const location = useLocation();
  const pathnames = paths || location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex items-center space-x-1">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center space-x-1">
              <span>/</span>
              {isLast ? (
                <span className="capitalize text-gray-500">{value}</span>
              ) : (
                <Link
                  to={to}
                  className="capitalize text-tomato hover:underline"
                >
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
