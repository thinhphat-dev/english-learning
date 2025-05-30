import { useAuthStore } from '@/store/auth.store';

const Home = () => {
  const { currentUser, userInfo, loading } = useAuthStore();
  if (loading) return <div>Đang tải...</div>;
  return (
    <div>
      {currentUser ? (
        <div>
          Đã đăng nhập:{' '}
          <div>
            <p>Email: {currentUser?.email}</p>
            <p>Họ tên: {currentUser.photoURL}</p>
            <p>Cấp độ: {userInfo?.level}</p>
          </div>
        </div>
      ) : (
        <p>Bạn chưa đăng nhập</p>
      )}
    </div>
  );
};

export default Home;
