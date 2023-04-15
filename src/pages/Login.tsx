import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Row justify={'center'} align={'middle'} style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Col>
        <Card style={{boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }}>
          <Form
            name="normal_login"
            style={{ minWidth: 250 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on">

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
              <a href="">Регистрация</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;