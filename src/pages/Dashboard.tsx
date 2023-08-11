import { FC, useEffect, useState } from 'react';
import { notification, Layout, Row, Col, Image, Card, Statistic, Spin } from 'antd';
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';


import { IFiles, useGetAllCostsQuery } from '../redux/files/filesApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import Table2 from '../components/Table2';
// import WeekBox from '../components/WeekBox';
// import Calendar from '../components/Calendar';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';


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

const Dashboard: FC = () => {
  // const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllCostsQuery();

  const [msg, contextHolder] = notification.useNotification();

  
  const tableData1: IData[] = [];
  const tableData2: IData[] = [];
  
  // if (!isLoading) {
  //   // console.log(data)
    
  //   let curDate = '';
  //   let prevDate = '';
  //   const visits: IVisits[] = [];
  //   let i1 = 0;
  //   let i2 = 0;
  //   let j1 = 0;
  //   let j2 = 0;
  //   let prevItem: IFiles;
  //   data?.forEach((item, idx) => {
  //     if (prevItem === undefined) prevItem = item;
      
  //     const itemDate = new Date(item.dateTime.slice(0, -1));
  //     const prevItemDate = new Date(prevItem.dateTime.slice(0, -1));
  //     // curDate = String(itemDate.getDate()).padStart(2, '0') + '.' + 
  //     //           String(itemDate.getMonth() + 1).padStart(2, '0') + '.' + 
  //     //           itemDate.getFullYear();
  //     // const curTime = String(itemDate.getHours()).padStart(2, '0') + ':' +
  //     //               String(itemDate.getMinutes()).padStart(2, '0');
  //     curDate =  itemDate.toLocaleDateString();
  //     const curTime =  itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
  //     // if(prevDate === '') prevDate = curDate;
      
  //     // console.log(curDate, prevDate)
  //     if(curDate === prevDate)
  //     {
        
  //       // console.log('vLength1', vLength1)
  //       if (item.camId === 'cam1_2') {
  //         const vLength1 = tableData1[i1-1].visits.length;
  //         const d1 = prevItemDate.getTime();
  //         const d2 = itemDate.getTime();
  //         const diff = Math.ceil((d2 - d1) / 60000);
  //         tableData1[i1 - 1].visits[vLength1 - 1].length = diff;
  //         tableData1[i1 - 1].visits[vLength1 - 1].image2 = item.filename;
  //         // j1 = j1 + 1;
  //       }
  //       if (item.camId === 'cam1_1') {
  //         tableData1[i1 - 1].visits.push({time: curTime, length: 0, image1: item.filename, image2: ''});
  //       }
        
        
        
  //       if (item.camId === 'cam2_2') {
  //         const vLength2 = tableData2[i2-1].visits.length;
  //         const d1 = prevItemDate.getTime();
  //         const d2 = itemDate.getTime();
  //         const diff = Math.ceil((d2 - d1) / 60000);
  //         tableData2[i2 - 1].visits[vLength2 - 1].length = diff;
  //         tableData2[i2 - 1].visits[vLength2 - 1].image2 = item.filename;
  //         // j2 = j2 + 1;
  //       }
  //       if (item.camId === 'cam2_1') {
  //         tableData2[i2 - 1].visits.push({time: curTime, length: 0, image1: item.filename, image2: ''});
  //       }
        
  //     } else {
  //       if (item.camId === 'cam1_1') {
  //         tableData1.push({date: curDate, visits:[{time: curTime, length: 0, image1: item.filename, image2: ''}]});
  //         i1 = i1 + 1;
  //         // j1 = 1;
  //       }
  //       // if (item.camId === 'cam1_2') {
  //       //   tableData1.push({date: curDate, visits:[{time: curTime, length: 0, image1: '', image2: ''}]});
  //       // }
        
  //       if (item.camId === 'cam2_1') {
  //         tableData2.push({date: curDate, visits:[{time: curTime, length: 0, image1: item.filename, image2: ''}]});
  //         i2 = i2 + 1;
  //         // j2 = 1;
  //       }
  //       // if (item.camId === 'cam2_2') {
  //       //   tableData1.push({date: curDate, visits:[{time: curTime, length: 0, image1: '', image2: ''}]});
  //       // }
  //     }
      
  //     prevDate = curDate;
  //     prevItem = item;
      
  // }
  // console.log('tableData1', tableData1)
  // console.log('tableData2', tableData2)
  
  const filesPath = process.env.REACT_APP_SERVER_URL + '/files/';
  
  if (!isLoading) {
      // console.log(data)
      
      const d1 = data?.filter((el) => (el.camId==='cam1_1' || el.camId==='cam1_2'));
      // console.log(d1)
      let curDate = '';
      let prevDate = '';
      let i = 0;
      let prevItem: IFiles;
      d1?.forEach((item, idx) => {
        if (prevItem === undefined) prevItem = item;
        
        const itemDate = new Date(item.dateTime.slice(0, -1));
        const prevItemDate = new Date(prevItem.dateTime.slice(0, -1));
        curDate =  itemDate.toLocaleDateString();
        const curTime =  itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if(curDate === prevDate) {
          if (item.camId === 'cam1_2') {
            const vLength1 = tableData1[i-1].visits.length;
            const d1 = prevItemDate.getTime();
            const d2 = itemDate.getTime();
            const diff = Math.ceil((d2 - d1) / 60000);
            tableData1[i - 1].visits[vLength1 - 1].length = diff;
            tableData1[i - 1].visits[vLength1 - 1].image2 = filesPath + item.filename;
          }
          if (item.camId === 'cam1_1') {
            tableData1[i - 1].visits.push({
              time: curTime,
              length: 0,
              image1: filesPath + item.filename,
              image2: ''
            });
          }
        } else {
          if (item.camId === 'cam1_1') {
            tableData1.push({date: curDate,
              visits:[{
                time:
                curTime,
                length: 0,
                image1: filesPath + item.filename,
                image2: ''
              }]
            });
            i = i + 1;
          }
        }
        
        prevDate = curDate;
        prevItem = item;
      });
      // console.log('tableData1', tableData1)
      
      
      const d2 = data?.filter((el) => (el.camId==='cam2_1' || el.camId==='cam2_2'));
      // console.log(d2)
      curDate = '';
      prevDate = '';
      i = 0;
      let prevItem2: IFiles;
      d2?.forEach((item, idx) => {
        if (prevItem2 === undefined) prevItem2 = item;
        
        const itemDate = new Date(item.dateTime.slice(0, -1));
        const prevItemDate = new Date(prevItem2.dateTime.slice(0, -1));
        curDate =  itemDate.toLocaleDateString();
        const curTime =  itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        if(curDate === prevDate) {
          if (item.camId === 'cam2_2') {
            const vLength1 = tableData2[i-1].visits.length;
            const d1 = prevItemDate.getTime();
            const d2 = itemDate.getTime();
            const diff = Math.ceil((d2 - d1) / 60000);
            tableData2[i - 1].visits[vLength1 - 1].length = diff;
            tableData2[i - 1].visits[vLength1 - 1].image2 = filesPath + item.filename;
          }
          if (item.camId === 'cam2_1') {
            tableData2[i - 1].visits.push({
              time: curTime,
              length: 0,
              image1: filesPath + item.filename,
              image2: ''
            });
          }
        } else {
          if (item.camId === 'cam2_1') {
            tableData2.push({date: curDate,
              visits:[{
                time:
                curTime,
                length: 0,
                image1: filesPath + item.filename,
                image2: ''
              }]
            });
            i = i + 1;
          }
        }
        
        prevDate = curDate;
        prevItem2 = item;
      });
      // console.log('tableData2', tableData2)
      
  }



  useEffect(() => {
    if (isApiErrorResponse(error)) {
      if (error.status === 401) {
        removeUser();
        // navigate('/login');
      } else {
        msg.error({ message: `Ошибка ${error.status} (${error.data.error})`, description: error.data.message });
      }
    }
  }, [error, msg]);


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
                    <Col>
                      <div className='text-xl mb-5 text'>Цех 1</div>
                      <Table2 tableData={tableData1} />
                      <div className='text-xl mb-5 text'>Цех 2</div>
                      <Table2 tableData={tableData2} />
                    </Col>
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