import { PATH } from '@/config/routers/path';
import { logout } from '@/service/auth/auth.service';
import { FileSearchOutlined, HomeOutlined, PoweroffOutlined, ReadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { JSX } from 'react';
import { Link, type NavigateFunction } from 'react-router';

type MenuItem = {
  key: string;
  label: string | React.ReactNode;
  icon?: JSX.Element;
  onClick?: () => void;
  children?: MenuItem[];
};

type MenuListProps = {
  navigate: NavigateFunction;
};

export const getMenuList = ({ navigate }: MenuListProps): MenuItem[] => {
  return [
    {
      key: PATH.HOME.PATH,
      label: 'Trang chủ',
      icon: <HomeOutlined />,
      onClick: () => navigate(PATH.HOME.PATH),
    },
    {
      key: PATH.DICTIONARY.PATH + 'a',
      label: 'Từ Vựng',
      icon: <FileSearchOutlined />,
      children: [
        {
          key: PATH.DICTIONARY.PATH,
          label: 'Tra từ điển',
          onClick: () => navigate(PATH.DICTIONARY.PATH),
        },
        {
          key: PATH.DICTIONARY.QUIZ.PATH,
          label: 'Bài tập',
          onClick: () => navigate(PATH.DICTIONARY.QUIZ.PATH),
        },
        {
          key: PATH.DICTIONARY.FLASHCARD.PATH,
          label: 'Flash card',
          onClick: () => navigate(PATH.DICTIONARY.FLASHCARD.PATH),
        },
      ],
    },
    {
      key: PATH.GRAMMAR.PATH + 'g',
      label: 'Ngữ Pháp',
      icon: <ReadOutlined />,
      children: [
        {
          key: PATH.GRAMMAR.PATH,
          label: 'Lý Thuyết',
          onClick: () => navigate(PATH.GRAMMAR.PATH),
        },
        {
          key: PATH.GRAMMAR.QUIZ.PATH,
          label: 'Bài tập',
          onClick: () => navigate(PATH.GRAMMAR.QUIZ.PATH),
        },
      ],
    },
  ];
};

export const getDropdownItems = (): MenuProps['items'] => {
  return [
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
};
