import { Layout } from "antd";
const Footer = () => {
  const Footer = Layout;
  return (
    <Footer className="p-2 fixed left-0 bottom-0 right-0 text-center h-[50px]">
      Ant Design ©{new Date().getFullYear()} Xây dựng bởi thinhphat.dev@gmail.com
    </Footer>
  );
};

export default Footer;
