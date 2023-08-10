import { useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu} from '../redux/auth/slice';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Мониторинг', '1', <PieChartOutlined />),
  // getItem('Option 1', '2', <DesktopOutlined />),
  // getItem('Цех', 'sub1', <DesktopOutlined />, [
  //   getItem('Цех 1', '3'),
  //   getItem('Цех 2', '4'),
  //   getItem('Цех 3', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Сервер', '9', <SettingOutlined />),
];

const _Menu = () => {
  const selectedMenu = useSelector((state: RootState) => state.auth.selectedMenu);
  const dispatch = useDispatch();
  // const [current, setCurrent] = useState('1');
  
  const navigate = useNavigate();
  
  const onClick: MenuProps['onClick'] = (e) => {
    dispatch(setMenu(e.key));
    if (e.key === '1') {
      // navigate('/dashboard');
      navigate('/dashboard', { replace: false });
    }
    if (e.key === '9') {
      // navigate('/server');
      navigate('/server', { replace: false });
    }
  };
  
  return (
    <>
      <Menu
        onClick={onClick}
        className='border-e-0 overflow-auto scrollbar'
        theme="light"
        mode="inline"
        // defaultSelectedKeys={['1']}
        selectedKeys={[selectedMenu]}
        // defaultOpenKeys={['sub1']}
        items={items}
      />
    </>
  );
};

export default _Menu;