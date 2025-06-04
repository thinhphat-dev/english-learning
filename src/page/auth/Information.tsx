import { Button, Form, message, Spin } from 'antd';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserData, updateUserInfo } from '@/service/auth/auth.service';
import type { UserInfo } from '@/types/response.type';
import { TextInput } from '@/components/form/TextInput';
import { getFullNameSchema, getLevelSchema } from '@/schema/form.schema';
import { SelectInput } from '@/components/form/SelectInput';
import { dataOptionLevel } from '@/constans/database/data-option';
import { RadioInput } from '@/components/form/RadioInput';
import { genderOptions } from '@/enum/gender.enum';

const Information = () => {
  const { currentUser, setUserInfo } = useAuthStore();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', currentUser?.uid],
    queryFn: () => fetchUserData(currentUser!.uid),
    enabled: !!currentUser,
  });

  const { mutate: saveUserInfo, isPending: saving } = useMutation({
    mutationFn: (values: UserInfo) =>
      updateUserInfo(currentUser!.uid, {
        fullname: values.fullname,
        gender: values.gender,
        level: values.level,
      }),
    onSuccess: (data, variables) => {
      message.success('Cập nhật thông tin cá nhân thành công');
      setUserInfo(variables);
      setIsEditing(false);
    },
    onError: (err) => {
      console.error('Lỗi khi cập nhật:', err);
      message.error('Lỗi khi lưu thông tin');
    },
  });

  return (
    <div className='max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow'>
      {isLoading || !userInfo || !currentUser ? (
        <Spin className='flex justify-center items-center mt-10' />
      ) : (
        <Form
          key={isEditing ? 'edit' : 'view'}
          form={form}
          layout='vertical'
          onFinish={saveUserInfo}
          initialValues={{
            fullname: userInfo.fullname,
            email: userInfo.email,
            level: userInfo.level,
          }}>
          <TextInput formItemName='fullname' label='Họ Và Tên' rules={getFullNameSchema} hasFeedback disabled={!isEditing} />
          <TextInput label='Email' formItemName='email' hasFeedback placeholder='Nhập email' disabled />
          <RadioInput
            formItemName='gender'
            label='Giới Tính'
            initialValue={userInfo.gender}
            disabled={!isEditing}
            options={genderOptions}></RadioInput>
          <SelectInput
            label='Trình Độ Hiện Tại'
            formItemName='level'
            rules={getLevelSchema}
            initialValue={userInfo.level}
            placeholder='Trình Độ Hiện Tại'
            options={dataOptionLevel}
            disabled={!isEditing}
          />
          <div className='flex justify-end gap-4'>
            {!isEditing ? (
              <Button type='primary' onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Button htmlType='submit' type='primary' loading={saving}>
                  Cập nhật
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    form.setFieldsValue({
                      fullname: userInfo.fullname,
                      email: userInfo.email,
                      level: userInfo.level,
                    });
                  }}>
                  Huỷ
                </Button>
              </>
            )}
          </div>
        </Form>
      )}
    </div>
  );
};

export default Information;
