import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ children, classname, url }) => {
  return (
    <Link className={`bg-secondary-gray rounded-lg py-[8px] px-3 block text-icon-gray ${classname}`} to={url}>
      {children}
    </Link>
  );
};

export default LinkButton;
