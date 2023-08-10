import { FC, useEffect, useState } from 'react';
import { notification, Layout, Row, Col, Image, Card, Statistic, Spin } from 'antd';
// import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';


import { useGetAllCostsQuery } from '../redux/files/filesApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import Table from '../components/Table';
// import WeekBox from '../components/WeekBox';
// import Calendar from '../components/Calendar';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';



// interface IData {
//   id: number;
//   date: string;
//   timeVisit1: string;
//   lengthVisit1: number;
//   imageVisit1: string;
//   timeVisit2: string;
//   lengthVisit2: number;
//   imageVisit2: string;
// }

interface IVisits {
  time: string;
  length: number;
  image: string;
}

interface IData {
  id: number;
  date: string;
  visits: IVisits[];
}

const Dashboard: FC = () => {
  // const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllCostsQuery();

  const [msg, contextHolder] = notification.useNotification();

  
  const tableData: IData[] = [];
  
  if (!isLoading) {
    // console.log(data)
    
    let curDate = '';
    let prevDate = '';
    const visits: IVisits[] = [];
    data?.forEach((item, i) => {
      
      curDate =  new Date(item.dateTime).toLocaleDateString();
      // console.log(curDate)
      
      if(prevDate === '') prevDate = curDate;
      
      if(curDate === prevDate)
      {
        
      }
      
      prevDate = curDate;
      
      // let d: IData = {
      //   id: i,
      //   date: '',
      //   timeVisit1: '',
      //   lengthVisit1: 0,
      //   imageVisit1: process.env.REACT_APP_SERVER_URL + '/files/' + item.filename,
      //   timeVisit2: '',
      //   lengthVisit2: 0,
      //   imageVisit2: process.env.REACT_APP_SERVER_URL + '/files/' + item.filename,
      // };
      // tableData.push(d);

    //   tableData.push(
    //     {
    //       id: i,
    //       date: '',
    //       timeVisit1: '',
    //       lengthVisit1: 0,
    //       imageVisit1: process.env.REACT_APP_SERVER_URL + '/files/' + item.filename,
    //       timeVisit2: '',
    //       lengthVisit2: 0,
    //       imageVisit2: process.env.REACT_APP_SERVER_URL + '/files/' + item.filename,
    //     }
    //   );
    });

    // console.log(tableData)
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

  // TODO Add Spin for loading
  return (
    <>
      {contextHolder}
      <Layout className='min-h-screen'>
        <Sider />
        <Layout>
          <Header />
          <Layout className='px-6'>
            {/* {isLoading &&
              <Spin tip="Загрузка" size="large" className='mt-10'></Spin>
            } */}
            <Row>
              <Col xs={24} lg={{ span: 22, offset: 1 }} xl={{ span: 20, offset: 2 }}>

                <Layout.Content className='p-6 my-4'>
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
                      {/* <Table tableData={tableData} /> */}
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