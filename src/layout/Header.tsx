import { FC, useState } from 'react';
import { Button, Drawer, Layout, Avatar, Badge, Dropdown } from 'antd';
import { MenuUnfoldOutlined, UserOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import logo from '../logo.svg';
import Menu from '../components/Menu';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a href="#">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a href="#">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a href="#">
        3rd menu item
      </a>
    ),
  },
];


const _Header: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className='h-12'></div>
      <Layout.Header className='fixed left-0 w-full top-0 z-50 p-0 md:px-12 flex justify-between items-center h-12'>
        <Button
          className='block md:hidden text-2xl text-white mx-5 mb-3'
          type='text'
          icon={<MenuUnfoldOutlined />}
          onClick={() => setDrawerOpen(true)}
        />
        {/* <div className='flex items-center gap-2'>
            <BsPiggyBank className='text-white text-3xl' />
            <div className='text-white text-2xl'>Агроком</div>
          </div> */}
        <img src={logo} className='h-9' alt='logo' />
        <div className='flex items-baseline gap-5'>
          {/* <SearchOutlined className='text-white text-xl' /> */}
          <Badge style={{ boxShadow: 'none' }} count={5} size='small'>
            <BellOutlined className='text-white text-xl' />
          </Badge>

          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar className='bg-green-500 hover:cursor-pointer' icon={<UserOutlined />} />
          </Dropdown>
        </div>
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