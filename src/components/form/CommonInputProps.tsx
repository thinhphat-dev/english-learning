import type { Rule } from 'antd/es/form';

export type CommonInputProps = {
  label?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  formItemName: string;
  classNameForm?: string;
  hidden?: boolean;
  rules?: Rule[];
  valuePropName?: string;
  hasFeedback?: boolean;
};
