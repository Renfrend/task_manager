import { Typography } from "antd";

import LoginForm from "./login.form";

import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <>
      <Typography.Title className="text-center">Login</Typography.Title>

      <div className={styles.formWrapper}>
        <LoginForm />
      </div>
    </>
  );
}
