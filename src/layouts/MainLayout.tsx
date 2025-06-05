import { Layout, Grid, Drawer, Button } from 'antd';
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

  return (
    <div className='h-screen overflow-hidden'>
      <Layout className='h-full bg-zinc-100'>
        {!isMobile && <CSider collapsed={collapsed} setCollapsed={setCollapsed} />}
        <div className='fixed top-0 left-0 right-0 z-10'>
          <CHeader />
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className='absolute top-[16px] left-[16px] z-50'
            />
          )}
        </div>
        <Drawer title='Menu' placement='left' width={200} closable onClose={() => setDrawerVisible(false)} open={drawerVisible}>
          <CSider collapsed={false} setCollapsed={() => {}} />
        </Drawer>
        <Content
          className={`overflow-auto transition-all  duration-300 px-4 mt-[80px] mb-[50px] ${
            !isMobile ? (collapsed ? 'ml-[80px]' : 'ml-[224px]') : ''
          }`}>
          <Outlet />
        </Content>
      </Layout>
      <CFooter />
    </div>
  );
};

export default MainLayout;
