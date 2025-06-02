import { Layout } from 'antd';
import dayjs from 'dayjs';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter className="p-2 fixed left-0 bottom-0 right-0 text-center h-[50px]">
      Ant Design ©{dayjs().year()} Xây dựng bởi thinhphat.dev@gmail.com
    </AntFooter>
  );
};

export default Footer;
