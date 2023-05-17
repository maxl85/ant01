import { FC, useState } from 'react';
import { Button, Drawer, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import logo from '../logo.svg';
import Menu from '../components/Menu';

const _Header: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Layout.Header className='p-0 sm:px-12 flex items-center h-12'>
        <Button
          className='block sm:hidden text-2xl text-white mx-5 mb-3'
          type='text'
          icon={<MenuUnfoldOutlined />}
          onClick={() => setDrawerOpen(true)}
        />
        {/* <div className='flex items-center gap-2'>
            <BsPiggyBank className='text-white text-3xl' />
            <div className='text-white text-2xl'>Агроком</div>
          </div> */}
        <img src={logo} className='h-9' alt='logo' />
      </Layout.Header>
      <Drawer
        width={200}
        bodyStyle={{ padding: 0 }}
        closable={true}
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}>
        <Menu />
      </Drawer>
    </>
  );
};

export default _Header;