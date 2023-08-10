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
import Table from '../components/TableServer';
// import WeekBox from '../components/WeekBox';
// import Calendar from '../components/Calendar';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';



interface IData {
  id: number;
  camId: string;
  fileName: string;
  dateTime: string;
  createdAt: string;
}


const Server: FC = () => {
  // const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllCostsQuery();
  // console.log(data)

  const [msg, contextHolder] = notification.useNotification();

  if (!isLoading) {

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
            <Row>
              <Col xs={24} lg={{ span: 22, offset: 1 }} xl={{ span: 20, offset: 2 }}>

                <Layout.Content className='p-6 my-4'>
                  <Row gutter={[16, 16]} className='mt-10'>
                    <Col>
                      {data && <Table tableData={data} />}
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

export default Server;