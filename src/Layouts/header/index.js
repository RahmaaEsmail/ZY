import React, { useState } from "react";
import "./style.css";
import { logOut } from "../../utils/logout";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className="profile-container">
        <div className="profile-info" onClick={toggleDropdown}>
          <img
            src={"https://res.cloudinary.com/dbz6ebekj/image/upload/v1730539529/AppLogo_weochu.png"}
            style={{ width: "40px" }}
            alt="Profile"
            className="profile-image"
          />
          <span className="profile-name">ZY</span>
          {/* <i className="arrow-down"></i> */}
        </div>
        {/* {dropdownOpen && (
          <ul className="dropdown-menu">
           
            <li onClick={()=>logOut()}>Logout</li>
          </ul>
        )} */}
      </div>
    </header>
  );
}

export default Header;
