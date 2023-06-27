import { TinyAreaConfig, TinyColumn, TinyColumnConfig } from '@ant-design/charts';
import { CaretDownOutlined } from '@ant-design/icons';
import { TinyArea } from '@ant-design/plots';
import { Statistic } from 'antd';

const BarPlot = () => {
  const data = [264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192];

  const config: TinyColumnConfig = {
    height: 64,
    autoFit: true,
    data,
    tooltip: {
      customContent: function (x, data) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };



  return (
    <>
      <Statistic
        title="Влажность"
        value={892}
        // precision={2}
        valueStyle={{ color: '#cf1322' }}
        prefix={<CaretDownOutlined />}
      // suffix="%"
      />
      <TinyColumn {...config} />
      <div className='text-center pb-2 text-xs text-slate-400'>За последние 24 часа</div>
    </>
  );
};

export default BarPlot;