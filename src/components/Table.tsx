import React from 'react';
import { Table, Button, TableColumnsType } from 'antd';
import { CheckCircleTwoTone, ExclamationCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import FillCell from './FillCell/FillCell';
import ImageViewer from './ImageViewer';


interface IVisits {
  start: Date;
  end: Date;
  time: string;
  length: number;
  full: boolean;
  cam1: string[];
  cam2: string[];
}

interface IData {
  date: string;
  visits: IVisits[];
}


interface DataType {
  key: React.Key;
  date: string;
  full1: boolean;
  timeVisit1: string;
  lengthVisit1: number;
  cam1Visit1: string[];
  cam2Visit1: string[];

  full2: boolean;
  timeVisit2: string;
  lengthVisit2: number;
  cam1Visit2: string[];
  cam2Visit2: string[];

  visitsPlus: IVisits[];
}

interface ExpandedDataType {
  key: React.Key;
  full: boolean;
  time: string;
  length: number;
  cam1: string[];
  cam2: string[];
}




const _Table = ({ tableData }: { tableData: IData[] }) => {
  const [openViewer, setOpenViewer] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);

  const expandedRowRender = (visits: IVisits[]) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: '№', dataIndex: 'key', width: 30, render: (_, { key }) => (
          <>
            {key as number + 3}
          </>
        )
      },
      {
        title: 'Обход', key: 'full', width: 55, render: (_, { full, length }) => (
          <div className=''>
            {full ?
              <CheckCircleTwoTone className='text-lg' twoToneColor="#52c41a" /> :
              length > 0 ?
                <ExclamationCircleTwoTone className='text-lg' twoToneColor="#efbb5a" /> :
                <CloseCircleTwoTone className='text-lg' twoToneColor="#eb2f96" />}
          </div>
        )
      },
      { title: 'Начало', dataIndex: 'time', width: 80, key: 'time' },
      {
        title: 'Длительность, мин', key: 'length', width: 120, render: (_, { length }) => (
          <>
            {length > 0 ? <FillCell value={length} /> : <></>}
          </>
        )
      },
      {
        title: 'Камеры', key: 'cam1', render: (_, { cam1, cam2 }) => (
          <div className='flex'>
            {cam1.length > 0 ?
              <Button
                className='mr-1'
                // type="text"
                type="link"
                size="small"
                onClick={() => { setOpenViewer(true); setImages(cam1); }}>
                Cam1
              </Button>
              :
              <Button
                disabled
                // type="text"
                type="link"
                size="small"
                onClick={() => { setOpenViewer(true); setImages(cam1); }}>
                Cam1
              </Button>
            }
            {cam2.length > 0 ?
              <Button
                className='mr-1'
                // type="text"
                type="link"
                size="small"
                onClick={() => { setOpenViewer(true); setImages(cam2); }}>
                Cam2
              </Button>
              :
              <Button
                disabled
                // type="text"
                type="link"
                size="small"
                onClick={() => { setOpenViewer(true); setImages(cam2); }}>
                Cam2
              </Button>
            }
          </div>
        )
      },
    ];

    const data: ExpandedDataType[] = [];
    visits.forEach((item, idx) => {
      data.push({
        key: idx,
        time: item.time,
        length: item.length,
        full: item.full,
        cam1: item.cam1,
        cam2: item.cam2,
      });
    });

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };


  const columns: TableColumnsType<DataType> = [
    {
      title: 'Дата',
      dataIndex:
      'date', width: 100,
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.date > b.date) ? 1 : -1,
    },
    {
      title: 'Обход 1', key: 'full1', width: 75, render: (_, { full1, lengthVisit1 }) => (
        <div className=''>
          {full1 ?
            <CheckCircleTwoTone className='text-lg' twoToneColor="#52c41a" /> :
            lengthVisit1 > 0 ?
              <ExclamationCircleTwoTone className='text-lg' twoToneColor="#efbb5a" /> :
              <CloseCircleTwoTone className='text-lg' twoToneColor="#eb2f96" />}
        </div>
      )
    },
    { title: 'Начало', dataIndex: 'timeVisit1', width: 70, key: 'timeVisit1' },
    {
      title: 'Длительность, мин', key: 'lengthVisit1', width: 120, render: (_, { lengthVisit1 }) => (
        <>
          {lengthVisit1 > 0 ? <FillCell value={lengthVisit1} /> : <></>}
        </>
      )
    },
    {
      title: 'Камеры', key: 'cam1Visit1', width: 120, render: (_, { cam1Visit1, cam2Visit1 }) => (
        <div className='flex'>
          {cam1Visit1.length > 0 ?
            <Button
              className='mr-1'
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam1Visit1); }}>
              Cam1
            </Button>
            :
            <Button
              disabled
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam1Visit1); }}>
              Cam1
            </Button>
          }
          {cam2Visit1.length > 0 ?
            <Button
              className='mr-1'
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam2Visit1); }}>
              Cam2
            </Button>
            :
            <Button
              disabled
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam2Visit1); }}>
              Cam2
            </Button>
          }
        </div>
      )
    },
    {
      title: 'Обход 2', key: 'full2', width: 75, render: (_, { full2, lengthVisit2 }) => (
        <div className=''>
          {full2 ?
            <CheckCircleTwoTone className='text-lg' twoToneColor="#52c41a" /> :
            lengthVisit2 > 0 ?
              <ExclamationCircleTwoTone className='text-lg' twoToneColor="#efbb5a" /> :
              <CloseCircleTwoTone className='text-lg' twoToneColor="#eb2f96" />}
        </div>
      )
    },
    { title: 'Начало', dataIndex: 'timeVisit2', width: 70, key: 'timeVisit2' },
    {
      title: 'Длительность, мин', key: 'lengthVisit2', width: 120, render: (_, { lengthVisit2 }) => (
        <>
          {lengthVisit2 > 0 ? <FillCell value={lengthVisit2} /> : <></>}
        </>
      )
    },
    {
      title: 'Камеры', key: 'cam1Visit2', width: 120, render: (_, { cam1Visit2, cam2Visit2 }) => (
        <div className='flex'>
          {cam1Visit2.length > 0 ?
            <Button
              className='mr-1'
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam1Visit2); }}>
              Cam1
            </Button>
            :
            <Button
              disabled
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam1Visit2); }}>
              Cam1
            </Button>
          }
          {cam2Visit2.length > 0 ?
            <Button
              className='mr-1'
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam2Visit2); }}>
              Cam2
            </Button>
            :
            <Button
              disabled
              // type="text"
              type="link"
              size="small"
              onClick={() => { setOpenViewer(true); setImages(cam2Visit2); }}>
              Cam2
            </Button>
          }
        </div>
      )
    },
  ];

  const data: DataType[] = [];
  tableData.forEach((item, idx) => {

    const full1 = item.visits[0] ? item.visits[0].full : false;
    const timeVisit1 = item.visits[0] ? item.visits[0].time : '';
    const lengthVisit1 = item.visits[0] ? item.visits[0].length : 0;
    const cam1Visit1 = item.visits[0] ? item.visits[0].cam1 : [];
    const cam2Visit1 = item.visits[0] ? item.visits[0].cam2 : [];

    const full2 = item.visits[1] ? item.visits[1].full : false;
    const timeVisit2 = item.visits[1] ? item.visits[1].time : '';
    const lengthVisit2 = item.visits[1] ? item.visits[1].length : 0;
    const cam1Visit2 = item.visits[1] ? item.visits[1].cam1 : [];
    const cam2Visit2 = item.visits[1] ? item.visits[1].cam2 : [];

    const visitsPlus = item.visits[2] ? item.visits.slice(2) : [];
    data.push({
      key: idx.toString(),
      date: item.date,
      full1: full1,
      timeVisit1: timeVisit1,
      lengthVisit1: lengthVisit1,
      cam1Visit1: cam1Visit1,
      cam2Visit1: cam2Visit1,

      full2: full2,
      timeVisit2: timeVisit2,
      lengthVisit2: lengthVisit2,
      cam1Visit2: cam1Visit2,
      cam2Visit2: cam2Visit2,
      visitsPlus: visitsPlus,
    });
  });


  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.visitsPlus),
          rowExpandable: (record) => record.visitsPlus.length > 0,
        }}
        dataSource={data}
        size="small"
        scroll={{ x: 775, y: 340 }}
        pagination={{
          defaultPageSize: 7,
          // showSizeChanger: true,
          // pageSizeOptions: [10, 15, 20],
        }}
        // onChange={(a) => {console.log(a)}}
      />

      <ImageViewer open={openViewer} setOpen={setOpenViewer} images={images} />
    </>
  );
};

export default _Table;