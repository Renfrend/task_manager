import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input } from 'antd';

import useRegister from '../../auth/use-register';

import styles from './register.module.css';

export default function RegisterForm() {
  const { register, isLoading, error } = useRegister();

  const onFinish = (values) => {
    register(values);
  };

  return (
    <Form className={styles.form} onFinish={onFinish}>
      {error?.data?.message && (
        <Form.Item>
          <Alert message={error.data.message} type='error' />
        </Form.Item>
      )}

      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
          { type: 'email', message: 'Invalid email' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder='Email' />
      </Form.Item>

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
          Sing up
        </Button>
      </Form.Item>
    </Form>
  );
}
