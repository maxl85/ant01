import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Layout, Avatar, Badge, Dropdown } from 'antd';
import { MenuUnfoldOutlined, UserOutlined, BellOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { removeUser } from '../utils/auth';

import logo from '../logo.svg';
import Menu from '../components/Menu';

const onClick: MenuProps['onClick'] = ({ key }) => {
  if (key==='1') { removeUser(); }
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/login">Выход</Link>
    ),
    icon: <LogoutOutlined />
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
        <img src={logo} className='h-9' alt='logo' />
        <div className='flex items-baseline gap-5 mr-4 md:mr-0'>
          {/* <SearchOutlined className='text-white text-xl' /> */}
          <Badge style={{ boxShadow: 'none' }} count={0} size='small'>
            <BellOutlined className='text-white text-xl' />
          </Badge>

          <Dropdown menu={{ items, onClick }} placement="bottomRight" arrow>
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