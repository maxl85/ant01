import { FC, useEffect, useState } from 'react';
import { notification, Layout, Row, Col, Image } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useGetAllCostsQuery } from '../redux/cost/costApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import Table from '../components/Table';



const Costs: FC = () => {
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
        navigate('/login');
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
            <Layout.Content className='p-6 my-4 bg-white shadow-md'>
              <Row>
                <Col md={24} lg={{ span: 12, offset: 6 }}>
                  <Table />
                </Col>
              </Row>
            </Layout.Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Costs;