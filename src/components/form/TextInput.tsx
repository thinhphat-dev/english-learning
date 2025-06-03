import { Form, Input } from 'antd';
import type { CommonInputProps } from '@/components/form/CommonInputProps';

export type TextInputProps = {
  isHideRequired?: boolean;
  classNameInput?: string;
} & CommonInputProps;

export const TextInput = ({
  formItemName,
  isHideRequired,
  hasFeedback,
  placeholder,
  classNameInput,
  classNameForm,
  disabled,
  ...commonInputProps
}: TextInputProps) => {
  return (
    <Form.Item
      name={formItemName}
      required={!isHideRequired}
      hasFeedback={hasFeedback}
      className={classNameForm}
      {...commonInputProps}>
      <Input placeholder={placeholder} className={classNameInput} disabled={disabled} />
    </Form.Item>
  );
};
