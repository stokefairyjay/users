import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#43caf0" };
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-nav">
        <NavLink
          to="/"
          activeStyle={activeStyle}
          exact
          className="nav-item nav-link"
        >
          User Profiles
        </NavLink>
        <NavLink
          to="/user"
          activeStyle={activeStyle}
          className="nav-item nav-link"
        >
          Manage User
        </NavLink>
        <NavLink
          to="/groups"
          activeStyle={activeStyle}
          className="nav-item nav-link"
        >
          Groups
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;