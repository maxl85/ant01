import { FC, useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Menu from '../components/Menu';

const Sider: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <Layout.Sider
      className='hidden sm:block'
      theme='light'
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      breakpoint='md'>
      <div className='h-full flex flex-col justify-between'>
        <Menu />
        <Button
          className='text-base w-full'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>
    </Layout.Sider>
  );
};

export default Sider;