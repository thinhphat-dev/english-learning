import { Layout, theme } from 'antd';
import Footer from '@/layouts/footer/Footer';
import Sider from '@/layouts/sider/Sider';
import Header from '@/layouts/header/Header';
import { useState } from 'react';
import { Outlet } from 'react-router';

const { Content } = Layout;
const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', maxHeight: '100vh' }}>
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Header bg={colorBgContainer}></Header>
          <Content
            className={`overflow-auto transition-all duration-300 ${collapsed ? 'ml-[80px]' : 'ml-[224px]'} mt-[64px]`}
            style={{
              height: 'calc(100vh - 64px - 50px)',
              overflow: 'auto',
            }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </div>
  );
};

export default Home;
