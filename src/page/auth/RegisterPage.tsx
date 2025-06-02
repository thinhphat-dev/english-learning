import { Button } from 'antd';
import { Link } from 'react-router';
import AuthForm from '@/components/auth/AuthForm';
import { register } from '@/service/auth/auth.service';
import type { RegisterParams } from '@/types/request.type';
import { TextInput } from '@/components/form/TextInput';
import { dataOptionLevel } from '@/constans/database/optionLevel';
import { PasswordInput } from '@/components/form/PasswordInput';
import { SelectInput } from '@/components/form/SelectInput';
import { LevelEnum } from '@/enum/level.enum';
import {
  getConfirmPasswordSchema,
  getEmailSchema,
  getFullNameSchema,
  getLevelSchema,
  getPasswordSchema,
} from '@/schema/Form.Schema';

const RegisterPage = () => {
  const handleRegister = (values: RegisterParams) => {
    register(values);
  };

  return (
    <AuthForm onFinish={handleRegister}>
      <TextInput formItemName='fullname' label='Họ Và Tên' placeholder='Nhập họ và tên' rules={getFullNameSchema} hasFeedback />
      <TextInput label='Email' formItemName='email' hasFeedback placeholder='Nhập email' rules={getEmailSchema} />
      <SelectInput
        label='Bạn Đang Là'
        formItemName='level'
        rules={getLevelSchema}
        initialValue={LevelEnum.NEWBIE}
        placeholder='Trình Độ Hiện Tại'
        options={dataOptionLevel}
      />
      <PasswordInput hasFeedback label='Mật Khẩu' formItemName='password' placeholder='Nhập mật khẩu' rules={getPasswordSchema} />
      <PasswordInput
        hasFeedback
        label='Nhập Lại Mật Khẩu'
        formItemName='confirmPassword'
        dependencies={['password']}
        placeholder='Nhập lại mật khẩu'
        rules={getConfirmPasswordSchema}
      />
      <Button className='w-full text-base font-medium' type='primary' htmlType='submit'>
        Đăng Ký
      </Button>
      <div className='w-full flex justify-end pt-2'>
        Đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
      </div>
    </AuthForm>
  );
};

export default RegisterPage;
