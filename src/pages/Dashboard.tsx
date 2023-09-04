import { FC } from 'react';
import { Layout, Row, Col, Card } from 'antd';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Sider from '../layout/Sider';
import Table1 from '../components/Table1';
import Table2 from '../components/Table2';
import AreaPlot from '../components/AreaPlot';
import AreaPlotValue from '../components/AreaPlotValue';
import BarPlot from '../components/BarPlot';
import BulletPlot from '../components/BulletPlot';


const Dashboard: FC = () => {

  return (
    <>
      <Layout className='min-h-screen'>
        <Sider />
        <Layout>
          <Header />
          <Layout className='sm:px-6'>
            <Row>
              <Col xs={24} lg={{ span: 22, offset: 1 }} xl={{ span: 20, offset: 2 }}>
                <Layout.Content className='p-3 sm:p-6 my-4'>
                  <Row gutter={[16, 16]}>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <AreaPlot />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <AreaPlotValue />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <BarPlot />
                      </Card>
                    </Col>
                    <Col className='border-2' xs={24} sm={12} md={12} lg={12} xl={6}>
                      <Card bordered={false} bodyStyle={{ padding: '5px 10px' }}>
                        <BulletPlot />
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={[16, 16]} className='mt-10'>
                    <div className='text-xl mb-5 text'>Проход 1</div>
                    <Table1 />
                    <div className='text-xl mb-5 text'>Проход 2</div>
                    <Table2 />
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

export default Dashboard;