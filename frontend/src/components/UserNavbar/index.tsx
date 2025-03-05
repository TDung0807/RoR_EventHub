// src/components/Navbar/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserNavbar.module.scss"; // Make sure the path is correct
import { navbarImage } from "../../assets"; // Adjust the path based on your project structure
import BookIcon from "@mui/icons-material/Book";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
export const UserNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <nav
        className={`${styles.navbar} ${
          isExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <ul className={`${styles.navbar_container}`}>
          <li onClick={toggleNavbar}>
            <Link className={`${styles.item_nav}`} to="#">
              <MenuIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></MenuIcon>
            </Link>
          </li>
          <li>
            <Link className={`${styles.item_nav}`} to="/user/homepage">
              <HomeIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></HomeIcon>
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link className={`${styles.item_nav}`} to="/user/calendar">
              <CalendarMonthIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></CalendarMonthIcon>
              {isExpanded && <span>Calendar</span>}
            </Link>
          </li>
          <li>
            <Link className={`${styles.item_nav}`} to="/user/guests">
              <PeopleAltIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></PeopleAltIcon>
              {isExpanded && <span>Calendar</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
