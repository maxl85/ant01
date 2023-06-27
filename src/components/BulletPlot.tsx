import { Bullet, BulletConfig, TinyAreaConfig, TinyColumn, TinyColumnConfig } from '@ant-design/charts';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { TinyArea } from '@ant-design/plots';
import { Progress, Statistic } from 'antd';

const BulletPlot = () => {
  const data = [264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 492];
  
  const config: TinyColumnConfig = {
    height: 64,
    autoFit: true,
    data,
    tooltip: false,
    annotations: [
      // 平均值
      {
        type: 'line',
        start: ['min', 'mean'],
        end: ['max', 'mean'],
        text: {
          content: '750',
          offsetY: -2,
          style: {
            textAlign: 'left',
            fontSize: 10,
            fill: 'rgba(44, 53, 66, 1.45)',
            textBaseline: 'bottom',
          },
        },
        style: {
          stroke: 'rgba(0, 0, 0, 0.55)',
        },
      },
    ],
  };


  return (
    <>
      <Statistic
        title="Давление"
        value={780}
        // precision={2}
        valueStyle={{ color: '#3f8600' }}
        prefix={<CaretUpOutlined />}
        suffix="mm Hg"
      />
      <TinyColumn {...config} />
      <div className='text-center pb-2 text-xs text-slate-400'>За последние 24 часа</div>

    </>
  );
};

export default BulletPlot;