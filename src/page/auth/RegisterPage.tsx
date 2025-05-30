import { Button, Form, Input, Select } from 'antd';
import { Link, useNavigate } from 'react-router';
import AuthForm from '@/components/auth/AuthForm';
import { LevelEnum } from '@/enum/level.enum';
import { register } from '@/service/auth/auth.service';
import type { RegisterParams } from '@/types/request.type';

const RegisterPage = () => {
    const navigate = useNavigate(); 

  const handleRegister = (values: RegisterParams) => {
    register(values, navigate); 
  };

  return (
    <AuthForm onFinish={handleRegister}>
      <Form.Item
        label='Họ Và Tên'
        name='fullname'
        rules={[
          { required: true, message: 'Vui lòng nhập họ và tên!' },
          {
            min: 6,
            message: 'Tên phải dài hơn 6 ký tự!',
          },
        ]}
        hasFeedback>
        <Input placeholder='Nhập họ và tên' />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        hasFeedback
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          {
            type: 'email',
            message: 'Email không hợp lệ!',
          },
        ]}>
        <Input placeholder='Nhập email' />
      </Form.Item>

      <Form.Item
        label='Bạn Đang Là'
        name='level'
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn nghề nghiệp hiện tại!',
          },
        ]}
        initialValue='NEWBIE'>
        <Select placeholder='Trình Độ Hiện Tại'>
          {Object.entries(LevelEnum).map(([value, label]) => (
            <Select.Option key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        hasFeedback
        label='Mật Khẩu'
        name='password'
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          {
            min: 6,
            message: 'Mật khẩu phải dài hơn 6 ký tự',
          },
        ]}>
        <Input.Password placeholder='Nhập mật khẩu' />
      </Form.Item>

      <Form.Item
        hasFeedback
        label='Nhập Lại Mật Khẩu'
        name='confirmPassword'
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không khớp!'));
            },
          }),
        ]}>
        <Input.Password placeholder='Nhập lại mật khẩu' />
      </Form.Item>

      <Button className='w-full text-base font-medium' type='primary' htmlType='submit'>
        Đăng Ký
      </Button>
      <div className='w-full flex justify-end pt-2'>
        Đã có tài khoản?
        <Link to='/login'>Đăng nhập</Link>
      </div>
    </AuthForm>
  );
};

export default RegisterPage;
