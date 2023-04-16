import React from 'react';
import { LockOutlined, LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Typography, Button, Card, Col, Form, Input, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Registration: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
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
            <Title level={4} style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }} >Регистрация пользователя</Title>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Введите ваш логин!' }]}>
              <Input prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />} placeholder="Логин" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Введите ваш пароль!' }]}
              hasFeedback>
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
            
            <Form.Item
              name="confirm"
              rules={[
                { required: true, message: 'Введите ваш пароль!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
              dependencies={['password']}
              hasFeedback>
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                type="password"
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}>
                Регистрация
              </Button>
              <Link to="/login" style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }} >Войти</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Registration;