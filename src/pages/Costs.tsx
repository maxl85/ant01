import { FC, useEffect } from 'react';
import { Button, notification } from 'antd';
import { useGetAllCostsQuery } from '../redux/cost/costApi';
import { isApiErrorResponse, isErrorWithMessage } from '../redux/helpers';
import { removeUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Costs: FC = () => {
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetAllCostsQuery();

  const [msg, contextHolder] = notification.useNotification();

  if (!isLoading) {
    console.log(data)
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

  return (
    <>
      {contextHolder}
      <Button type='primary' loading={isLoading} >Costs</Button>
    </>
  );
};

export default Costs;