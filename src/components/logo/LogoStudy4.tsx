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
        <img src={withText ? Study4Logo : LogoNoText} alt='Logo' className='h-9 w-36 pb-1 pr-1 pl-1' />
      </Link>
    </div>
  );
};

export default LogoStudy4;
