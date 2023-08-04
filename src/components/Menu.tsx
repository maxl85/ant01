import { Menu, MenuProps } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';


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
  getItem('Dashboard', '1', <PieChartOutlined />),
  // getItem('Option 1', '2', <DesktopOutlined />),
  getItem('Цех', 'sub1', <DesktopOutlined />, [
    getItem('Цех 1', '3'),
    getItem('Цех 2', '4'),
    getItem('Цех 3', '5'),
  ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const _Menu = () => {
  return (
    <>
      <Menu
        className='border-e-0 overflow-auto scrollbar'
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        items={items}
      />
    </>
  );
};

export default _Menu;