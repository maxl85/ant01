import React from 'react';
import { Calendar } from 'antd';
import { Col, Radio, Row, Select, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';

// const _Calendar = () => {
//   return (
//     <div className='shadow-md'>
//       <Calendar fullscreen={false} cellRender={(date) => {
//         if (date.date() === 11 || date.date() === 15) {
//           return <div className='bg-red-400 -z-10 h-6 w-6 top-0 absolute'></div>
//         }
//       }} />
//     </div>
//   );
// };

dayjs.extend(dayLocaleData);

const _Calendar = ({ title }: { title: string }) => {
  return (
    <>
      {/* <div className='shadow-md'> */}
      <div>
        <Calendar
          fullscreen={false}
          cellRender={(date) => {
            if (date.date() === 11 || date.date() === 15) {
              return <div className='bg-red-400 -z-10 h-6 w-6 top-0 absolute'></div>;
            }
          }}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            const start = 0;
            const end = 12;
            const monthOptions = [];

            let current = value.clone();
            const localeData = value.localeData();
            const months = [];

            for (let i = 0; i < 12; i++) {
              current = current.month(i);
              months.push(localeData.monthsShort(current));
            }

            for (let i = start; i < end; i++) {
              monthOptions.push(
                <Select.Option key={i} value={i} className="month-item">
                  {months[i]}
                </Select.Option>,
              );
            }

            const year = value.year();
            const month = value.month();
            const options = [];
            for (let i = year - 10; i < year + 10; i += 1) {
              options.push(
                <Select.Option key={i} value={i} className="year-item">
                  {i}
                </Select.Option>,
              );
            }
            return (
              <div className='p-2'>
                <Typography.Title className='text-center' level={5}>{title}</Typography.Title>
                <Row gutter={8}>
                  {/* <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col> */}
                  {/* <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}>
                    {options}
                  </Select>
                </Col> */}
                  {/* <Col>
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}>
                    {monthOptions}
                  </Select>
                </Col> */}
                </Row>
              </div>
            );
          }}
        // onPanelChange={onPanelChange}
        />
        <div className='flex items-center p-2'>
          <div className='bg-red-400 h-6 w-6 ms-2'></div>
          <div className='ms-2'> - Ветеринара не было на объекте</div>
        </div>

      </div>

    </>
  );
};

export default _Calendar;