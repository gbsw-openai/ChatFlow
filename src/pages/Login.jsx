import React from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseSetting";
import styles from "../styles/Login.module.css";

function Login() {
  const navigate = useNavigate();

  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/mainpage");
    } catch (error) {
      console.error("구글로그인 오류:", error);
    }
  };

  return (
    <div className={styles.all}>
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.left_container}>
            <div className={styles.left_title}>환영합니다!</div>
            <div className={styles.social_login}>
              <div className={styles.google} onClick={GoogleLogin}></div>
            </div>
          </div>
          <div className={styles.right_container}>
            <div>
              <div className={styles.right_title}>챗플로우</div>
              <div className={styles.right_subtitle}>
              스마트한 대화의 시작
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
