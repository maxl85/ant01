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
    <Row className='justify-center items-center min-h-screen bg-[#f0f2f5]'>
      <Col>
      <Card className='shadow'>
          <Form
            name="normal_login"
            style={{ minWidth: 300 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on">

            <LockTwoTone className='text-3xl block mb-2' />
            <Title level={4} className='mb-5 flex justify-center' >Регистрация пользователя</Title>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Введите ваш логин!' }]}>
              <Input prefix={<UserOutlined className='opacity-50' />} placeholder="Логин" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Введите ваш пароль!' }]}
              hasFeedback>
              <Input.Password
                prefix={<LockOutlined className='opacity-50' />}
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
                prefix={<LockOutlined className='opacity-50' />}
                type="password"
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className='w-full'
                type="primary"
                htmlType="submit">
                Регистрация
              </Button>
              <Link to="/login" className='flex justify-center mt-2' >Войти</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Registration;