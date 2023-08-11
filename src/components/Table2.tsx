import React from 'react';
import { Table, Image, Progress, Badge, Dropdown, Space, TableColumnsType } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined } from '@ant-design/icons';

import FillCell from './FillCell/FillCell';


interface IVisits {
  time: string;
  length: number;
  image1: string;
  image2: string;
}

interface IData {
  date: string;
  visits: IVisits[];
}


// interface DataType {
//   key: React.Key;
//   name: string;
//   platform: string;
//   version: string;
//   upgradeNum: number;
//   creator: string;
//   createdAt: string;
// }
interface DataType {
  key: React.Key;
  date: string;
  timeVisit1: string;
  lengthVisit1: number;
  // image1Visit1: string;
  // image2Visit1: string;
  // timeVisit2: string;
  // lengthVisit2: number;
  // image1Visit2: string;
  // image2Visit2: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}




const _Table2 = ({ tableData }: { tableData: IData[] }) => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: i.toString() + 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  // const columns: TableColumnsType<DataType> = [
  //   { title: 'Name', dataIndex: 'name', key: 'name' },
  //   { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  //   { title: 'Version', dataIndex: 'version', key: 'version' },
  //   { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  //   { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  //   { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  //   { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  // ];
  // const data: DataType[] = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     name: 'Screen',
  //     platform: 'iOS',
  //     version: '10.3.4.5654',
  //     upgradeNum: 500,
  //     creator: 'Jack',
  //     createdAt: '2014-12-24 23:12:00',
  //   });
  // }

  const columns: TableColumnsType<DataType> = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Начало обхода 1', dataIndex: 'timeVisit1', key: 'timeVisit1' },
    {
      title: 'Длительность обхода 1', key: 'lengthVisit01', render: (_, { lengthVisit1 }) => (
        <FillCell value={lengthVisit1} />
      )
    },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  tableData.forEach((item, idx) => {

    // for (let i = 0; i < item.visits.length; i++) {

    // }
    data.push({
      key: idx.toString(),
      date: item.date,
      timeVisit1: item.visits[0].time,
      lengthVisit1: item.visits[0].length,
    });
  });

  return (

    <Table
      columns={columns}
      // expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
      dataSource={data}
      size="middle"
    />

  );
};

export default _Table2;