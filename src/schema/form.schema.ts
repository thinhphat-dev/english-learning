import { type Rule } from 'antd/es/form';

export const getFullNameSchema: Rule[] = [
  { required: true, message: 'Vui lòng nhập họ và tên!' },
  {
    min: 4,
    message: 'Tên phải dài hơn 4 ký tự!',
  },
  {
    pattern: /^[A-Za-zÀ-ỹ\s']+$/,
    message: "Họ và tên chỉ được chứa chữ cái, dấu ' và khoảng trắng!",
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

export const getPasswordLoginSchema: Rule[] = [{ required: true, message: 'Vui lòng nhập mật khẩu!' }];

export const getPasswordSchema: Rule[] = [
  { required: true, message: 'Vui lòng nhập mật khẩu!' },
  {
    min: 8,
    message: 'Mật khẩu phải dài hơn 8 ký tự',
  },
  {
    pattern: /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\d).+$/,
    message: 'Mật khẩu phải chứa ít nhất 1 chữ in hoa, chữ cái và số',
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
