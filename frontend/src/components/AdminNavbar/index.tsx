// src/components/Navbar/Navbar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss"; // Make sure the path is correct
import { navbarImage } from "../../assets"; // Adjust the path based on your project structure
import BookIcon from "@mui/icons-material/Book";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
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
            <Link className={`${styles.item_nav}`} to="/admin/homepage">
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
            <Link className={`${styles.item_nav}`} to="/admin/calendar">
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
            <Link className={`${styles.item_nav}`} to="/admin/guests">
              <PeopleAltIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></PeopleAltIcon>
              {isExpanded && <span>Guest Management</span>}
            </Link>
          </li>
          <li>
            <Link className={`${styles.item_nav}`} to="/admin/utility">
              <BookIcon
                style={{
                  width: 28,
                  height: 28,
                  marginLeft: 15,
                  marginRight: 18,
                }}
              ></BookIcon>

              {isExpanded && <span>Service Provider</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
