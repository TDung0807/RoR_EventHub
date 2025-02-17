import React, { useState } from "react";
import styles from "./LoginPage.module.scss";
import { logo } from "../../assets";
import { MyButton, MyTextFields } from "../../components";
import { fontFamily, fontSize, fontWeight } from "@mui/system";
import { useLogin } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useLogin();

  const onLogin = async () => {
    const { isAdmin, isUser } = await login(email, password);
    console.log(isUser);

    if (isAdmin) {
      navigate("/admin/homepage");
    } else if (isUser) {
      navigate("/user/homepage");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img
            className={styles.logoImage}
            src={logo.MediumLogoWithType}
            alt="G&D Company Logo"
          />
        </div>
        <h2 className={styles.heading_font} style={{ marginBottom: 0 }}>
          WELCOME BACK
        </h2>
        <p style={{ marginTop: 8 }}>Please login to continue</p>
        <form>
          <MyTextFields
            id="email_fields"
            label="Your Email"
            type="email"
            variant="outlined"
            style={{
              marginTop: "30px",
              marginBottom: "24px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            sx={{ width: 364 }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></MyTextFields>

          <MyTextFields
            id="outlined-password-input"
            label="Your Password"
            type="password"
            variant="outlined"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "40px",
            }}
            sx={{ width: 364 }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></MyTextFields>

          <MyButton
            label="Login"
            style={{
              fontFamily: "Montserrat",
              fontSize: 20,
              fontWeight: 800,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "40px",
            }}
            sx={{ width: 182, height: 52 }}
            variant="contained"
            onClick={onLogin}
          ></MyButton>
        </form>
      </div>
    </div>
  );
};
