import LogoStudy4 from '@/components/logo/LogoStudy4';
import { Layout, Menu } from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getMenuList } from '@/layouts/menu-items';

const { Sider } = Layout;

interface CustomSiderProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const CSider: React.FC<CustomSiderProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const menuItems = useMemo(() => getMenuList({ navigate }), []);
  const location = useLocation();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint='lg'
      collapsedWidth={80}
      theme='light'
      onBreakpoint={(broken) => setCollapsed(broken)}
      className='fixed h-[100vh] z-20 left-0 top-0 bottom-0 transition-all duration-300'>
      <div className='p-4 z-50'>{collapsed ? <LogoStudy4 /> : <LogoStudy4 withText />}</div>
      <Menu theme='light' mode='inline' items={menuItems} selectedKeys={[location.pathname]} />
    </Sider>
  );
};

export default CSider;
