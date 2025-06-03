import { Layout, theme, Grid, Drawer, Button } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { MenuOutlined } from '@ant-design/icons';
import CHeader from '@/layouts/header/CHeader';
import CSider from '@/layouts/sider/CSider';
import CFooter from '@/layouts/footer/CFooter';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div className='min-h-screen max-h-screen'>
      <Layout className='h-screen overflow-hidden'>
        {!isMobile && <CSider collapsed={collapsed} setCollapsed={setCollapsed} />}

        <div className='fixed top-0 left-0 right-0 z-50'>
          <CHeader bg={colorBgContainer} />

          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className='absolute top-[16px] left-[16px] z-50'
            />
          )}
        </div>

        <Drawer
          title='Menu'
          placement='left'
          width={210}
          closable
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}>
          <CSider collapsed={false} setCollapsed={() => {}} />
        </Drawer>

        <Content
          className={`overflow-auto transition-all duration-300 ${
            !isMobile ? (collapsed ? 'ml-[80px]' : 'ml-[224px]') : ''
          } mt-[80px]`}>
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
      <CFooter />
    </div>
  );
};

export default MainLayout;
