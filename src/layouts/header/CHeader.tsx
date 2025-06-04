import { Avatar, Button, Dropdown, Layout, type MenuProps } from 'antd';
import { Link } from 'react-router';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { logout } from '@/service/auth/auth.service';
import { useAuthStore } from '@/store/auth.store';
import Title from 'antd/es/typography/Title';

type headerProps = {
  bg: string;
};

const dropdownItems: MenuProps['items'] = [
  {
    label: <Link to='/information'>Thông tin cá nhân</Link>,
    key: 'information',
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    label: (
      <div
        onClick={() => logout()}
        className='flex items-center gap-2 text-red-500 border border-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-white transition duration-200'>
        <PoweroffOutlined />
        <span>Đăng xuất</span>
      </div>
    ),
  },
];

const CHeader = ({ bg }: headerProps) => {
  const Header = Layout;
  const { currentUser, userInfo } = useAuthStore();

  return (
    <Header className='fixed z-0 h-[64px] top-0 w-full right-0 '>
      <div className='relative bg-zinc-200 pr-4 h-full flex items-center justify-end '>
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
