import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Typography, Layout } from "antd";
import { Link } from "react-router-dom";

import useAuth from "../../auth/use-auth";
import useLogout from "../../auth/use-logout";

export default function Header() {
  const { isAuth, user } = useAuth();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout.Header>
      <Flex flex={1} justify="space-between" align="center">
        <Link to="/">
          <Typography.Text className="app__logo">Task manager</Typography.Text>
        </Link>
        {isAuth ? (
          <Space size="large">
            <Typography.Text className="header__username">
              {user?.username}
            </Typography.Text>
            <Button icon={<LogoutOutlined />} onClick={handleLogout} />
          </Space>
        ) : (
          <Space size="small">
            <Link to="/login">
              <Button type="primary">Log In</Button>
            </Link>
            <Link to="/register">
              <Button className="btn-success" type="primary">
                Sign Up
              </Button>
            </Link>
          </Space>
        )}
      </Flex>
    </Layout.Header>
  );
}
