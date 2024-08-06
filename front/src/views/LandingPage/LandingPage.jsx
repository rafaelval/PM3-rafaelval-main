import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export const LandingPage = () => {
  return (
    <div className={styles.contPrinc}>
      <h1 className={styles.title}>BIENVENIDO</h1>
      <div className={styles.links}>
        <h2>Es tu primera vez?</h2>
        <Link to="/register">
          <span>Registrate</span>
        </Link>
        <h2>Ya tienes una cuenta?</h2>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    </div>
  );
};
