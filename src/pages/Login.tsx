import { FC } from 'react';
import { LockOutlined, LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Typography, Button, Card, Col, Form, Input, Row, notification } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth, setUsername } from '../redux/auth/slice';
import { useLoginMutation } from '../redux/auth/authApi';
import { isErrorWithMessage, isApiErrorResponse } from '../redux/helpers';


interface ILoginForm {
  username: string;
  password: string;
}

const { Title } = Typography;


const Login: FC = () => {
  const dispatch = useDispatch();
  const [msg, contextHolder] = notification.useNotification();
  const [authLogin, { isLoading }] = useLoginMutation();

  const PrettyPrintJson = (data: object) => {
    return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
  };

  const onFinish = async (values: ILoginForm) => {
    try {
      const result = await authLogin(values).unwrap();
      dispatch(setAuth(true));
      dispatch(setUsername(result.username));
      localStorage.setItem('auth', JSON.stringify(result));
    } catch (err) {
      if (isApiErrorResponse(err)) {
        msg.error({ message: 'Ошибка', description: err.data.message });
      } else if (isErrorWithMessage(err)) {
        msg.error({ message: 'Ошибка', description: err.message });
      } else {
        msg.error({ message: 'Ошибка', description: PrettyPrintJson(err as object) });
      }
    }
  };


  return (
    <>
      {contextHolder}
      <Row className='justify-center items-center min-h-screen bg-[#f0f2f5]'>
        <Col>
          <Card className='shadow'>
            <Form
              className='min-w-[300px]'
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="on">

              <LockTwoTone className='text-3xl block mb-2' />
              <Title level={4} className='mb-5 flex justify-center' >Войдите, чтобы продолжить</Title>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите ваш логин!' }]}>
                <Input prefix={<UserOutlined className='opacity-50' />} placeholder="Логин" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Введите ваш пароль!' }]}>
                <Input.Password
                  prefix={<LockOutlined className='opacity-50' />}
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className='w-full'
                  type="primary"
                  loading={isLoading}
                  htmlType="submit">
                  Войти
                </Button>
                <Link to="/registration" className='flex justify-center mt-2' >Регистрация</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;