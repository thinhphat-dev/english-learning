import { Empty, Form, Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { CommonInputProps } from './CommonInputProps';
import type { LevelEnum } from '@/enum/level.enum';

export type SelectInputProps = {
  options: DefaultOptionType[];
  classNameInput?: string;
  initialValue?: LevelEnum;
} & CommonInputProps;

export const SelectInput = ({ formItemName, options, classNameInput, label, rules, initialValue, ...rest }: SelectInputProps) => {
  return (
    <Form.Item name={formItemName} label={label} rules={rules} initialValue={initialValue}>
      <Select
        className={classNameInput}
        options={options}
        maxTagCount='responsive'
        notFoundContent={<Empty description='Không có dữ liệu' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {...rest}
      />
    </Form.Item>
  );
};
