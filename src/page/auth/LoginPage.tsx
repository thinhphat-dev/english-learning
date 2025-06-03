import { Button } from 'antd';
import { Link } from 'react-router';
import AuthForm from '@/components/auth/AuthForm';
import { loginWithPassword } from '@/service/auth/auth.service';
import { TextInput } from '@/components/form/TextInput';
import { PasswordInput } from '@/components/form/PasswordInput';
import { getEmailSchema, getPasswordLoginSchema } from '@/schema/form.schema';

const LoginPage = () => {
  return (
    <AuthForm onFinish={loginWithPassword}>
      <TextInput formItemName='email' label='Email' placeholder='Nhập email' rules={getEmailSchema} />
      <PasswordInput label='Mật Khẩu' formItemName='password' placeholder='Nhập mật khẩu' rules={getPasswordLoginSchema} />
      <div className='w-full mt-[-20px] flex justify-end pb-2'>
        <a href='#'>Quên Mật Khẩu?</a>
      </div>
      <Button className='w-full text-base font-medium' type='primary' htmlType='submit'>
        Đăng Nhập
      </Button>
      <div className='w-full flex justify-end pt-2'>
        Chưa có tài khoản?
        <Link to='/register'>Đăng ký</Link>
      </div>
    </AuthForm>
  );
};

export default LoginPage;
