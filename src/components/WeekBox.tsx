import { FC } from 'react';
import { Box } from '@ant-design/plots';
import { Line } from '@ant-design/charts';
import { Column } from '@ant-design/charts';
import { BoxConfig } from '@ant-design/plots/es/components/box';

import type { Dayjs } from 'dayjs';

interface WeekBoxProps {
  month: string;
}

const WeekBox: FC<WeekBoxProps> = ({ month }) => {
  const data = [
    {
      x: '1',
      low: 1,
      q1: 9,
      median: 16,
      q3: 22,
      high: 24,
    },
    {
      x: '2',
      low: 1,
      q1: 5,
      median: 8,
      q3: 12,
      high: 16,
    },
    {
      x: '3',
      low: 1,
      q1: 8,
      median: 12,
      q3: 19,
      high: 26,
    },
    {
      x: '4',
      low: 2,
      q1: 8,
      median: 12,
      q3: 21,
      high: 28,
    },
  ];

  const config: BoxConfig = {
    // width: 400,
    height: 150,
    data: data,
    xField: 'x',
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    boxStyle: {
      stroke: '#545454',
      fill: '#1890FF',
      fillOpacity: 0.3,
    },
    animation: true,
    xAxis: {
      title: { text: '№ недели' },
    },
    yAxis: {
      title: { text: 'Время, мин' },
    },

  };
  

  return (
    <>
      {/* <Box className='bg-white p-3 shadow-md' {...config} /> */}
      <div className='bg-white p-3 shadow-md'>
        <div className='text-center text-lg text-slate-600 mb-3'>{month}</div>
        <Box  {...config} />
        {/* <div className='text-center text-sm text-slate-600'>№ недели</div> */}

        
      </div>
    </>
  );
};

export default WeekBox;