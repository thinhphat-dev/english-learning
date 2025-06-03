import { Button, message } from 'antd';
import { Link } from 'react-router';
import AuthForm from '@/components/auth/AuthForm';
import { register } from '@/service/auth/auth.service';
import type { RegisterParams } from '@/types/request.type';
import { TextInput } from '@/components/form/TextInput';
import { PasswordInput } from '@/components/form/PasswordInput';
import { SelectInput } from '@/components/form/SelectInput';
import { LevelEnum } from '@/enum/level.enum';
import {
  getConfirmPasswordSchema,
  getEmailSchema,
  getFullNameSchema,
  getLevelSchema,
  getPasswordSchema,
} from '@/schema/form.schema';
import { useMutation } from '@tanstack/react-query';
import { dataOptionLevel } from '@/constans/database/data-option';
import { RadioInput } from '@/components/form/RadioInput';
import { genderOptions } from '@/enum/gender.enum';

const RegisterPage = () => {
  const { mutate } = useMutation({
    mutationFn: register,
    onError: (error: any) => {
      message.error('Lỗi đăng ký: ' + error?.message || 'Đã xảy ra lỗi');
    },
  });

  const handleRegister = (values: RegisterParams) => {
    mutate(values);
  };

  return (
    <AuthForm onFinish={handleRegister}>
      <TextInput formItemName='fullname' label='Họ Và Tên' placeholder='Nhập họ và tên' rules={getFullNameSchema} hasFeedback />
      <TextInput label='Email' formItemName='email' hasFeedback placeholder='Nhập email' rules={getEmailSchema} />
      <RadioInput formItemName='gender' label='Giới Tính' options={genderOptions} hasFeedback initialValue='MALE'></RadioInput>
      <SelectInput
        label='Trình Độ Hiện Tại'
        formItemName='level'
        rules={getLevelSchema}
        initialValue={LevelEnum.NEWBIE}
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
