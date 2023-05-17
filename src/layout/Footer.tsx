import { FC } from 'react';
import { Layout } from 'antd';


const Footer: FC = () => {
  return (
    <Layout.Footer className='text-center'>
      My Company ©{new Date().getFullYear()} Created by Max
    </Layout.Footer>
  );
};

export default Footer;