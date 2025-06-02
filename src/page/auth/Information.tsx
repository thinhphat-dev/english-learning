import { Button, Form, Input, message, Select, Spin } from 'antd';
import { LevelEnum } from '@/enum/level.enum';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuthStore } from '@/store/auth.store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserData } from '@/service/auth/auth.service';
import type { UserInfo } from '@/types/response.type';

const Information = () => {
  const { currentUser, setUserInfo } = useAuthStore();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', currentUser?.uid],
    queryFn: () => fetchUserData(currentUser!.uid),
    enabled: !!currentUser,
  });

  const handleSave = async (values: UserInfo) => {
    if (!currentUser) return;
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', currentUser.uid), {
        fullname: values.fullname,
        level: values.level,
      });
      setUserInfo(values);
      message.success('Lưu thông tin cá nhân thành công');
      setIsEditing(false);
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow'>
      {isLoading || !userInfo || !currentUser ? (
        <Spin className='flex justify-center items-center mt-10' />
      ) : (
        <Form
          key={isEditing ? 'edit' : 'view'}
          form={form}
          layout='vertical'
          onFinish={handleSave}
          initialValues={{
            fullname: userInfo.fullname,
            email: userInfo.email,
            level: userInfo.level,
          }}>
          <Form.Item label='Họ và tên' name='fullname' rules={[{ required: true, message: 'Không được để trống!' }]}>
            <Input disabled={!isEditing} />
          </Form.Item>

          <Form.Item label='Email' name='email'>
            <Input disabled />
          </Form.Item>

          <Form.Item label='Bạn đang là' name='level' rules={[{ required: true }]}>
            <Select disabled={!isEditing}>
              {Object.entries(LevelEnum).map(([value, label]) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className='flex justify-end gap-4'>
            {!isEditing ? (
              <Button type='primary' onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Button htmlType='submit' type='primary' loading={loading}>
                  Lưu
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
