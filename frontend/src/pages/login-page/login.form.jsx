import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input } from "antd";

import useLogin from "../../auth/use-login";

import styles from "./login.module.css";

export default function LoginForm() {
  const { login, isLoading, error } = useLogin();

  const onFinish = (values) => {
    login(values);
  };

  return (
    <Form className={styles.form} onFinish={onFinish}>
      {error?.data?.message && (
        <Form.Item>
          <Alert message={error.data.message} type='error' />
        </Form.Item>
      )}

      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
          { min: 2, max: 20 },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Username' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          { min: 2, max: 20 },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button block type='primary' htmlType='submit' loading={isLoading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
