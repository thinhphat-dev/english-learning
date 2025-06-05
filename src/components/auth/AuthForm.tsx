import { type ReactNode } from 'react';
import { Form, type FormProps } from 'antd';
import LogoStudy4 from '@/components/logo/LogoStudy4';

interface AuthFormProps extends FormProps {
  children?: ReactNode;
}

const AuthForm = ({ children, ...props }: AuthFormProps) => {
  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-slate-200 p-4'>
      <div className='w-full max-w-[600px] rounded-[24px] border border-gray-300 bg-white pt-[45px] pb-[25px] px-[30px]'>
        <LogoStudy4 withText></LogoStudy4>
        <Form
          name='basic'
          className='mt-5 bg-white'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete='off'
          {...props}>
          {children}
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
