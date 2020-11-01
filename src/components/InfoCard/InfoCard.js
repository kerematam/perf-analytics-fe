import React from 'react'
import { Typography } from '@material-ui/core/'

import styles from './InfoCard.module.scss'

const InfoCard = () => (
  <div>
    <Typography>
      The performanceTiming API, a JavaScript API for measuring the loading
      performance of the requested page, is deprecated but supported in all
      browsers. It has been replaced with the performanceNavigationTiming API.
    </Typography>
    <br />
    <Typography>
      The performance timing API provided read only times, in milliseconds(ms),
      describing at what time each point in the page loading process was
      reached. As displayed in the image below, the navigation process goes from
      navigationStart, unloadEventStart, unloadEventEnd, redirectStart,
      redirectEnd, fetchStart, domainLookupStart, domainLookupEnd, connectStart
      , connectEnd, secureConnectionStart, requestStart, responseStart,
      responseEnd, domLoading, domInteractive, domContentLoadedEventStart,
      domContentLoadedEventEnd, domComplete, loadEventStart, and loadEventEnd.
    </Typography>
    <a
      rel="noopener noreferrer"
      className={styles.read_more}
      href="https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings#Performance_Timings"
      target="_blank"
    >
      read more
    </a>
  </div>
)

export default InfoCard
