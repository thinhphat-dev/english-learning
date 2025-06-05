import AuthForm from '@/components/auth/AuthForm';
import { TextInput } from '@/components/form/TextInput';
import { getEmailSchema } from '@/schema/form.schema';
import { resetPassword } from '@/service/auth/auth.service';
import { Button, message } from 'antd';
import { Link } from 'react-router';

const ForgotPasswordPage = () => {
  const handleSubmit = async (values: { email: string }) => {
    try {
      await resetPassword(values.email);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra.');
    }
  };

  return (
    <AuthForm onFinish={handleSubmit}>
      <TextInput
        formItemName="email"
        label="Email"
        placeholder="Nhập email"
        rules={getEmailSchema}
      />
        <div className='text-center m-5'>Chúng tôi sẽ gửi 1 yêu cầu đặt lại mật khẩu đến email bạn đã nhập</div>
      <Button
        className="w-full text-base font-medium mt-4"
        type="primary"
        htmlType="submit"
      >
        Xác Nhận
      </Button>
       <div className='w-full flex justify-end pt-2'>
        <Link to='/login'>Trở về đăng nhập</Link>
      </div>
    </AuthForm>
  );
};

export default ForgotPasswordPage;
