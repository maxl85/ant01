import React from 'react';
import { AxiosError } from 'axios';
import { LockOutlined, LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Typography, Button, Card, Col, Form, Input, Row, message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthClient } from '../api/authClient';
import { setAuth, setUsername } from '../redux/auth/slice';



interface AxiosMessageError {
  error: string;
  message: string;
  statusCode: number;
}

const { Title } = Typography;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const { username, password } = values;
    try {
      const result = await AuthClient.login(username, password);
      dispatch(setAuth(true));
      dispatch(setUsername(result.data.username));
      // messageApi.success(`Вы вошли как ${result.data.username}`);
      localStorage.setItem('auth', JSON.stringify(result.data));
    } catch (error) {
      const err = error as AxiosError<AxiosMessageError>;
      messageApi.error(err.response?.data.message);
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