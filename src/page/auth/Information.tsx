import { Button, Form, Input, Select, Spin } from 'antd';
import { LevelEnum } from '@/enum/level.enum';
import { useEffect, useState } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { RegisterParams } from '@/types/request.type';
import { useAuthStore } from '@/store/auth.store';

const Information = () => {
  const { currentUser } = useAuthStore();
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<RegisterParams | null>(null);

  const fetchUserInfo = async () => {
    if (!currentUser) return;
    const docRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setInitialValues({
        fullname: data.fullname || '',
        email: currentUser.email || '',
        level: data.level || 'NEWBIE',
        password: '',
      });
      form.setFieldsValue({
        fullname: data.fullname || '',
        email: currentUser.email || '',
        level: data.level || 'NEWBIE',
      });
    }
  };

  const handleSave = async (values: RegisterParams) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', currentUser.uid), {
        fullname: values.fullname,
        level: values.level,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Lỗi khi cập nhật:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [currentUser]);

  if (!initialValues) {
    return <Spin className="flex justify-center items-center mt-10" />;
  }

  return (
    <Form
      key={isEditing ? 'edit' : 'view'} // ép form render lại khi chuyển giữa edit/view
      form={form}
      layout='vertical'
      onFinish={handleSave}
      className='max-w-lg mx-auto mt-8 p-4 bg-white rounded shadow'
      initialValues={initialValues}
    >
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
            <Button onClick={() => {
              setIsEditing(false);
              form.setFieldsValue(initialValues); // reset về giá trị ban đầu nếu huỷ
            }}>Huỷ</Button>
          </>
        )}
      </div>
    </Form>
  );
};

export default Information;
