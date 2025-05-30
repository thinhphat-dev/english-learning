import { logout } from '@/service/auth/auth.service';
import { Result, Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const errorConfig = {
  '404': {
    title: 'Không tìm thấy trang',
    subTitle: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
  },
  '403': {
    title: 'Truy cập bị từ chối',
    subTitle: 'Bạn không có quyền truy cập vào trang này, nếu bạn nghĩ đây là một sai lầm hãy thử đăng nhập lại.',
  },
  '500': {
    title: 'Lỗi hệ thống',
    subTitle: 'Đã có lỗi xảy ra, vui lòng thử lại sau.',
  },
};

const ErrorPage = ({ type }: { type: '404' | '403' | '500' }) => {
  const navigate = useNavigate();
  const { title, subTitle } = errorConfig[type] || errorConfig['500'];

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Result
        status={type}
        title={title}
        subTitle={subTitle}
        extra={
          <>
            <Button type='primary' onClick={() => navigate('/')}>
              Trở về trang chủ
            </Button>
            {(type === '403' || type === '404') && (
              <Button
                type='default'
                onClick={() => {
                  logout();
                  navigate('/');
                }}>
                Đăng xuất
              </Button>
            )}
          </>
        }
      />
    </div>
  );
};

export default ErrorPage;
