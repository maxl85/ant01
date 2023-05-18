import { FC, useEffect, useState } from 'react';
import { notification, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useGetAllCostsQuery } from '../redux/cost/costApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';


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

  // TODO Add Spin to Content area
  return (
    <>
      {contextHolder}
      <Layout className='min-h-[100vh]'>
        <Header />
        <Layout>
          <Sider />
          <Layout className='px-6'>
            <Layout.Content className='p-6 my-4 bg-white shadow-md'>
              Content
            </Layout.Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Costs;