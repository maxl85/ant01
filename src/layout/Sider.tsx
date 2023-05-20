import { FC, useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Menu from '../components/Menu';

const Sider: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className='hidden sm:block transition-all duration-200 delay-0' style={{ width: collapsed ? 80 : 200 }}>
      {/* <div className={`hidden sm:block transition-all duration-200 delay-0 ${collapsed ? 'w-[80px]' : 'w-[200px]'}`} > */}

      </div>
      <Layout.Sider
        className='hidden sm:block fixed top-0 left-0 z-50 h-full shadow-md pt-12'
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
    </>
  );
};

export default Sider;