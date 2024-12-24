// src/components/Navbar/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss"; // Make sure the path is correct
import { navbarImage } from "../../assets"; // Adjust the path based on your project structure

export const AdminNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <nav
        className={`${styles.navbar} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <ul>
          <li onClick={toggleNavbar} style={{ cursor: "pointer" }}>
            <img
              src={navbarImage.expandImg}
              alt="Expand/Collapse"
              style={{ width: 39, height: 53 }}
            />
          </li>
          <li>
            <Link to="/admin/homepage">
              <img
                src={navbarImage.homeImg}
                alt="Home"
                style={{
                  width: 30,
                  height: 32,
                  marginLeft: 20,
                  marginRight: 24,
                }}
              />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <img
                src={navbarImage.calendarImg}
                alt="Calendar"
                style={{
                  width: 32,
                  height: 33,
                  marginLeft: 20,
                  marginRight: 22,
                }}
              />
              {isExpanded && <span>Calendar</span>}
            </Link>
          </li>
          <li>
            <Link to="/admin/guests">
              <img
                src={navbarImage.guestImg}
                alt="Guest"
                style={{
                  width: 40,
                  height: 41,
                  marginLeft: 18,
                  marginRight: 16,
                }}
              />
              {isExpanded && <span>Guest</span>}
            </Link>
          </li>
          <li>
            <Link to="/books">
              <img
                src={navbarImage.transportImg}
                alt="Transport"
                style={{
                  width: 41,
                  height: 41,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              />
              {isExpanded && <span>Transport</span>}
            </Link>
          </li>
          <li>
            <Link to="/info">
              <img
                src={navbarImage.infoImg}
                alt="Info"
                style={{
                  width: 32,
                  height: 32,
                  marginLeft: 18,
                  marginRight: 24,
                }}
              />
              {isExpanded && <span>Info</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
