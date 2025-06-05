import { Avatar, Button, Dropdown, Layout } from 'antd';
import { Link } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/auth.store';
import Title from 'antd/es/typography/Title';
import { getDropdownItems } from '../menu-items';
import { useMemo } from 'react';

const CHeader = () => {
  const { currentUser, userInfo } = useAuthStore();
  const dropdownItems = useMemo(() => getDropdownItems(), []);
  const Header = Layout;

  return (
    <Header className='fixed z-0 h-[64px] top-0 w-full right-0 '>
      <div className='relative  bg-white pr-4 h-full flex items-center justify-end '>
        {currentUser ? (
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']} placement='bottom'>
            <div className='flex items-center cursor-pointer border h-full rounded-md p-3'>
              <Avatar size='large' icon={<UserOutlined />} />
              <Title className='name m-3 font-' level={4}>
                {userInfo?.fullname}
              </Title>
            </div>
          </Dropdown>
        ) : (
          <Link to='/login'>
            <Button className='bg-blue-400 font-bold text-xl' size='large'>
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </Header>
  );
};

export default CHeader;
