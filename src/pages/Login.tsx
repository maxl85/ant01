import React from 'react';
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


const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
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
        api.error({ message: 'Ошибка', description: err.data.message });
      } else if (isErrorWithMessage(err)) {
        api.error({ message: 'Ошибка', description: err.message });
      } else {
        api.error({ message: 'Ошибка', description: PrettyPrintJson(err as object) });
      }
    }
  };


  return (
    <>
      {contextHolder}
      <Row justify={'center'} align={'middle'} style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Col>
          <Card style={{ boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }}>
            <Form
              name="normal_login"
              style={{ minWidth: 300 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="on">

              <LockTwoTone style={{ fontSize: '30px', display: 'block', marginBottom: 10 }} />
              <Title level={4} style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }} >Войдите, чтобы продолжить</Title>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Введите ваш логин!' }]}>
                <Input prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} placeholder="Логин" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Введите ваш пароль!' }]}>
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                  type="password"
                  placeholder="Пароль"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  loading={isLoading}
                  htmlType="submit"
                  style={{ width: '100%' }}>
                  Войти
                </Button>
                <Link to="/registration" style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }} >Регистрация</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;