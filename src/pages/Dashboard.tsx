import { FC, useEffect, useState } from 'react';
import { notification, Layout, Row, Col, Image, Card, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


import { useGetAllCostsQuery } from '../redux/cost/costApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import Table from '../components/Table';
import WeekBox from '../components/WeekBox';
import Calendar from '../components/Calendar';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';



const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllCostsQuery();

  const [msg, contextHolder] = notification.useNotification();

  if (!isLoading) {
    // console.log(data)
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
  }, [error, msg, navigate]);


  // if (isLoading) return <h1>Loading...</h1>;
  // if (!data) return <h1>No data :(</h1>;
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
                      <Table />
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