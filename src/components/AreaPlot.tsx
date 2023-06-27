import { TinyAreaConfig } from '@ant-design/charts';
import { ArrowUpOutlined, CaretUpOutlined } from '@ant-design/icons';
import { TinyArea } from '@ant-design/plots';
import { Statistic } from 'antd';

const AreaPlot = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 643, 726, 892];
  
  const config: TinyAreaConfig = {
    height: 60,
    autoFit: true,
    data,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };
  
  return (
    <>
      <Statistic
          title="Уровень метана"
          value={892}
          // precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<CaretUpOutlined />}
          // suffix="%"
        />
        <TinyArea {...config} />
        <div className='text-center pb-2 text-xs text-slate-400'>За последние 24 часа</div>
    </>
  );
};

export default AreaPlot;