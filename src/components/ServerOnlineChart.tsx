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
  hhmm: string;
}

export default function ServerOnlineChart() {
  const { data, error, isError, isLoading } = useGetOnlineQuery();
  
  const dataTable: IdataTable[] = [];
  
  if (!isLoading) {
    const dataSort = data?.filter((el) => (el.rpiId === 'rpi01'));
    dataSort?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
    // console.log(d1)
    
    let dt: IdataTable = {} as IdataTable;
    let prevItem: IOnline = {} as IOnline;
    dataSort?.forEach((item, idx) => {
      if (idx === 0) prevItem = item;
      
      // const itemDate = new Date(item.createdAt.slice(0, -1));
      // const prevItemDate = new Date(prevItem.createdAt.slice(0, -1));
      const itemDate = new Date(item.createdAt);
      const prevItemDate = new Date(prevItem.createdAt);
      
      const d1 = prevItemDate.getTime();
      const d2 = itemDate.getTime();
      const diffMinutes = Math.floor((d2 - d1) / 60000);
      // console.log(diff);
      
      const diffCounter = item.counter - prevItem.counter;
      // console.log(diffCounter)
      
      if (idx > 0) {
        dt = {
          key: 'Связь',
          time: itemDate.toString(),
          value: diffMinutes > 2 ? 0 : 1,
          hhmm: itemDate.toLocaleDateString() + '  ' + itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        dataTable.push(dt);
        
        dt = {
          key: 'Питание',
          time: itemDate.toString(),
          value: diffCounter === 1 ? 3 : diffCounter < 0 ? 2 : 3,
          hhmm: itemDate.toLocaleDateString() + '  ' + itemDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        dataTable.push(dt);
      }
      
      // console.log(dt)
      
      prevItem = item;
    });
    
    const last = new Date(dataTable[dataTable.length - 1].time);
    const cur = new Date();
    
    // console.log(last)
    // console.log(cur)
    
    
    
    if ((cur.getTime() - last.getTime())/1000/60 > 4) {
      dataTable.push({
        key: 'Связь',
        time: cur.toString(),
        value: 0,
        hhmm: cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      
      dataTable.push({
        key: 'Питание',
        time: cur.toString(),
        value: 2,
        hhmm: cur.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    }
    
  }

  const config: LineConfig = {
    autoFit: true,
    data: dataTable,
    xField: 'time',
    xAxis: {
      type: 'time',
      tickMethod: 'time',
      label: {formatter(text, item, index) {
        let d: Date = new Date();
        if (item.id) d = new Date(+item.id);
        return d.toLocaleDateString()+' '+d.getHours()+':'+d.getMinutes();
      },}
    },
    yField: 'value',
    // legend: false,
    seriesField: 'key',
    stepType: 'vh',
    tooltip: {
      title: 'hhmm',
      formatter: (datum) => {
        return {
          name: datum.key,
          value: datum.value,
        };
      }
    },
    slider: {
      start: 0,
      end: 1,
    },
  };



  return (
    <Card bordered={false} className='mb-5' bodyStyle={{ padding: '20px 20px 5px 20px' }}>
      <Line className='h-[300px]' {...config} />
    </Card>
  );
}