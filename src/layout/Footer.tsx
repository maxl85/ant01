import { FC } from 'react';
import { Layout } from 'antd';


const Footer: FC = () => {
  return (
    <Layout.Footer className='text-center'>
      School X ©{new Date().getFullYear()}
    </Layout.Footer>
  );
};

export default Footer;