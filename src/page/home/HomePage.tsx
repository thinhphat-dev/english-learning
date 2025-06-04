import { useAuthStore } from '@/store/auth.store';
import { AppstoreOutlined, BookOutlined, FileSearchOutlined, FormOutlined, HeartFilled, ReadOutlined } from '@ant-design/icons';
import { Card, Row, Col, Statistic, Progress } from 'antd';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { userInfo } = useAuthStore();
  const user = {
    wordsLearned: 120,
    totalWords: 500,
    exercisesDone: 45,
    totalExercises: 100,
    flashcardStats: {
      known: 50,
      learning: 30,
      review: 20,
    },
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Xin chào,<span className='block sm:inline text-c-main-color'> {userInfo?.fullname} </span>
        <HeartFilled className='text-red-600' />
      </h2>
      <p className='text-gray-600 mb-6'>
        Trình độ: <b>{userInfo?.level}</b> | Email: {userInfo?.email}
      </p>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card className='shadow-even m-2'>
            <Statistic title='Từ vựng đã học' value={user.wordsLearned} suffix={`/ ${user.totalWords}`} />
            <Progress percent={(user.wordsLearned / user.totalWords) * 100} size='small' status='active' className='mt-2' />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className='shadow-even m-2'>
            <Statistic title='Bài tập đã làm' value={user.exercisesDone} suffix={`/ ${user.totalExercises}`} />
            <Progress percent={(user.exercisesDone / user.totalExercises) * 100} size='small' status='active' className='mt-2' />
          </Card>
        </Col>
      </Row>

      <h3 className='text-xl font-semibold mt-8 mb-4'>
        <AppstoreOutlined className='text-c-sec-color text-2xl' /> Truy cập nhanh
      </h3>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Link to='/dictionary'>
            <Card hoverable className='text-center'>
              <FileSearchOutlined className='text-amber-800 text-xl inline' /> Tra từ điển
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={8}>
          <Link to='/dictionary-flashcard'>
            <Card hoverable className='text-center'>
              <BookOutlined className='text-yellow-400 text-xl inline' /> Flashcard
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={8}>
          <Link to='/grammar'>
            <Card hoverable className='text-center'>
              <ReadOutlined className='text-blue-400 text-xl inline' /> Ngữ pháp
            </Card>
          </Link>
        </Col>
        {/* <Col xs={24} md={6}>
          <Link to='/exercise'>
            <Card hoverable className='text-center'>
              <FormOutlined className='text-pink-400 text-xl inline' /> Bài tập
            </Card>
          </Link>
        </Col> */}
      </Row>
    </div>
  );
};

export default HomePage;
