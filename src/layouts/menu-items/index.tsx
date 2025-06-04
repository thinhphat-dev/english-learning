import { PATH } from '@/config/routers/path';
import { FileSearchOutlined, HomeOutlined, ReadOutlined } from '@ant-design/icons';
import type { JSX } from 'react';
import type { NavigateFunction } from 'react-router';

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
      label: 'Từ Điển',
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
