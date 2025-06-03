import { Form, Radio } from 'antd';
import type { CommonInputProps } from '@/components/form/CommonInputProps';

export type RadioGroupInputProps = {
  options: { label: string; value: string }[];
  initialValue?: string; 
} & CommonInputProps;

export const RadioInput = ({ formItemName, options, ...rest }: RadioGroupInputProps) => {
  return (
    <Form.Item name={formItemName} {...rest}>
      <Radio.Group options={options} {...rest}/>
    </Form.Item>
  );
};
