import { type Rule } from 'antd/es/form';

export const getFullNameSchema: Rule[] = [
  { required: true, message: 'Vui lòng nhập họ và tên!' },
  {
    min: 6,
    message: 'Tên phải dài hơn 6 ký tự!',
  },
];

export const getEmailSchema: Rule[] = [
  { required: true, message: 'Vui lòng nhập email!' },
  {
    type: 'email',
    message: 'Email không hợp lệ!',
  },
];

export const getLevelSchema: Rule[] = [
  {
    required: true,
    message: 'Vui lòng chọn trình độ hiện tại!',
  },
];

export const getPasswordSchema: Rule[] = [
  { required: true, message: 'Vui lòng nhập mật khẩu!' },
  {
    min: 6,
    message: 'Mật khẩu phải dài hơn 6 ký tự',
  },
];

export const getConfirmPasswordSchema = [
  { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
  ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Mật khẩu không giống nhau!'));
    },
  }),
];
