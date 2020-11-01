import React, { useMemo } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import styles from './Chart.module.scss'

const Chart = ({ title, time = [], data = [] }) => {
  const options = useMemo(
    () => ({
      title: {
        text: title,
      },
      xAxis: {
        categories: time.map(date => new Date(date).toLocaleString()),
      },
      series: [
        {
          data,
        },
      ],
    }),
    [title, data, time]
  )

  return (
    <div className={styles.chart}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default Chart
