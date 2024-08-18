import { Typography } from "antd";

import RegisterForm from "./register.form";

import styles from "./register.module.css";

export default function RegisterPage() {
  return (
    <>
      <Typography.Title className="text-center">Sign Up</Typography.Title>
      <div className={styles.formWrapper}>
        <RegisterForm />
      </div>
    </>
  );
}
