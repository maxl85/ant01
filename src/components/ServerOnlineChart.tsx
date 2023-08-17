import { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { IOnline, useGetOnlineQuery } from '../redux/online/onlineApi';
import { LineConfig } from '@ant-design/charts';
import { Card } from 'antd';
import Plot from 'react-plotly.js';


interface IdataTable {
  time: string;
  key: string;
  value: number;
}

export default function ServerOnlineChart() {
  const { data, error, isError, isLoading } = useGetOnlineQuery();
  
  const dataTable: IdataTable[] = [];
  
  if (!isLoading) {
    const dataSort = data?.filter((el) => (el.rpiId === 'rpi01'));
    dataSort?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
    // console.log(d1)
    
    let dt: IdataTable = {} as IdataTable;
    let curDate = '';
    let prevDate = '';
    let prevItem: IOnline = {} as IOnline;
    dataSort?.forEach((item, idx) => {
      if (idx === 0) prevItem = item;
      
      const itemDate = new Date(item.createdAt.slice(0, -1));
      const prevItemDate = new Date(prevItem.createdAt.slice(0, -1));
      // const itemDate = new Date(item.createdAt);
      // const prevItemDate = new Date(prevItem.createdAt);
      
      const d1 = prevItemDate.getTime();
      const d2 = itemDate.getTime();
      const diff = Math.floor((d2 - d1) / 60000);
      // console.log(diff);
      
      if (idx > 0) {
        dt = {
          key: 'Связь',
          time: itemDate.toString(),
          value: diff > 2 ? 0 : 1,
        };
        dataTable.push(dt);
      }
      
      console.log(dt)
      
      prevItem = item;
    });
  }
  
  
  
  


  // const dataTable = [
  //   {
  //     time: '2023-08-17 06:34:43',
  //     key: 'Питание',
  //     value: 125,
  //   },
  //   {
  //     time: '2023-08-17 06:35:43',
  //     key: 'Питание',
  //     value: 50,
  //   },
  //   {
  //     time: '2023-08-17 06:46:43',
  //     key: 'Питание',
  //     value: 100,
  //   },
  //   {
  //     time: '2023-08-17 06:47:43',
  //     key: 'Питание',
  //     value: 50,
  //   },
  //   {
  //     time: '2023-08-17 06:48:43',
  //     key: 'Питание',
  //     value: 100,
  //   },
  //   {
  //     time: '2023-08-17 06:49:43',
  //     key: 'Питание',
  //     value: 50,
  //   },
  // ];

  const config: LineConfig = {
    autoFit: true,
    // height: 100,
    data: dataTable,
    xField: 'time',
    xAxis: {
      type: 'time',
      tickMethod: 'time',
      label: {formatter(text, item, index) {
        let d: Date = new Date();
        if (item.id) d = new Date(+item.id);
        // console.log(d.getHours(), ':', d.getMinutes())
        // console.log(d.toLocaleTimeString())
        return d.toLocaleDateString()+' '+d.getHours()+':'+d.getMinutes();
      },}
      // tickInterval: 0.1
    },
    // meta: {
    //   time: {
    //     type: 'time'
    //   }
    // },
    yField: 'value',
    // legend: false,
    seriesField: 'key',
    stepType: 'vh',
    tooltip: {},
    slider: {
      start: 0,
      end: 1,
    },
  };



  return (
    <Card bordered={false} className='mb-5' bodyStyle={{ padding: '20px 20px 5px 20px' }}>
      <Line className='h-[300px]' {...config} />
    </Card>
    
    // <Plot
    //     data={[
    //       {
    //         x: ['2013-10-04 22:23', '2013-10-04 22:24', '2013-10-04 22:25'],
    //         y: [2, 6, 3],
    //         type: 'scatter',
    //         mode: 'lines',
    //         marker: {color: 'red'},
    //         line: {shape: 'hv'}
    //       },
    //       // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
    //     ]}
    //     layout={{width: 500, height: 400,  title: 'A Fancy Plot'}}
    //   />

  );
}