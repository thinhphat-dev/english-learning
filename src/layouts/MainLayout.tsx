import { Layout, theme } from 'antd';
import Footer from '@/layouts/footer/Footer';
import Sider from '@/layouts/sider/Sider';
import Header from '@/layouts/header/Header';
import { useState } from 'react';
import { Outlet } from 'react-router';

const { Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='min-h-screen max-h-screen'>
      <Layout className='h-screen overflow-hidden'>
        <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Header bg={colorBgContainer} />
          <Content className={`overflow-auto transition-all duration-300 ${collapsed ? 'ml-[80px]' : 'ml-[224px]'} mt-[80px]`}>
            <div
              className='p-6'
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                height: 'calc(100vh - 64px - 50px)',
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

export default MainLayout;
