import React from "react";
import styles from "./UserHeader.module.scss";
import { logo } from "../../assets"; // Adjust the path based on your project structure
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useLogout } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useAccountAuthetication } from "../../store";
import { Typography } from "@mui/material";

export function UserHeader() {
  const email = useAccountAuthetication((state) => state.email);
  const name = useAccountAuthetication((state) => state.name);
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
        <Typography
          fontWeight={700}
          fontFamily={"Montserrat"}
          color="#005FB3"
          variant="h5"
          marginBottom={0}
        >
          GD System
        </Typography>
      </div>
      <div className={styles.right}>
        <img
          src="https://play-lh.googleusercontent.com/7coSeFzQQz28lZY6QqfmPPsFPS6udIOYjHxaIEfCFVumCqOj5s5Xxq-0yPiwap_R6A=w240-h480-rw"
          alt="User Avatar"
          className={styles.avatar}
        />
        <div className={styles.userInfo} style={{ marginRight: "30%" }}>
          <span className={styles.name}>{name}</span>
          <p
            style={{ margin: 0, color: "#A6A6A6", fontSize: 12 }}
            className={styles.email}
          >
            {email}
          </p>
        </div>
        <div style={{ cursor: "pointer" }} onClick={onLogout}>
          <ExitToAppIcon fontSize="large" color="primary"></ExitToAppIcon>
        </div>
      </div>
    </div>
  );
}
