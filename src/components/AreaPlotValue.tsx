import { TinyAreaConfig } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { TinyArea } from '@ant-design/plots';
import { Statistic } from 'antd';

const AreaPlotValue = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192];

  const config: TinyAreaConfig = {
    height: 60,
    autoFit: true,
    data,
    smooth: true,
    tooltip: false,
    annotations: [
      {
        type: 'line',
        start: ['min', 500],
        end: ['max', 500],
        text: {
          content: '20',
          offsetY: -2,
          style: {
            textAlign: 'left',
            fontSize: 10,
            // fill: 'rgba(44, 53, 66, 0.45)',
            textBaseline: 'bottom',
          },
        },
        style: {
          stroke: 'rgba(0, 0, 0, 0.55)',
        },
      },
    ],
    // areaStyle: {
    //   fill: '#96e3fd',
    // },
  };

  return (
    <>
      <Statistic
          title="Температура"
          value={15}
          // precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<CaretDownOutlined />}
          suffix="℃"
        />
        <TinyArea {...config} />
        <div className='text-center pb-2 text-xs text-slate-400'>За последние 24 часа</div>
    </>
  );
};

export default AreaPlotValue;