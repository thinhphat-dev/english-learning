import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import AuthForm from '@/components/auth/AuthForm';
import { loginWithPassword } from '@/service/auth/auth.service';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { PATH } from '@/config/routers/path';

const LoginPage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      navigate(PATH.HOME.PATH);
    }
  }, [currentUser, navigate]);

  return (
    <AuthForm onFinish={loginWithPassword}>
      <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
        <Input placeholder='Nhập email' />
      </Form.Item>
      <Form.Item label='Mật Khẩu' name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
        <Input.Password placeholder='Nhập mật khẩu' />
      </Form.Item>
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
