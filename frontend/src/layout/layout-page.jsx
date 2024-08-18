import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

import "./index.css";

export default function LayoutPage() {
  return (
    <Layout className="app__container">
      <Header />
      <Layout.Content className="content__container">
        <Outlet />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}
