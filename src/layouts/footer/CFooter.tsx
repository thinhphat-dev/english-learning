import { Layout } from 'antd';
import dayjs from 'dayjs';

const { Footer: AntFooter } = Layout;

const CFooter = () => {
  return (
    <AntFooter className=' flex justify-center z-50 items-center fixed left-0 bottom-0 right-0 text-center h-[50px] bg-zinc-300'>
      Ant Design ©{dayjs().year()} Xây dựng bởi thinhphat.dev@gmail.com
    </AntFooter>
  );
};

export default CFooter;
