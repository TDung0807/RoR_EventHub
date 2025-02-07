import React from "react";
import styles from "./AdminHeader.module.scss";
import { logo } from "../../assets"; // Adjust the path based on your project structure
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLogout } from "../../hooks";
import { useNavigate } from "react-router-dom";

export function AdminHeader() {
  const navigate = useNavigate();
  const logout = useLogout();
  const onLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <img
          src={logo.SmallLogoWithoutType}
          alt="Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.right}>
        <img
          src="https://play-lh.googleusercontent.com/7coSeFzQQz28lZY6QqfmPPsFPS6udIOYjHxaIEfCFVumCqOj5s5Xxq-0yPiwap_R6A=w240-h480-rw"
          alt="User Avatar"
          className={styles.avatar}
        />
        <div className={styles.userInfo} style={{ marginRight: "30%" }}>
          <span className={styles.name}>Admin</span>
          <p
            style={{ margin: 0, color: "#A6A6A6", fontSize: 12 }}
            className={styles.email}
          >
            admin@gd.com
          </p>
        </div>
        <div style={{ cursor: "pointer" }} onClick={onLogout}>
          <ExitToAppIcon fontSize="large" color="primary"></ExitToAppIcon>
        </div>
      </div>
    </div>
  );
}
