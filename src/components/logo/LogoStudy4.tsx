import Study4Logo from '@/assets/logo/logoWeb.png';
import LogoNoText from '@/assets/logo/logoWithoutText.png';
import { Link } from 'react-router';
type logoProps = {
  withText?: boolean;
};

const LogoStudy4 = ({ withText }: logoProps) => {
  return (
    <div className='justify-center items-center flex'>
      <Link to='/'>
        <img src={withText ? Study4Logo : LogoNoText} alt='' className='h-14 p-1 pt-2 pb-2 ' />
      </Link>
    </div>
  );
};

export default LogoStudy4;
