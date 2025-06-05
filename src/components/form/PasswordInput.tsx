import { Form, Input } from 'antd';
import type { CommonInputProps } from '@/components/form/CommonInputProps';

export type PasswordInputProps = {
  isHideRequired?: boolean;
  classNameInput?: string;
  dependencies?: string[];
} & CommonInputProps;

export const PasswordInput = ({
  formItemName,
  label,
  rules,
  placeholder,
  classNameInput,
  classNameForm,
  dependencies,
  ...commonInputProps
}: PasswordInputProps) => {
  return (
    <Form.Item
      name={formItemName}
      label={label}
      dependencies={dependencies}
      rules={rules}
      className={classNameForm}
      {...commonInputProps}>
      <Input.Password placeholder={placeholder} className={classNameInput} />
    </Form.Item>
  );
};
