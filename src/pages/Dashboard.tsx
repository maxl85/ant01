import { FC, useEffect, useState } from 'react';
import { notification, Layout, Row, Col, Image, Card, Statistic, Spin } from 'antd';
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';


import { IFiles, useGetAllFilesQuery, useGetAllDatesQuery } from '../redux/files/filesApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
// import Table2 from '../components/Table2';
import Table from '../components/Table';
import Table1 from '../components/Table1';
// import WeekBox from '../components/WeekBox';
// import Calendar from '../components/Calendar';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';


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

const Dashboard: FC = () => {
  // const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllFilesQuery();
    
  const [msg, contextHolder] = notification.useNotification();

/*
  const tableData1: IData[] = [];
  const tableData2: IData[] = [];

  const filesPath = process.env.REACT_APP_SERVER_URL + '/files/';

  // Вынести в настройки на сайте??????
  const minTimeDiff = 30;

  if (!isLoading) {
    // console.log(data)

    const d1 = data?.filter((el) => (el.camId === 'cam1_1' || el.camId === 'cam1_2'));
    d1?.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    // console.log(d1)
    let curDate = '';
    let prevDate = '';
    let iData = 0;
    let iVisit = 0;
    let prevItem: IFiles = {} as IFiles;
    d1?.forEach((item, idx) => {
      if (idx === 0) prevItem = item;

      const itemDate = new Date(item.dateTime.slice(0, -1));
      const prevItemDate = new Date(prevItem.dateTime.slice(0, -1));

      const d1 = prevItemDate.getTime();
      const d2 = itemDate.getTime();
      const diff = Math.ceil((d2 - d1) / 60000);

      curDate = itemDate.toLocaleDateString('fr-CA');
      const curTime = itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (curDate === prevDate) {
        if (diff < minTimeDiff) {
          if (item.camId === 'cam1_1') {
            tableData1[iData - 1].visits[iVisit - 1].cam1.push(filesPath + item.filename);
          }
          
          if (item.camId === 'cam1_2') {
            tableData1[iData - 1].visits[iVisit - 1].cam2.push(filesPath + item.filename);
            tableData1[iData - 1].visits[iVisit - 1].full = true;
          }
          tableData1[iData - 1].visits[iVisit - 1].end = itemDate;
          
          const dStart = tableData1[iData - 1].visits[iVisit - 1].start.getTime();
          const dEnd = tableData1[iData - 1].visits[iVisit - 1].end.getTime();
          const length = Math.ceil((dEnd - dStart) / 60000);
          tableData1[iData - 1].visits[iVisit - 1].length = length;
        } else {
          tableData1[iData - 1].visits.push({
            start: itemDate,
            end: itemDate,
            time: curTime,
            length: 0,
            full: item.camId === 'cam1_2',
            cam1: item.camId === 'cam1_1' ? [filesPath + item.filename] : [],
            cam2: item.camId === 'cam1_2' ? [filesPath + item.filename] : [],
          });
          
          iVisit = iVisit + 1;
        }

      } else {
        iVisit = 0;
        tableData1.push({
          date: curDate,
          visits: [{
            start: itemDate,
            end: itemDate,
            time: curTime,
            length: 0,
            full: item.camId === 'cam1_2',
            cam1: item.camId === 'cam1_1' ? [filesPath + item.filename] : [],
            cam2: item.camId === 'cam1_2' ? [filesPath + item.filename] : [],
          }]
        });
        iData = iData + 1;
        iVisit = iVisit + 1;
      }

      prevDate = curDate;
      prevItem = item;
    });
    // console.log('tableData1', tableData1)


    const d2 = data?.filter((el) => (el.camId === 'cam2_1' || el.camId === 'cam2_2'));
    d2?.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);
    // console.log(d1)
    curDate = '';
    prevDate = '';
    iData = 0;
    iVisit = 0;
    prevItem = {} as IFiles;
    d2?.forEach((item, idx) => {
      if (idx === 0) prevItem = item;

      const itemDate = new Date(item.dateTime.slice(0, -1));
      const prevItemDate = new Date(prevItem.dateTime.slice(0, -1));

      const d1 = prevItemDate.getTime();
      const d2 = itemDate.getTime();
      const diff = Math.ceil((d2 - d1) / 60000);

      curDate = itemDate.toLocaleDateString('fr-CA');
      const curTime = itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (curDate === prevDate) {
        if (diff < minTimeDiff) {
          if (item.camId === 'cam2_1') {
            tableData2[iData - 1].visits[iVisit - 1].cam1.push(filesPath + item.filename);
          }
          
          if (item.camId === 'cam2_2') {
            tableData2[iData - 1].visits[iVisit - 1].cam2.push(filesPath + item.filename);
            tableData2[iData - 1].visits[iVisit - 1].full = true;
          }
          tableData2[iData - 1].visits[iVisit - 1].end = itemDate;
          
          const dStart = tableData2[iData - 1].visits[iVisit - 1].start.getTime();
          const dEnd = tableData2[iData - 1].visits[iVisit - 1].end.getTime();
          const length = Math.ceil((dEnd - dStart) / 60000);
          tableData2[iData - 1].visits[iVisit - 1].length = length;
        } else {
          tableData2[iData - 1].visits.push({
            start: itemDate,
            end: itemDate,
            time: curTime,
            length: 0,
            full: item.camId === 'cam2_2',
            cam1: item.camId === 'cam2_1' ? [filesPath + item.filename] : [],
            cam2: item.camId === 'cam2_2' ? [filesPath + item.filename] : [],
          });
          
          iVisit = iVisit + 1;
        }

      } else {
        iVisit = 0;
        tableData2.push({
          date: curDate,
          visits: [{
            start: itemDate,
            end: itemDate,
            time: curTime,
            length: 0,
            full: item.camId === 'cam2_2',
            cam1: item.camId === 'cam2_1' ? [filesPath + item.filename] : [],
            cam2: item.camId === 'cam2_2' ? [filesPath + item.filename] : [],
          }]
        });
        iData = iData + 1;
        iVisit = iVisit + 1;
      }

      prevDate = curDate;
      prevItem = item;
    });
    // console.log('tableData2', tableData2)

  }
*/



  // useEffect(() => {
  //   if (isApiErrorResponse(error)) {
  //     if (error.status === 401) {
  //       removeUser();
  //       // navigate('/login');
  //     } else {
  //       msg.error({ message: `Ошибка ${error.status} (${error.data.error})`, description: error.data.message });
  //     }
  //   }
  // }, [error, msg]);


  // if (isLoading) return <h1 className='text-center mt-5'>Загрузка...</h1>;
  // if (!data) return <h1>Нет данных :(</h1>;
  // if (!data) return <>{JSON.stringify(error, null, 2)}</>;

  return (
    <>
      {contextHolder}
      <Layout className='min-h-screen'>
        <Sider />
        <Layout>
          <Header />
          <Layout className='sm:px-6'>
            {/* {isLoading &&
              <Spin tip="Загрузка" size="large" className='mt-10'></Spin>
            } */}
            <Row>
              <Col xs={24} lg={{ span: 22, offset: 1 }} xl={{ span: 20, offset: 2 }}>

                <Layout.Content className='p-3 sm:p-6 my-4'>
                  <Row gutter={[16, 16]}>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <AreaPlot />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <AreaPlotValue />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <BarPlot />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <BulletPlot />
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]} className='mt-10'>
                    {/* <Col>
                      <div className='text-xl mb-5 text'>Проход 1</div>
                      <Table tableData={tableData1} />
                      <div className='text-xl mb-5 text'>Проход 2</div>
                      <Table tableData={tableData2} />
                    </Col> */}
                    
                    <div className='text-xl mb-5 text'>Проход 1</div>
                    <Table1 />
                  </Row>

                </Layout.Content>
              </Col>
            </Row>
          </Layout>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;